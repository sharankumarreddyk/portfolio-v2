import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudies";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { fetchGitHubData } from "@/lib/github";

export const revalidate = 3600;

export default async function Page() {
  const github = await fetchGitHubData();

  return (
    <>
      <Nav />
      <main id="top">
        <Hero github={github} />
        <CaseStudies />
        <Projects />
        <Skills />
        <Experience />
        <About github={github} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
