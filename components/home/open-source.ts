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
      "A web interface prototype for an IoT-oriented emergency response concept, exploring incident reporting, staff coordination, and AI-assisted administrative insights.",
    metadata: ["Next.js", "Firebase", "AI"],
    github: "https://github.com/shabi-2-2/SolutionsChallenge_RapidAssistanceSystem",
  },
];