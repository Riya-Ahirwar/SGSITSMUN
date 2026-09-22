import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import OurStory from "@/components/OurStory";

export const metadata = {
  title: "Our Story | SGSITS MUN 2026",
  description:
    "Why SGSITS MUN exists: A leading institution, a culture of questioning, and a platform where every perspective has a place at the table.",
};

export default function OurStoryPage() {
  return (
    <>
      <Nav />
      <main>
        <OurStory />
      </main>
      <Footer />
    </>
  );
}
