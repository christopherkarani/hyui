<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		density?: number;
		intensity?: number;
	}

	let { density = 320, intensity = 1 }: Props = $props();
	let container = $state<HTMLDivElement | null>(null);

	onMount(() => {
		if (typeof window === 'undefined' || !container) {
			return;
		}

		let destroyed = false;
		let cleanup: (() => void) | undefined;

		const initialize = async () => {
			const THREE = await import('three');
			if (destroyed || !container) {
				return;
			}

			const DEG2RAD = Math.PI / 180;
			const GLOBE_RADIUS = 1.42;
			const BASE_ROTATION_X = 0.34;
			const BASE_ROTATION_Y = -0.7;

			const latLonToVector = (lat: number, lon: number, radius: number) => {
				const phi = (90 - lat) * DEG2RAD;
				const theta = (lon + 180) * DEG2RAD;
				const x = -(radius * Math.sin(phi) * Math.cos(theta));
				const z = radius * Math.sin(phi) * Math.sin(theta);
				const y = radius * Math.cos(phi);
				return new THREE.Vector3(x, y, z);
			};

			const hash2 = (a: number, b: number) => {
				const value = Math.sin(a * 127.1 + b * 311.7) * 43758.5453123;
				return value - Math.floor(value);
			};

			const isLand = (lat: number, lon: number) => {
				const regions = [
					{ latMin: 12, latMax: 72, lonMin: -168, lonMax: -52 }, // North America
					{ latMin: -56, latMax: 14, lonMin: -83, lonMax: -34 }, // South America
					{ latMin: 35, latMax: 72, lonMin: -12, lonMax: 42 }, // Europe
					{ latMin: -36, latMax: 37, lonMin: -20, lonMax: 53 }, // Africa
					{ latMin: 4, latMax: 78, lonMin: 34, lonMax: 178 }, // Asia
					{ latMin: -47, latMax: -9, lonMin: 111, lonMax: 156 }, // Australia
					{ latMin: -10, latMax: 24, lonMin: 94, lonMax: 153 }, // SE Asia islands
					{ latMin: 59, latMax: 84, lonMin: -74, lonMax: -12 } // Greenland
				];

				const regionalMatch = regions.find(
					(region) =>
						lat >= region.latMin &&
						lat <= region.latMax &&
						lon >= region.lonMin &&
						lon <= region.lonMax
				);

				if (!regionalMatch) {
					return false;
				}

				const latSpan = regionalMatch.latMax - regionalMatch.latMin;
				const lonSpan = regionalMatch.lonMax - regionalMatch.lonMin;
				const latProximity =
					Math.min(lat - regionalMatch.latMin, regionalMatch.latMax - lat) / Math.max(latSpan, 1);
				const lonProximity =
					Math.min(lon - regionalMatch.lonMin, regionalMatch.lonMax - lon) / Math.max(lonSpan, 1);
				const edgeProximity = Math.min(latProximity, lonProximity);
				const edgeNoise = hash2(lat * 0.73, lon * 0.41);

				// Carve out large ocean spaces so region boxes become continent silhouettes.
				if (lon > -52 && lon < -20 && lat > 20 && lat < 52) {
					return false; // North Atlantic
				}
				if (lon > 138 && lon < 176 && lat > 8 && lat < 52) {
					return false; // NW Pacific
				}
				if (lon > 40 && lon < 72 && lat < 30 && lat > -10) {
					return false; // Arabian Sea / Indian Ocean gap
				}

				return edgeProximity > 0.07 || edgeNoise > 0.54;
			};

			let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			let rafId = 0;
			let resizeObserver: ResizeObserver | null = null;
			let pointerX = 0;
			let pointerY = 0;
			let smoothPointerX = 0;
			let smoothPointerY = 0;

			const media = window.matchMedia('(prefers-reduced-motion: reduce)');

			const scene = new THREE.Scene();
			scene.fog = new THREE.Fog(0x050c1a, 4.6, 11.4);

			const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
			camera.position.set(0, 0.08, 5.9);
			camera.lookAt(0, 0, 0);

			const renderer = new THREE.WebGLRenderer({
				alpha: true,
				antialias: true,
				powerPreference: 'high-performance'
			});
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
			renderer.setClearColor(0x000000, 0);
			renderer.domElement.classList.add('hero-three-canvas');
			container.append(renderer.domElement);

			const root = new THREE.Group();
			root.position.set(1.02, -0.08, 0);
			root.scale.setScalar(0.9);
			scene.add(root);

			const ambient = new THREE.AmbientLight(0x90b8ff, 0.44);
			scene.add(ambient);

			const keyLight = new THREE.DirectionalLight(0x87b7ff, 0.86);
			keyLight.position.set(3.4, 2.6, 4.4);
			scene.add(keyLight);

			const rimLight = new THREE.PointLight(0x3f6cbb, 1.1, 12);
			rimLight.position.set(-2.3, -1.5, 2.8);
			scene.add(rimLight);

			const globeGroup = new THREE.Group();
			globeGroup.rotation.set(BASE_ROTATION_X, BASE_ROTATION_Y, 0);
			root.add(globeGroup);

			const shellGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 56, 56);
			const shellMaterial = new THREE.MeshStandardMaterial({
				color: 0x0c1d3d,
				metalness: 0.28,
				roughness: 0.52,
				transparent: true,
				opacity: 0.16
			});
			const shell = new THREE.Mesh(shellGeometry, shellMaterial);
			globeGroup.add(shell);

			const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.08, 48, 48);
			const atmosphereMaterial = new THREE.MeshBasicMaterial({
				color: 0x5d8edb,
				transparent: true,
				opacity: 0.08,
				side: THREE.BackSide,
				blending: THREE.AdditiveBlending
			});
			const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
			globeGroup.add(atmosphere);

			const dotStep = Math.max(3.0, 6.4 - density / 140);
			const landPositions: number[] = [];
			const landSeeds: number[] = [];

			for (let lat = -58; lat <= 82; lat += dotStep) {
				for (let lon = -180; lon <= 180; lon += dotStep) {
					if (!isLand(lat, lon)) {
						continue;
					}

					const latJitter = (hash2(lat * 0.13, lon * 0.19) - 0.5) * dotStep * 0.56;
					const lonJitter = (hash2(lat * 0.22, lon * 0.11) - 0.5) * dotStep * 0.56;
					const point = latLonToVector(
						lat + latJitter,
						lon + lonJitter,
						GLOBE_RADIUS + 0.012 + hash2(lat * 0.05, lon * 0.06) * 0.01
					);

					landPositions.push(point.x, point.y, point.z);
					landSeeds.push(hash2(lat * 0.71, lon * 0.47));
				}
			}

			const landGeometry = new THREE.BufferGeometry();
			landGeometry.setAttribute('position', new THREE.Float32BufferAttribute(landPositions, 3));
			landGeometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(landSeeds, 1));

			const landMaterial = new THREE.ShaderMaterial({
				uniforms: {
					uTime: { value: 0 },
					uMotionEnabled: { value: reduceMotion ? 0 : 1 }
				},
				vertexShader: `
					attribute float aSeed;
					uniform float uTime;
					uniform float uMotionEnabled;
					varying float vSeed;

					void main() {
						vSeed = aSeed;
						vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
						float pulse = 1.0 + (sin((uTime * 1.1) + (aSeed * 7.0)) * 0.18 * uMotionEnabled);
						float size = (0.72 + aSeed * 0.7) * pulse;
						gl_PointSize = clamp(size * (32.0 / max(1.0, -mvPosition.z)), 0.8, 3.0);
						gl_Position = projectionMatrix * mvPosition;
					}
				`,
				fragmentShader: `
					varying float vSeed;

					void main() {
						float dist = distance(gl_PointCoord, vec2(0.5));
						float alpha = smoothstep(0.5, 0.08, dist) * 0.72;
						vec3 color = mix(vec3(0.35, 0.52, 0.79), vec3(0.62, 0.79, 1.0), vSeed);
						gl_FragColor = vec4(color, alpha);
					}
				`,
				transparent: true,
				depthWrite: false,
				blending: THREE.NormalBlending
			});
			const landDots = new THREE.Points(landGeometry, landMaterial);
			globeGroup.add(landDots);

			const hubCoordinates = [
				{ code: 'USA', lat: 40.7128, lon: -74.006 },
				{ code: 'GBR', lat: 51.5072, lon: -0.1276 },
				{ code: 'BRA', lat: -23.5505, lon: -46.6333 },
				{ code: 'NGA', lat: 6.5244, lon: 3.3792 },
				{ code: 'UAE', lat: 25.2048, lon: 55.2708 },
				{ code: 'IND', lat: 28.6139, lon: 77.209 },
				{ code: 'SGP', lat: 1.3521, lon: 103.8198 },
				{ code: 'JPN', lat: 35.6762, lon: 139.6503 },
				{ code: 'AUS', lat: -33.8688, lon: 151.2093 },
				{ code: 'ZAF', lat: -26.2041, lon: 28.0473 }
			];

			const hubs = hubCoordinates.map((entry) => ({
				...entry,
				vector: latLonToVector(entry.lat, entry.lon, GLOBE_RADIUS + 0.02)
			}));

			const hubGeometry = new THREE.SphereGeometry(0.016, 10, 10);
			const hubMaterial = new THREE.MeshBasicMaterial({
				color: 0x9cc0f5,
				transparent: true,
				opacity: 0.74
			});
			const hubMesh = new THREE.InstancedMesh(hubGeometry, hubMaterial, hubs.length);
			const hubDummy = new THREE.Object3D();
			hubs.forEach((hub, index) => {
				hubDummy.position.copy(hub.vector);
				hubDummy.scale.setScalar(1);
				hubDummy.updateMatrix();
				hubMesh.setMatrixAt(index, hubDummy.matrix);
			});
			hubMesh.instanceMatrix.needsUpdate = true;
			globeGroup.add(hubMesh);

			const routePairs = [
				[0, 1],
				[1, 4],
				[4, 5],
				[5, 6],
				[6, 7],
				[7, 8],
				[8, 2],
				[2, 0],
				[1, 3],
				[3, 9],
				[9, 4],
				[6, 1],
				[0, 5]
			] as const;

			const animatedArcMaterials: Array<{
				material: { dashOffset: number; opacity: number };
				speed: number;
				phase: number;
				baseOpacity: number;
			}> = [];
			const travelers: Array<{
				mesh: { position: { copy: (value: unknown) => void }; visible: boolean };
				curve: { getPointAt: (value: number) => unknown };
				speed: number;
				phase: number;
			}> = [];

			const travelerGeometry = new THREE.SphereGeometry(0.012, 8, 8);
			const travelerMaterial = new THREE.MeshBasicMaterial({
				color: 0xb8d3ff,
				transparent: true,
				opacity: 0.72
			});

			for (const [fromIndex, toIndex] of routePairs) {
				const start = hubs[fromIndex].vector.clone();
				const end = hubs[toIndex].vector.clone();
				const distance = start.distanceTo(end);
				const height = 0.22 + Math.min(distance * 0.16, 0.52);
				const control = start
					.clone()
					.add(end)
					.multiplyScalar(0.5)
					.normalize()
					.multiplyScalar(GLOBE_RADIUS + height);

				const curve = new THREE.QuadraticBezierCurve3(start, control, end);
				const points = curve.getPoints(96);

				const baseGeometry = new THREE.BufferGeometry().setFromPoints(points);
				const baseMaterial = new THREE.LineBasicMaterial({
					color: 0x739bdc,
					transparent: true,
					opacity: 0.16
				});
				const baseLine = new THREE.Line(baseGeometry, baseMaterial);
				globeGroup.add(baseLine);

				const flowGeometry = new THREE.BufferGeometry().setFromPoints(points);
				const flowMaterial = new THREE.LineDashedMaterial({
					color: 0x9fc2f2,
					transparent: true,
					opacity: 0.36,
					dashSize: 0.08,
					gapSize: 0.1,
					scale: 1
				});
				const flowLine = new THREE.Line(flowGeometry, flowMaterial);
				flowLine.computeLineDistances();
				globeGroup.add(flowLine);

				animatedArcMaterials.push({
					material: flowMaterial as unknown as { dashOffset: number; opacity: number },
					speed: 0.22 + hash2(distance, height) * 0.36,
					phase: hash2(height, distance) * Math.PI * 2,
					baseOpacity: 0.24 + hash2(distance * 2, height * 3) * 0.12
				});

				const traveler = new THREE.Mesh(travelerGeometry, travelerMaterial);
				globeGroup.add(traveler);
				travelers.push({
					mesh: traveler as unknown as {
						position: { copy: (value: unknown) => void };
						visible: boolean;
					},
					curve: curve as unknown as { getPointAt: (value: number) => unknown },
					speed: 0.06 + hash2(height * 4, distance * 5) * 0.09,
					phase: hash2(distance * 7, height * 11)
				});
			}

			const starCount = 180;
			const starPositions = new Float32Array(starCount * 3);
			for (let i = 0; i < starCount; i += 1) {
				const radius = 3.9 + Math.random() * 2.4;
				const theta = Math.random() * Math.PI * 2;
				const phi = Math.acos(2 * Math.random() - 1);
				const offset = i * 3;
				starPositions[offset] = radius * Math.sin(phi) * Math.cos(theta);
				starPositions[offset + 1] = radius * Math.cos(phi);
				starPositions[offset + 2] = radius * Math.sin(phi) * Math.sin(theta);
			}
			const starGeometry = new THREE.BufferGeometry();
			starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
			const starMaterial = new THREE.PointsMaterial({
				color: 0x83a8e8,
				size: 0.011,
				transparent: true,
				opacity: 0.18
			});
			const stars = new THREE.Points(starGeometry, starMaterial);
			scene.add(stars);

			const onResize = () => {
				if (!container) {
					return;
				}
				const width = Math.max(container.clientWidth, 1);
				const height = Math.max(container.clientHeight, 1);
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				renderer.setSize(width, height, false);

				if (width < 860) {
					root.position.set(0.06, -0.1, 0);
					root.scale.setScalar(0.78);
				} else if (width > 1460) {
					root.position.set(1.28, -0.06, 0);
					root.scale.setScalar(0.96);
				} else {
					root.position.set(1.02, -0.08, 0);
					root.scale.setScalar(0.9);
				}
			};

			onResize();
			resizeObserver = new ResizeObserver(onResize);
			resizeObserver.observe(container);

			const onPointerMove = (event: PointerEvent) => {
				if (!container || reduceMotion) {
					return;
				}
				const rect = container.getBoundingClientRect();
				pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
				pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
			};
			window.addEventListener('pointermove', onPointerMove, { passive: true });

			const clock = new THREE.Clock();
			const renderFrame = () => {
				if (destroyed) {
					return;
				}

				const elapsed = clock.getElapsedTime();
				landMaterial.uniforms.uTime.value = elapsed;
				landMaterial.uniforms.uMotionEnabled.value = reduceMotion ? 0 : 1;

				smoothPointerX += (pointerX - smoothPointerX) * 0.055;
				smoothPointerY += (pointerY - smoothPointerY) * 0.055;

				if (reduceMotion) {
					globeGroup.rotation.set(BASE_ROTATION_X, BASE_ROTATION_Y, 0);
					for (const flow of animatedArcMaterials) {
						flow.material.dashOffset = 0;
						flow.material.opacity = flow.baseOpacity * 0.65;
					}
					for (const traveler of travelers) {
						traveler.mesh.visible = false;
					}
				} else {
					globeGroup.rotation.y =
						BASE_ROTATION_Y + elapsed * 0.07 * intensity + smoothPointerX * 0.16 * intensity;
					globeGroup.rotation.x =
						BASE_ROTATION_X + Math.sin(elapsed * 0.3) * 0.02 + smoothPointerY * 0.08 * intensity;
					globeGroup.rotation.z = Math.sin(elapsed * 0.2) * 0.012;

					for (const flow of animatedArcMaterials) {
						flow.material.dashOffset = -elapsed * flow.speed * intensity + flow.phase;
						flow.material.opacity =
							flow.baseOpacity + Math.sin(elapsed * 1.8 + flow.phase) * 0.05;
					}

					for (const traveler of travelers) {
						const t = (elapsed * traveler.speed * intensity + traveler.phase) % 1;
						traveler.mesh.visible = true;
						traveler.mesh.position.copy(traveler.curve.getPointAt(t));
					}
				}

				stars.rotation.y = -elapsed * 0.01;
				renderer.render(scene, camera);

				if (!reduceMotion) {
					rafId = requestAnimationFrame(renderFrame);
				}
			};

			const startRendering = () => {
				cancelAnimationFrame(rafId);
				renderFrame();
			};

			const stopRendering = () => {
				cancelAnimationFrame(rafId);
				renderFrame();
			};

			const onMotionChange = (event: MediaQueryListEvent) => {
				reduceMotion = event.matches;
				if (reduceMotion) {
					stopRendering();
				} else {
					startRendering();
				}
			};
			media.addEventListener('change', onMotionChange);
			startRendering();

			const disposeMaterial = (material: unknown) => {
				const materials = Array.isArray(material) ? material : [material];
				for (const item of materials) {
					if (!item || typeof item !== 'object') {
						continue;
					}
					for (const value of Object.values(item as Record<string, unknown>)) {
						if (
							value &&
							typeof value === 'object' &&
							'dispose' in value &&
							typeof (value as { dispose?: unknown }).dispose === 'function'
						) {
							(value as { dispose: () => void }).dispose();
						}
					}
					if ('dispose' in item && typeof (item as { dispose?: unknown }).dispose === 'function') {
						(item as { dispose: () => void }).dispose();
					}
				}
			};

			return () => {
				window.removeEventListener('pointermove', onPointerMove);
				media.removeEventListener('change', onMotionChange);
				cancelAnimationFrame(rafId);
				resizeObserver?.disconnect();
				scene.traverse((object) => {
					const disposable = object as {
						geometry?: { dispose?: () => void };
						material?: unknown;
					};
					disposable.geometry?.dispose?.();
					if (disposable.material) {
						disposeMaterial(disposable.material);
					}
				});
				renderer.dispose();
				renderer.domElement.remove();
			};
		};

		void initialize().then((teardown) => {
			cleanup = teardown;
		});

		return () => {
			destroyed = true;
			cleanup?.();
		};
	});
</script>

<div class="hero-three-wrap" bind:this={container} aria-hidden="true"></div>

<style>
	.hero-three-wrap {
		position: absolute;
		inset: 0;
		z-index: 1;
		overflow: hidden;
		pointer-events: none;
		-webkit-mask-image: radial-gradient(85% 72% at 72% 50%, #000 38%, rgba(0, 0, 0, 0.62) 72%, transparent 100%);
		mask-image: radial-gradient(85% 72% at 72% 50%, #000 38%, rgba(0, 0, 0, 0.62) 72%, transparent 100%);
	}

	:global(.hero-three-canvas) {
		display: block;
		width: 100% !important;
		height: 100% !important;
		opacity: 0.84;
		mix-blend-mode: normal;
		filter: saturate(1.04) contrast(1.01);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.hero-three-canvas) {
			opacity: 0.62;
			mix-blend-mode: normal;
		}
	}

	@media (max-width: 860px) {
		.hero-three-wrap {
			-webkit-mask-image: radial-gradient(88% 78% at 50% 48%, #000 34%, rgba(0, 0, 0, 0.62) 72%, transparent 100%);
			mask-image: radial-gradient(88% 78% at 50% 48%, #000 34%, rgba(0, 0, 0, 0.62) 72%, transparent 100%);
		}
	}
</style>
