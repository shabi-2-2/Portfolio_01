export type OpenSourceEntry = {
  number: string;
  name: string;
  description: string;
  metadata: string[];
  github: string;
};

export const openSourceEntries: OpenSourceEntry[] = [
  {
    number: "01",
    name: "HealthConnect",
    description:
      "A full-stack healthcare discovery platform localized for the Indian market, built with Next.js, Supabase, and Resend. The successor to my first hackathon project, JeevanDost.",
    metadata: ["Next.js", "Full-stack", "Hackathon"],
    github: "https://github.com/shabi-2-2/HealthConnect-JeevanDost-But-Better-",
  },
  {
    number: "02",
    name: "Rapid Crisis Response System",
    description:
      "An IoT-ready, agentic AI emergency response system for hotels and resorts — incident reporting, real-time staff coordination, and Gemini-powered admin insights built on Firebase.",
    metadata: ["Next.js", "Firebase", "AI"],
    github: "https://github.com/shabi-2-2/SolutionsChallenge_RapidAssistanceSystem",
  },
];