import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
import Evidence from "@/app/components/Evidence";
import Experience from "@/app/components/Experience";
import Hero from "@/app/components/Hero";
import Metrics from "@/app/components/Metrics";
import Projects from "@/app/components/Projects";
import Skills from "@/app/components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <Experience />
      <Projects />
      <Evidence />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
