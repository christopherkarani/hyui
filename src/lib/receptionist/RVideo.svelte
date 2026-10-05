<script lang="ts">
	let playing = $state(false);
	let videoEl: HTMLVideoElement | null = $state(null);

	function play() {
		playing = true;
		requestAnimationFrame(() => videoEl?.play().catch(() => {}));
	}
</script>

<section aria-label="Product preview">
	<div class="r-wrap">
		<div class="r-video-pad">
			<div class="r-video">
				{#if !playing}
					<img
						src="/receptionist/images/poster.png"
						alt=""
						aria-hidden="true"
						class="r-poster"
						loading="lazy"
					/>
					<button type="button" class="r-play-hit" aria-label="Play video" onclick={play}></button>
					<div class="r-play-badge" aria-hidden="true">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
						</svg>
					</div>
				{:else}
					<!-- svelte-ignore a11y_media_has_caption: demo clip ships without a caption track -->
					<video
						bind:this={videoEl}
						class="r-el"
						src="/receptionist/reception-preview.mp4"
						poster="/receptionist/images/poster.png"
						controls
						loop
						playsinline
						autoplay
					></video>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.r-video-pad {
		padding-top: 1.75rem;
		padding-bottom: 1.75rem;
	}

	@media (min-width: 768px) {
		.r-video-pad {
			padding-top: 2.5rem;
			padding-bottom: 2.5rem;
		}
	}

	@media (min-width: 1024px) {
		.r-video-pad {
			padding-top: 3.5rem;
			padding-bottom: 3.5rem;
		}
	}

	.r-video {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		border-radius: 1rem;
		overflow: hidden;
		background: #000;
	}

	.r-poster {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: scale(1.35);
		pointer-events: none;
	}

	@media (min-width: 768px) {
		.r-poster {
			transform: none;
		}
	}

	.r-play-hit {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 5;
		cursor: pointer;
		background: transparent;
		border-radius: inherit;
	}

	.r-play-badge {
		position: absolute;
		z-index: 6;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		height: 2rem;
		width: 3rem;
		border-radius: 1.5rem;
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		color: #fff;
		pointer-events: none;
		transition: opacity 300ms ease-out;
	}

	@media (min-width: 768px) {
		.r-play-badge {
			top: auto;
			left: 1.5rem;
			bottom: 1.5rem;
			transform: none;
			height: 2.5rem;
			width: 3.5rem;
		}
	}

	.r-el {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
</style>
