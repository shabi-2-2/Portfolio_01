import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { OpenSourceSection } from "@/components/home/open-source-section";
import { WorkSection } from "@/components/home/work-section";
import { WritingSection } from "@/components/home/writing-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Shabi Haidar Rizvi",
      url: "https://shabi01.vercel.app/",
      inLanguage: "en",
    },
    {
      "@type": "Person",
      name: "Shabi Haidar Rizvi",
      url: "https://shabi01.vercel.app/",
      email: "mailto:zhrizvi476@gmail.com",
      description:
        "Shabi Haidar Rizvi's portfolio — building across AI, full-stack applications, developer tools, and infrastructure.",
      sameAs: [
        "https://www.linkedin.com/in/shabi-haidar-rizvi-bab637385/",
        "https://github.com/shabi-2-2",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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