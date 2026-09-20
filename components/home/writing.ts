export type WritingEntry = {
  number: string;
  title: string;
  description: string;
  metadata: string[];
  status: string;
  href?: string;
  linkLabel: string;
};

export const writingEntries: WritingEntry[] = [
  {
    number: "01",
    title: "Building a Job Listings Scraper That Doesn't Fall Apart",
    description:
      "Lessons from building a Python job listings scraper with configurable output, CLI options, logging, retries, timeouts, fault tolerance, and testing.",
    metadata: ["Python", "Scraping", "CLI"],
    status: "Project Note",
    href: "https://github.com/shabi-2-2/job-listings-scraper",
    linkLabel: "View project",
  },
  {
    number: "02",
    title: "Building AI-Assisted Applications",
    description:
      "Notes from working across AI APIs, agentic workflows, RAG, and full-stack applications — focusing on what actually changes when AI becomes part of a working software system.",
    metadata: ["AI", "Agents", "Full-Stack"],
    status: "Engineering Note",
    linkLabel: "",
  },
  {
    number: "03",
    title: "Learning Neural Networks From Scratch",
    description:
      "Working through Andrej Karpathy's \"Neural Networks: Zero to Hero\" and implementing concepts while learning them from first principles.",
    metadata: ["Python", "Deep Learning", "From Scratch"],
    status: "In Progress · 4 Lectures",
    href: "https://www.youtube.com/watch?v=VMj-3S1tku0&list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",
    linkLabel: "View course",
  },
];