<section class="spotlight">
	<div class="spotlight-inner">
		<a href="./doordash" class="spotlight-card">
			<div class="spotlight-image-side">
				<img
					src="/images/spotlight-doordash.jpg"
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
					<svg class="doordash-logo" width="120" height="20" viewBox="0 0 120 20" fill="none">
						<text x="0" y="16" font-family="Inter, sans-serif" font-size="16" font-weight="700" fill="#FF3008">DoorDash</text>
					</svg>
				</div>

				<h2 class="spotlight-title">How DoorDash and Giga built reliable support at scale</h2>

				<span class="spotlight-cta-link">
					Learn more
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
						<path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</span>

				<div class="spotlight-testimonial">
					<div class="testimonial-attribution">
						<img src="/images/spotlight-avatar.webp" alt="Andy Fang" class="testimonial-avatar" loading="lazy" />
						<div class="testimonial-meta">
							<span class="testimonial-name">Andy Fang</span>
							<span class="testimonial-role">Co-Founder at DoorDash</span>
						</div>
					</div>
					<blockquote class="testimonial-quote">
						At DoorDash, we operate at a massive scale across services, platforms, and languages. Giga leveraged usage data to deliver measurable improvements, including fewer escalations, faster resolution paths, and more efficient workflows across our teams.
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
		background: var(--bg-surface-light);
		padding: var(--spotlight-padding);
		gap: var(--spotlight-gap);
		color: var(--text-primary-light);
		width: 100%;
		min-height: 954.8px;
	}

	.spotlight-inner {
		width: 100%;
		max-width: 1600px;
		padding: 0 var(--space-5);
	}

	.spotlight-card {
		display: flex;
		border-radius: var(--radius-md);
		overflow: hidden;
		box-shadow: var(--shadow-surface-soft);
		background: var(--bg-surface-white);
		text-decoration: none;
		color: inherit;
	}

	@media (max-width: 809.98px) {
		.spotlight-card {
			border-radius: var(--radius-sm);
		}
	}

	.spotlight-image-side {
		flex: 0 0 50%;
		position: relative;
		min-height: 400px;
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
		height: 50%;
		background: linear-gradient(transparent, var(--bg-brand-orange));
		display: flex;
		align-items: flex-end;
		padding: 24px;
	}

	.spotlight-stat {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-left: auto;
	}

	.spotlight-stat-label {
		font-family: var(--font-mono);
		font-size: var(--type-eyebrow-size);
		font-weight: var(--type-eyebrow-weight);
		line-height: var(--type-eyebrow-lh);
		letter-spacing: var(--type-eyebrow-ls);
		text-transform: uppercase;
		color: var(--text-primary-dark);
	}

	.spotlight-stat-value {
		font-family: var(--font-sans);
		font-size: 48px;
		font-weight: 700;
		line-height: 48px;
		letter-spacing: -1.44px;
		color: var(--text-primary-dark);
	}

	.spotlight-content-side {
		flex: 0 0 50%;
		padding: 40px;
		display: flex;
		flex-direction: column;
	}

	.doordash-logo {
		margin-bottom: 24px;
	}

	.spotlight-title {
		font-family: var(--font-sans);
		font-size: 24px;
		font-weight: 600;
		line-height: 32px;
		letter-spacing: -0.48px;
		color: var(--text-primary-light);
		margin-bottom: 20px;
	}

	.spotlight-cta-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 9px 20px;
		border-radius: var(--radius-pill);
		background: var(--bg-cta-dark);
		color: var(--text-primary-dark);
		font-family: var(--font-sans);
		font-size: var(--type-button-md-size);
		font-weight: var(--type-button-md-weight);
		line-height: var(--type-button-md-lh);
		width: fit-content;
		margin-bottom: 32px;
	}

	.spotlight-testimonial {
		margin-top: auto;
	}

	.testimonial-attribution {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
	}

	.testimonial-avatar {
		width: 50px;
		height: 50px;
		border-radius: var(--radius-sm);
		object-fit: cover;
	}

	.testimonial-meta {
		display: flex;
		flex-direction: column;
	}

	.testimonial-name {
		font-family: var(--font-sans);
		font-size: var(--type-body-md-size);
		font-weight: 600;
		line-height: var(--type-body-md-lh);
		color: var(--text-primary-light);
	}

	.testimonial-role {
		font-family: var(--font-sans);
		font-size: var(--type-body-sm-size);
		font-weight: var(--type-body-sm-weight);
		line-height: var(--type-body-sm-lh);
		color: var(--text-muted-light-50);
	}

	.testimonial-quote {
		font-family: var(--font-sans);
		font-size: var(--type-body-md-size);
		font-weight: var(--type-body-md-weight);
		line-height: var(--type-body-md-lh);
		color: var(--text-muted-light-60);
	}

	@media (max-width: 809.98px) {
		.spotlight-card {
			flex-direction: column;
			border-radius: var(--radius-sm);
		}

		.spotlight-image-side {
			flex: none;
			min-height: 280px;
		}

		.spotlight-content-side {
			flex: none;
			padding: 24px;
		}

		.spotlight-inner {
			padding: 0 30px;
		}
	}

@media (max-width: 810px) {
	.spotlight {
		min-height: 1015.8px;
	}
}
@media (max-width: 809px) {
	.spotlight {
		min-height: 1350.8px;
	}
}
</style>
