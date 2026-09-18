import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ThemePillars from "@/components/ThemePillars";
import Committees from "@/components/Committees";
import Secretariat from "@/components/Secretariat";
import WaysIn from "@/components/WaysIn";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ThemePillars />
      <Committees />
      <Secretariat />
      <WaysIn />
      <Footer />
    </>
  );
}
