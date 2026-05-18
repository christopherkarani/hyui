<section class="footer">
	<div class="footer-inner">
		<div class="footer-left">
			<div class="footer-brand">
				<svg class="footer-logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
					<path d="M16 3 C22 5, 28 10, 30 16 C28 23, 22 27, 16 30 C13 25, 16 20, 21 16 C16 14, 11 16, 6 21 C4 14, 9 7, 16 3 Z" fill="#0c121d"/>
				</svg>
				<span class="footer-brand-text">Pantaa</span>
			</div>

			<div class="footer-note">
				<div class="note-eyebrow">
					<span class="note-dot" aria-hidden="true"></span>
					<span class="note-text">AI AUTOMATION AGENCY</span>
				</div>
				<p>We set up autonomous AI agent systems for businesses that want outcomes before tooling overhead.</p>
			</div>
		</div>

		<div class="footer-links">
			<div class="footer-column">
				<h4 class="footer-column-title">OFFER</h4>
				<a href="#workflows" class="footer-link">AI agent setup</a>
				<a href="#workflows" class="footer-link">Workflow buildout</a>
				<a href="#process" class="footer-link">Managed operations</a>
				<a href="./contact" class="footer-link">Setup call</a>
			</div>
			<div class="footer-column">
				<h4 class="footer-column-title">WHO WE HELP</h4>
				<a href="#fit" class="footer-link">law firms</a>
				<a href="#fit" class="footer-link">insurance agencies</a>
				<a href="#fit" class="footer-link">real estate teams</a>
				<a href="#fit" class="footer-link">manufacturers</a>
			</div>
			<div class="footer-column">
				<h4 class="footer-column-title">COMPANY</h4>
				<a href="./contact" class="footer-link">Contact</a>
				<a href="./privacy" class="footer-link">Privacy Policy</a>
				<a href="./terms" class="footer-link">Terms of Service</a>
			</div>
		</div>
	</div>

	<div class="footer-watermark" aria-hidden="true">
		<span class="watermark-text">Pantaa</span>
	</div>

	<div class="footer-bottom">
		<span class="footer-copyright">© 2026 Pantaa AI, Inc.</span>
		<div class="footer-social">
			<a href="https://x.com" class="social-link" aria-label="X (Twitter)">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M12.6 1H15L9.7 7.2L16 15H11.1L7.2 10.1L2.8 15H0.4L6 8.4L0 1H5L8.6 5.5L12.6 1ZM11.7 13.6H13.1L4.3 2.5H2.8L11.7 13.6Z" fill="currentColor" />
				</svg>
			</a>
			<a href="https://linkedin.com" class="social-link" aria-label="LinkedIn">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M3.6 1.8C3.6 2.8 2.8 3.6 1.8 3.6C0.8 3.6 0 2.8 0 1.8C0 0.8 0.8 0 1.8 0C2.8 0 3.6 0.8 3.6 1.8ZM3.6 5H0V16H3.6V5ZM8.6 5H5V16H8.6V10.2C8.6 7 12.8 6.7 12.8 10.2V16H16V9C16 3.7 10 3.9 8.6 6.5V5Z" fill="currentColor" />
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.footer {
		position: relative;
		background: rgb(255, 255, 255);
		color: rgb(12, 18, 29);
		padding: 80px 36px 40px;
		overflow: hidden;
		width: 100%;
	}

	.footer-watermark {
		display: none;
	}

	.footer-inner {
		display: grid;
		grid-template-columns: 1fr 2.2fr;
		gap: 80px;
		max-width: 1320px;
		margin: 0 auto;
		padding: 0;
		position: relative;
		z-index: 1;
		background: transparent;
	}

	.footer-left {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.footer-brand,
	.note-eyebrow {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.footer-brand-text {
		font-family: var(--font-sans-display);
		font-size: 24px;
		font-weight: 500;
		letter-spacing: -0.4px;
		color: rgb(12, 18, 29);
	}

	.footer-note {
		display: flex;
		flex-direction: column;
		gap: 14px;
		max-width: 34ch;
	}

	.note-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgb(132, 204, 90);
		box-shadow: 0 0 0 3px rgba(132, 204, 90, 0.18);
	}

	.note-text,
	.footer-column-title {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 400;
		letter-spacing: 0.6px;
		text-transform: uppercase;
	}

	.note-text {
		color: rgba(12, 18, 29, 0.78);
	}

	.footer-note p {
		font-family: var(--font-sans);
		font-size: 15px;
		line-height: 1.6;
		color: rgba(12, 18, 29, 0.62);
	}

	.footer-links {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 64px;
	}

	.footer-column {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.footer-column-title {
		line-height: 1;
		color: rgba(12, 18, 29, 0.52);
		margin-bottom: 6px;
	}

	.footer-link {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 400;
		line-height: 1.5;
		color: rgb(12, 18, 29);
	}

	.footer-link:hover,
	.footer-link:focus-visible {
		color: rgba(12, 18, 29, 0.62);
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1320px;
		margin: 120px auto 0;
		padding: 24px 0 0;
		border-top: 1px solid rgba(12, 18, 29, 0.08);
		position: relative;
		z-index: 1;
	}

	.footer-copyright {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 400;
		line-height: 1.4;
		color: rgba(12, 18, 29, 0.52);
	}

	.footer-social {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(12, 18, 29, 0.62);
	}

	.social-link:hover,
	.social-link:focus-visible {
		color: rgb(12, 18, 29);
	}

	@media (max-width: 809.98px) {
		.footer {
			padding: 60px 24px 32px;
		}

		.footer-inner {
			grid-template-columns: 1fr;
			gap: 48px;
		}

		.footer-links {
			grid-template-columns: 1fr 1fr;
			gap: 32px;
		}

		.watermark-text {
			font-size: 200px;
		}

		.footer-bottom {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
			margin-top: 60px;
		}
	}
</style>
