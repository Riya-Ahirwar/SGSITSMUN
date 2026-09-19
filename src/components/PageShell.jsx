import Nav from "./Nav";
import Footer from "./Footer";

export default function PageShell({ eyebrow, title, subtitle, children }) {
  return (
    <>
      <Nav />
      <header className="bg-navy text-cream px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {eyebrow && <p className="uppercase tracking-widest text-sm text-cream/60 mb-3">{eyebrow}</p>}
          <h1 className="font-display text-4xl md:text-5xl mb-4">{title}</h1>
          {subtitle && <p className="text-cream/70 max-w-2xl">{subtitle}</p>}
        </div>
      </header>
      <main className="bg-cream px-6 py-16">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
      <Footer />
    </>
  );
}
