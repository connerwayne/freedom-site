import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page-stack">
      <header className="subsection-header panel">
        <div>
          <span className="eyebrow">Nested dashboard layout</span>
          <h2 className="section-title">Projects live inside their own section shell.</h2>
        </div>
        <nav>
          <ul className="mini-nav">
            <li>
              <Link href="/dashboard">Overview</Link>
            </li>
            <li>
              <Link href="/dashboard/projects">Projects</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
}
