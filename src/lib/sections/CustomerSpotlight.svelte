<section class="spotlight">
	<div class="spotlight-inner">
		<header class="spotlight-header">
			<div class="spotlight-eyebrow">
				<span class="eyebrow-dot" aria-hidden="true"></span>
				<span class="eyebrow-text">CUSTOMER SPOTLIGHT</span>
			</div>
			<h2 class="spotlight-headline">
				See how enterprises scaled customer support with Pantaa
			</h2>
		</header>

		<a href="./doordash" class="spotlight-card">
			<div class="spotlight-image-side">
				<img
					src="/pantaa/images/spotlight-doordash.jpg"
					alt="DoorDash delivery interaction"
					class="spotlight-photo"
					loading="lazy"
				/>
				<div class="spotlight-image-overlay">
					<div class="spotlight-stat">
						<span class="spotlight-stat-label">DWR RATE</span>
						<span class="spotlight-stat-value">80%</span>
					</div>
				</div>
			</div>

			<div class="spotlight-content-side">
				<div class="spotlight-brand">
					<svg class="doordash-logo" width="160" height="22" viewBox="0 0 160 22" fill="none">
						<path d="M0 6 L13 6 L9 16 L-3 16 Z" fill="#EB1700"/>
						<text x="22" y="18" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="#EB1700">DOORDASH</text>
					</svg>
				</div>

				<h3 class="spotlight-title">How DoorDash and Pantaa scaled enterprise support reliability</h3>

				<span class="spotlight-cta-link">
					Learn more
				</span>

				<div class="spotlight-testimonial">
					<div class="testimonial-attribution">
						<img src="/pantaa/images/spotlight-avatar.webp" alt="Andy Fang" class="testimonial-avatar" loading="lazy" />
						<div class="testimonial-meta">
							<span class="testimonial-name">Andy Fang</span>
							<span class="testimonial-role">Co-Founder at DoorDash</span>
						</div>
					</div>
					<blockquote class="testimonial-quote">
						"At DoorDash, we operate at massive scale across services, platforms, and languages. Pantaa delivered measurable gains in resolution quality, escalation control, and operational efficiency across our teams."
					</blockquote>
				</div>
			</div>
		</a>
	</div>
</section>

<style>
	.spotlight {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgb(255, 255, 255);
		padding: 120px 36px;
		gap: 80px;
		color: rgb(12, 18, 29);
		width: 100%;
	}

	.spotlight-inner {
		width: 100%;
		max-width: 1320px;
	}

	.spotlight-header {
		display: flex;
		flex-direction: column;
		gap: 32px;
		margin-bottom: 80px;
	}

	.spotlight-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 10px;
	}

	.eyebrow-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgb(255, 132, 92);
	}

	.eyebrow-text {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.6px;
		text-transform: uppercase;
		color: rgba(12, 18, 29, 0.78);
	}

	.spotlight-headline {
		font-family: var(--font-display-hero);
		font-size: clamp(40px, 5.2vw, 72px);
		font-weight: 300;
		line-height: 1.06;
		letter-spacing: -1.4px;
		color: rgb(12, 18, 29);
		max-width: 22ch;
	}

	.spotlight-card {
		display: flex;
		border-radius: 18px;
		overflow: hidden;
		background: rgb(10, 10, 10);
		border: 1px solid rgba(255, 255, 255, 0.06);
		text-decoration: none;
		color: inherit;
	}

	.spotlight-image-side {
		flex: 0 0 44%;
		position: relative;
		min-height: 540px;
	}

	.spotlight-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.spotlight-image-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		background: linear-gradient(180deg, rgba(235, 23, 0, 0) 0%, rgba(235, 23, 0, 0) 38%, rgba(235, 23, 0, 0.72) 100%);
		display: flex;
		align-items: flex-end;
		padding: 36px;
	}

	.spotlight-stat {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.spotlight-stat-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.6px;
		text-transform: uppercase;
		color: rgb(255, 255, 255);
	}

	.spotlight-stat-value {
		font-family: var(--font-display-hero);
		font-size: 80px;
		font-weight: 300;
		line-height: 1;
		letter-spacing: -2.4px;
		color: rgb(255, 255, 255);
	}

	.spotlight-content-side {
		flex: 1;
		padding: 56px 56px 48px;
		display: flex;
		flex-direction: column;
	}

	.doordash-logo {
		margin-bottom: 28px;
	}

	.spotlight-title {
		font-family: var(--font-sans-display);
		font-size: clamp(24px, 2vw, 30px);
		font-weight: 500;
		line-height: 1.25;
		letter-spacing: -0.4px;
		color: rgb(255, 255, 255);
		margin-bottom: 28px;
		max-width: 22ch;
	}

	.spotlight-cta-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		border-radius: var(--radius-pill);
		background: rgb(0, 0, 0);
		color: rgb(255, 255, 255);
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.4;
		width: fit-content;
		margin-bottom: 56px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.spotlight-cta-link:hover,
	.spotlight-cta-link:focus-visible {
		background: rgba(255, 255, 255, 0.08);
		color: rgb(255, 255, 255);
		border-color: rgba(255, 255, 255, 0.32);
	}

	.spotlight-testimonial {
		margin-top: auto;
	}

	.testimonial-attribution {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 22px;
	}

	.testimonial-avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
	}

	.testimonial-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.testimonial-name {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 500;
		line-height: 1.4;
		color: rgb(255, 255, 255);
	}

	.testimonial-role {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 400;
		line-height: 1.4;
		color: rgba(255, 255, 255, 0.55);
	}

	.testimonial-quote {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 400;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.78);
	}

	@media (max-width: 809.98px) {
		.spotlight {
			padding: 80px 20px;
		}

		.spotlight-card {
			flex-direction: column;
		}

		.spotlight-image-side {
			flex: none;
			min-height: 320px;
		}

		.spotlight-content-side {
			flex: none;
			padding: 32px 24px;
		}

		.spotlight-title {
			max-width: 22ch;
		}
	}
</style>
