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
    description:
      "A proposal for safe operation of open-cast mine vehicles in fog and low visibility — V2X mesh networking, LoRa peer-to-peer links, 24 GHz mmWave radar, and dual-tier sensor fusion. Idea submission; no physical prototype built.",
    metadata: ["AI", "Hardware", "Systems"],
    year: "2026",
  },
  {
    number: "03",
    title: "Job Listing Scraper",
    description:
      "A roadmap.sh project: a Python CLI that scrapes and parses job listings, with deduplication, filtering, JSON export, retry and timeout handling, and verbose and quiet output modes.",
    metadata: ["Python", "Scraping", "CLI"],
    year: "2026",
    github: "https://github.com/shabi-2-2/job-listings-scraper",
  },
  {
    number: "04",
    title: "Server Stats",
    description:
      "A roadmap.sh project: a Bash script reporting Linux server CPU and memory statistics, with defensive parsing and validation for invalid totals and missing fields.",
    metadata: ["Bash", "Linux", "DevOps"],
    year: "2026",
    github: "https://github.com/shabi-2-2/Server-stats-script",
  },
];