import PageShell from "@/components/PageShell";
import { feePackages } from "@/data/site";

export const metadata = { title: "Fees & Packages | SGSITS MUN" };

export default function FeesPage() {
  return (
    <PageShell
      eyebrow="Delegate Desk"
      title="Fees & Packages"
      subtitle="Straightforward pricing. No hidden charges, no surprise add-ons at check-in."
    >
      <div className="grid md:grid-cols-3 gap-6">
        {feePackages.map((pkg) => (
          <div key={pkg.name} className="border border-navy/15 rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <h3 className="font-display text-xl">{pkg.name}</h3>
              <p className="text-2xl font-semibold mt-1">{pkg.price}</p>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-navy/70">
              {pkg.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span>✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="/#register"
              className="mt-auto bg-navy text-cream text-center px-4 py-2 rounded-full text-sm font-semibold hover:bg-navy/90 transition"
            >
              Get started
            </a>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
