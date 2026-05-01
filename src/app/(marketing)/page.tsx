import Link from "next/link";

const services = [
  {
    icon: "🌿",
    title: "Lawn Maintenance",
    description:
      "Weekly or bi-weekly mowing, edging, and trimming to keep your lawn thick, green, and healthy all season long.",
  },
  {
    icon: "🍂",
    title: "Yard Cleanup",
    description:
      "Spring and fall cleanups, leaf removal, debris hauling, and bed clearing to refresh your property any time of year.",
  },
  {
    icon: "🪨",
    title: "Light Construction",
    description:
      "Retaining walls, garden borders, stone pathways, and small hardscape installations built with care and built to last.",
  },
  {
    icon: "🌱",
    title: "Mulching & Bed Care",
    description:
      "Fresh mulch delivery and installation, bed edging, and weeding for a clean, polished, professional finish.",
  },
  {
    icon: "✂️",
    title: "Bush & Hedge Trimming",
    description:
      "Shape and maintain hedges, shrubs, and ornamental plantings to sharpen your curb appeal and keep growth in check.",
  },
  {
    icon: "🏡",
    title: "Seasonal Services",
    description:
      "Gutter cleaning, snow removal, and storm cleanup so your property stays safe and presentable through every season.",
  },
];

const reasons = [
  {
    title: "Owner on every job",
    body: "You hired me — I show up. No subcontractors, no crews that change week to week. You get the same person every time.",
  },
  {
    title: "Honest, upfront pricing",
    body: "Free estimates with no pressure. The price I quote is the price you pay — no hidden fees or surprise add-ons.",
  },
  {
    title: "Local & dependable",
    body: "I'm a neighbor, not a franchise. I care about the reputation I've built in this community and it shows in my work.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <article className="hero-card">
          <span className="eyebrow">Serving the local area</span>
          <h1>Your lawn, our pride.</h1>
          <p>
            Freedom Landscaping handles the outdoor work so you don&apos;t have to.
            From weekly lawn care to light construction, every job gets personal
            attention and a job done right.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href="/#contact">
              Get a free quote
            </Link>
            <Link className="ghost-link" href="/#services">
              See what we do
            </Link>
          </div>
          <ul className="stack-list">
            <li>Lawn maintenance, cleanup &amp; mulching.</li>
            <li>Retaining walls, borders &amp; stone pathways.</li>
            <li>Reliable, owner-operated — no subcontractors.</li>
          </ul>
        </article>

        <aside className="info-card">
          <strong>Ready to get started?</strong>
          <p>
            Call or text for a free on-site estimate. Most quotes are delivered
            the same day.
          </p>
          <div className="code-block" style={{ marginTop: "1.25rem" }}>
            <code style={{ fontFamily: "inherit", fontSize: "1.05rem" }}>
              📞 (555) 867-5309
            </code>
          </div>
          <p style={{ marginTop: "1.1rem" }}>
            Serving residential and small commercial properties. Licensed and
            insured.
          </p>
        </aside>
      </section>

      {/* Services */}
      <section className="section-block" id="services">
        <span className="eyebrow">What we offer</span>
        <h2 className="section-title">Services built for real yards</h2>
        <div className="service-grid">
          {services.map((s) => (
            <article className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <strong>{s.title}</strong>
              <p>{s.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="section-block">
        <span className="earth-eyebrow">Why Freedom Landscaping</span>
        <h2 className="section-title">Small company, big difference</h2>
        <div className="why-grid">
          {reasons.map((r) => (
            <article className="why-card" key={r.title}>
              <strong>{r.title}</strong>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-block" id="contact">
        <div className="cta-block">
          <div>
            <h2>Let&apos;s talk about your yard.</h2>
            <p>Free estimates. No obligation. Fast response.</p>
          </div>
          <Link className="cta-light-link" href="mailto:hello@freedomlandscaping.com">
            Email us today
          </Link>
        </div>
      </section>
    </main>
  );
}

