import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Video from "@/components/Video";
import Methodology from "@/components/Methodology";
import Projects from "@/components/Projects";
import Story from "@/components/Story";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Video />
        <Methodology />
        <Projects />
        <Story />
        <Contact />
      </main>
      <Footer />
      <ScrollAnimations />
    </>
  );
}
