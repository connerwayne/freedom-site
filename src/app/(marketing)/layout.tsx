import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="marketing-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          Freedom Landscaping
        </Link>
        <nav className="topnav">
          <Link href="/#services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/login" className="topnav-signin">Sign in</Link>
          <ThemeToggle />
          <Link className="nav-cta" href="/#contact">
            Get a Quote
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
