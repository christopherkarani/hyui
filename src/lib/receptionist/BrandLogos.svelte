<script lang="ts">
	interface Props {
		name: 'twilio' | 'klarna' | 'cisco' | 'telekom' | 'elise' | 'eldra';
		label: string;
	}

	let { name, label }: Props = $props();
</script>

{#if name === 'twilio'}
	<svg
		role="img"
		aria-label={label}
		viewBox="0 0 120 40"
		width="120"
		height="40"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<text
			x="60"
			y="27"
			text-anchor="middle"
			font-family="Inter, 'Segoe UI', system-ui, sans-serif"
			font-size="26"
			font-weight="700"
			letter-spacing="-1.5"
		>
			twilio
		</text>
		<circle cx="105" cy="25" r="3.4" />
	</svg>
{:else if name === 'klarna'}
	<svg
		role="img"
		aria-label={label}
		viewBox="0 0 163 40"
		width="163"
		height="40"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<text
			x="81"
			y="28"
			text-anchor="middle"
			font-family="Inter, 'Segoe UI', system-ui, sans-serif"
			font-size="27"
			font-weight="800"
			letter-spacing="-1"
		>
			Klarna.
		</text>
	</svg>
{:else if name === 'cisco'}
	<svg
		role="img"
		aria-label={label}
		viewBox="0 0 120 48"
		width="120"
		height="48"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g>
			<rect x="38" y="6" width="4" height="14" rx="2" />
			<rect x="45" y="3" width="4" height="17" rx="2" />
			<rect x="52" y="1" width="4" height="19" rx="2" />
			<rect x="59" y="0" width="4" height="20" rx="2" />
			<rect x="66" y="1" width="4" height="19" rx="2" />
			<rect x="73" y="3" width="4" height="17" rx="2" />
			<rect x="80" y="6" width="4" height="14" rx="2" />
		</g>
		<text
			x="61"
			y="42"
			text-anchor="middle"
			font-family="Inter, 'Segoe UI', system-ui, sans-serif"
			font-size="17"
			font-weight="600"
			letter-spacing="4"
		>
			CISCO
		</text>
	</svg>
{:else if name === 'telekom'}
	<svg
		role="img"
		aria-label={label}
		viewBox="0 0 205 40"
		width="205"
		height="40"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect x="2" y="4" width="32" height="32" rx="4" />
		<text
			x="18"
			y="29"
			text-anchor="middle"
			font-family="Inter, 'Segoe UI', system-ui, sans-serif"
			font-size="23"
			font-weight="800"
			fill="var(--r-surface, #fdfcfc)"
		>
			T
		</text>
		<text
			x="42"
			y="26"
			font-family="Inter, 'Segoe UI', system-ui, sans-serif"
			font-size="16"
			font-weight="700"
			letter-spacing="-0.3"
		>
			Deutsche Telekom
		</text>
	</svg>
{:else if name === 'elise'}
	<svg
		role="img"
		aria-label={label}
		viewBox="0 0 120 40"
		width="120"
		height="40"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<text
			x="60"
			y="27"
			text-anchor="middle"
			font-family="Inter, 'Segoe UI', system-ui, sans-serif"
			font-size="25"
			font-weight="700"
			letter-spacing="-1"
		>
			EliseAI
		</text>
	</svg>
{:else}
	<svg
		role="img"
		aria-label={label}
		viewBox="0 0 120 40"
		width="120"
		height="40"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<text
			x="60"
			y="27"
			text-anchor="middle"
			font-family="Inter, 'Segoe UI', system-ui, sans-serif"
			font-size="25"
			font-weight="600"
			letter-spacing="3"
		>
			ELDRA
		</text>
	</svg>
{/if}

<style>
	svg {
		display: block;
		height: auto;
		max-height: 2.5rem;
		width: auto;
		max-width: 9rem;
	}
</style>
