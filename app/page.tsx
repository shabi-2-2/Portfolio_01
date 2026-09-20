import { Hero } from "@/components/home/hero";
import { OpenSourceSection } from "@/components/home/open-source-section";
import { WorkSection } from "@/components/home/work-section";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <OpenSourceSection />
      </main>
    </>
  );
}