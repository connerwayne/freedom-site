export default function AboutPage() {
  return (
    <main>
      <section className="section-block">
        <span className="eyebrow">About us</span>
        <h1 className="section-title">A one-man operation you can trust</h1>
        <div className="feature-grid">
          <article className="info-card">
            <strong>Who we are</strong>
            <p>
              Freedom Landscaping is a sole-proprietor landscaping business serving
              homeowners and small commercial properties in the local area. Every
              estimate, every job, and every follow-up comes directly from the owner.
            </p>
          </article>
          <article className="info-card">
            <strong>How we work</strong>
            <p>
              We show up on time, communicate clearly, and leave your property
              cleaner than we found it. No shortcuts, no upsells, just honest work
              at a fair price with a handshake guarantee.
            </p>
          </article>
          <article className="info-card">
            <strong>Our services</strong>
            <p>
              Lawn maintenance and mowing, spring and fall cleanups, mulch
              installation, bush and hedge trimming, light construction like
              retaining walls and stone borders, and seasonal work including
              gutter cleaning and snow removal.
            </p>
          </article>
          <article className="info-card">
            <strong>Service area</strong>
            <p>
              We serve residential neighborhoods and light commercial properties
              within a reasonable drive. Not sure if we cover your area? Give us
              a call — we&apos;re happy to discuss options.
            </p>
          </article>
        </div>
      </section>

      <section className="section-block">
        <div className="cta-block">
          <div>
            <h2>Ready to get a quote?</h2>
            <p>Free on-site estimates. Most quotes same day.</p>
          </div>
          <a className="cta-light-link" href="tel:5558675309">
            Call (555) 867-5309
          </a>
        </div>
      </section>
    </main>
  );
}

