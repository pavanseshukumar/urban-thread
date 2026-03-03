const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-subtle/60 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-20 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-foreground">
            Urban Thread
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-dimmed">
            Modern everyday wear, designed with intention.
          </p>
        </div>

        <ul className="flex gap-10">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] uppercase tracking-[0.15em] text-dimmed transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-[11px] text-dimmed">
          &copy; {new Date().getFullYear()} Urban Thread
        </p>
      </div>
    </footer>
  );
}
