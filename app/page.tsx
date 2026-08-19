import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
import Experience from "@/app/components/Experience";
import Hero from "@/app/components/Hero";
import Skills from "@/app/components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
