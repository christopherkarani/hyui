<section class="footer">
	<video
		src="/videos/footer-bg.mp4"
		class="footer-video"
		autoplay
		muted
		loop
		playsinline
		aria-hidden="true"
	></video>
	<div class="footer-watermark">
		<span class="watermark-text">Giga</span>
	</div>

	<div class="footer-inner">
		<div class="footer-left">
			<div class="footer-brand">
				<svg class="footer-logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="11" stroke="black" stroke-width="1.5"/>
					<path d="M6 12C6 8.68629 8.68629 6 12 6" stroke="black" stroke-width="1.5"/>
					<path d="M18 12C18 15.3137 15.3137 18 12 18" stroke="black" stroke-width="1.5"/>
					<path d="M4 12H20" stroke="black" stroke-width="1" opacity="0.3"/>
				</svg>
				<span class="footer-brand-text">Giga</span>
			</div>

			<div class="footer-compliance">
				<span class="compliance-badge">Compliant</span>
				<div class="compliance-certs">
					<span class="cert-badge">SOC2</span>
					<span class="cert-badge">ISO 42001</span>
					<span class="cert-badge">ISO 27001</span>
				</div>
			</div>
		</div>

		<div class="footer-links">
			<div class="footer-column">
				<h4 class="footer-column-title">Product</h4>
				<a href="./agent-canvas" class="footer-link">Agent Canvas</a>
				<a href="./insights" class="footer-link">Insights</a>
				<a href="./voice-experience" class="footer-link">Voice Experience</a>
				<a href="./browser-agent" class="footer-link">Browser Agent</a>
			</div>
			<div class="footer-column">
				<h4 class="footer-column-title">Company</h4>
				<a href="./careers" class="footer-link">Careers</a>
				<a href="./contact" class="footer-link">Contact</a>
				<a href="./trust" class="footer-link">Trust Center</a>
			</div>
			<div class="footer-column">
				<h4 class="footer-column-title">Resources</h4>
				<a href="./news" class="footer-link">News</a>
				<a href="./privacy" class="footer-link">Privacy Policy</a>
				<a href="./terms" class="footer-link">Terms Of Service</a>
			</div>
		</div>
	</div>

	<div class="footer-bottom">
		<span class="footer-copyright">© 2026 Giga AI, Inc.</span>
		<div class="footer-social">
			<a href="https://x.com" class="social-link" aria-label="X (Twitter)">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M12.6 1H15L9.7 7.2L16 15H11.1L7.2 10.1L2.8 15H0.4L6 8.4L0 1H5L8.6 5.5L12.6 1ZM11.7 13.6H13.1L4.3 2.5H2.8L11.7 13.6Z" fill="currentColor"/>
				</svg>
			</a>
			<span class="social-divider">|</span>
			<a href="https://linkedin.com" class="social-link" aria-label="LinkedIn">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M3.6 1.8C3.6 2.8 2.8 3.6 1.8 3.6C0.8 3.6 0 2.8 0 1.8C0 0.8 0.8 0 1.8 0C2.8 0 3.6 0.8 3.6 1.8ZM3.6 5H0V16H3.6V5ZM8.6 5H5V16H8.6V10.2C8.6 7 12.8 6.7 12.8 10.2V16H16V9C16 3.7 10 3.9 8.6 6.5V5Z" fill="currentColor"/>
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.footer {
		position: relative;
		background: var(--bg-surface-white);
		color: var(--text-primary-light);
		padding: 80px 0 40px;
		overflow: hidden;
		min-height: 740px;
		width: 100%;
	}

	.footer-video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.15;
		pointer-events: none;
		z-index: 0;
	}

	.footer-watermark {
		position: absolute;
		top: -40px;
		left: 50%;
		transform: translateX(-50%);
		pointer-events: none;
		z-index: 1;
	}

	.watermark-text {
		font-family: var(--font-display-hero);
		font-size: 300px;
		font-weight: 300;
		color: rgba(0, 0, 0, 0.04);
		white-space: nowrap;
		line-height: 1;
	}

	.footer-inner {
		display: flex;
		justify-content: space-between;
		max-width: 1600px;
		margin: 0 auto;
		padding: 0 var(--space-5);
		position: relative;
		z-index: 1;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(10px);
	}

	.footer-left {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.footer-brand {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.footer-brand-text {
		font-family: var(--font-sans);
		font-size: 18px;
		font-weight: 600;
		letter-spacing: -0.3px;
	}

	.footer-compliance {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.compliance-badge {
		display: inline-flex;
		align-items: center;
		padding: 4px 12px;
		border-radius: var(--radius-pill);
		background: var(--bg-trust-green-50);
		font-family: var(--font-sans);
		font-size: var(--type-body-sm-size);
		font-weight: 500;
		line-height: var(--type-body-sm-lh);
		color: rgb(22, 101, 52);
		width: fit-content;
	}

	.compliance-certs {
		display: flex;
		gap: 8px;
	}

	.cert-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 4px 10px;
		border-radius: var(--radius-pill);
		border: var(--border-subtle);
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		color: var(--text-subtle-gray);
		white-space: nowrap;
	}

	.footer-links {
		display: flex;
		gap: 80px;
	}

	.footer-column {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.footer-column-title {
		font-family: var(--font-sans);
		font-size: var(--type-body-md-size);
		font-weight: 600;
		line-height: var(--type-body-md-lh);
		color: var(--text-primary-light);
		margin-bottom: 4px;
	}

	.footer-link {
		font-family: var(--font-sans);
		font-size: var(--type-body-md-size);
		font-weight: var(--type-body-md-weight);
		line-height: var(--type-body-md-lh);
		color: var(--text-muted-light-60);
		transition: color var(--motion-link-duration) var(--motion-link-easing);
	}

	.footer-link:hover {
		color: var(--text-primary-light);
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1600px;
		margin: 60px auto 0;
		padding: 20px var(--space-5) 0;
		border-top: var(--border-subtle);
		position: relative;
		z-index: 1;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(10px);
	}

	.footer-copyright {
		font-family: var(--font-sans);
		font-size: var(--type-body-sm-size);
		font-weight: var(--type-body-sm-weight);
		line-height: var(--type-body-sm-lh);
		color: var(--text-muted-light-50);
	}

	.footer-social {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted-light-50);
		transition: color var(--motion-link-duration) var(--motion-link-easing);
	}

	.social-link:hover {
		color: var(--text-primary-light);
	}

	.social-divider {
		color: var(--text-muted-light-30);
		font-size: 12px;
	}

	@media (max-width: 809.98px) {
		.footer {
			padding: 60px 0 40px;
		}

		.footer-inner {
			flex-direction: column;
			gap: 48px;
		}

		.footer-links {
			flex-direction: column;
			gap: 32px;
		}

		.watermark-text {
			font-size: 160px;
		}

		.footer-bottom {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}
	}

@media (max-width: 809px) {
	.footer {
		min-height: 1010px;
	}
}
</style>
