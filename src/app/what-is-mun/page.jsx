import Nav from "@/components/Nav";
import WhatIsMun from "@/components/WhatIsMun";

export const metadata = {
  title: "What is MUN? | SGSITS MUN 2026",
  description:
    "More than a conference. A room where ideas matter. Never attended an MUN before? Start here. Everything you need to know about Model United Nations at SGSITS.",
};

export default function WhatIsMunPage() {
  return (
    <>
      <Nav />
      <main>
        <WhatIsMun />
      </main>
    </>
  );
}
