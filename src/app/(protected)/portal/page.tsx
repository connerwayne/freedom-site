const invoiceHistory = [
  { id: "INV-221", service: "Hedge Trimming — Apr 28", amount: "$185", due: "May 7", status: "Due" },
  { id: "INV-215", service: "Spring Cleanup — Mar 12", amount: "$260", due: "Mar 20", status: "Paid" },
  { id: "INV-208", service: "Lawn Maintenance — Feb 18", amount: "$120", due: "Feb 25", status: "Paid" },
];

const upcomingJobs = [
  { service: "Lawn Maintenance", date: "May 3, 2026", notes: "Back yard focus, gate will be unlocked." },
  { service: "Mulch Install — Front beds", date: "May 14, 2026", notes: "3 yards hardwood mulch, confirmed." },
];

export default function PortalPage() {
  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">Client portal</span>
          <h1>Your account</h1>
          <p>View your invoices, pay your balance, and see scheduled service dates.</p>
        </div>
      </div>

      {/* Outstanding balance CTA */}
      <article className="portal-balance-card">
        <div>
          <span className="portal-balance-label">Outstanding balance</span>
          <span className="portal-balance-amount">$185.00</span>
          <span className="portal-balance-sub">Invoice INV-221 · Due May 7, 2026</span>
        </div>
        <button className="portal-pay-btn">Pay now</button>
      </article>

      {/* Upcoming jobs */}
      <article className="panel">
        <strong>Upcoming service</strong>
        <div className="portal-job-list">
          {upcomingJobs.map((job) => (
            <div className="portal-job-row" key={job.date}>
              <div className="portal-job-icon">🌿</div>
              <div>
                <span className="portal-job-title">{job.service}</span>
                <span className="portal-job-date">{job.date}</span>
                {job.notes && <span className="portal-job-notes">{job.notes}</span>}
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* Invoice history */}
      <article className="panel">
        <strong>Invoice history</strong>
        <div className="data-table" style={{ marginTop: "1rem" }}>
          <div className="data-row data-row-head">
            <span>Invoice</span>
            <span>Service</span>
            <span>Amount</span>
            <span>Due</span>
            <span>Status</span>
          </div>
          {invoiceHistory.map((inv) => (
            <div className="data-row" key={inv.id}>
              <span className="data-id">{inv.id}</span>
              <span>{inv.service}</span>
              <span>{inv.amount}</span>
              <span>{inv.due}</span>
              <span>
                <span className={`badge ${inv.status === "Paid" ? "badge-green" : "badge-yellow"}`}>
                  {inv.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </article>

      {/* Contact */}
      <article className="panel portal-contact">
        <strong>Questions about your service?</strong>
        <p>Call or text: <a href="tel:5558675309">(555) 867-5309</a></p>
        <p>Email: <a href="mailto:hello@freedomlandscaping.com">hello@freedomlandscaping.com</a></p>
      </article>
    </section>
  );
}
