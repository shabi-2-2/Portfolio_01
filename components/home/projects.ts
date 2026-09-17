export type Project = {
  number: string;
  title: string;
  description?: string;
  metadata: string[];
  year?: string;
  href?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    number: "02",
    title: "BrainWorks",
    metadata: ["AI", "Hardware", "Systems"],
    year: "2026",
  },
  {
    number: "03",
    title: "Job Listing Scraper",
    metadata: ["Python", "Scraping", "CLI"],
    year: "2026",
  },
  {
    number: "04",
    title: "Server Stats",
    metadata: ["Bash", "Linux", "DevOps"],
    year: "2026",
  },
];