import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { OpenSourceSection } from "@/components/home/open-source-section";
import { WorkSection } from "@/components/home/work-section";
import { WritingSection } from "@/components/home/writing-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <OpenSourceSection />
        <AboutSection />
        <WritingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}