import Nav from "@/components/Nav";
import AwardsView from "@/components/AwardsView";

export const metadata = {
  title: "Recognition & Awards | SGSITS MUN 2026",
  description:
    "Recognition at SGSITS MUN: Debate is about more than speaking. Explore Delegate Awards and what gets you noticed.",
};

export default function AwardsPage() {
  return (
    <>
      <Nav />
      <main>
        <AwardsView />
      </main>
    </>
  );
}
