import { Hero } from "@/components/home/hero";
import { WorkSection } from "@/components/home/work-section";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
      </main>
    </>
  );
}