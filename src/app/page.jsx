import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ThemePillars from "@/components/ThemePillars";
import Committees from "@/components/Committees";
import Secretariat from "@/components/Secretariat";
import WaysIn from "@/components/WaysIn";
import Footer from "@/components/Footer";
import GlobalAnimations from "@/components/GlobalAnimations";

export default function Home() {
  return (
    <>
      <GlobalAnimations />
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
