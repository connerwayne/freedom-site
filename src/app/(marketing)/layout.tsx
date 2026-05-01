import Link from "next/link";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="marketing-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          Freedom Site
        </Link>
        <nav className="topnav">
          <Link href="/about">About</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link className="nav-cta" href="/login">
            Sign in
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
