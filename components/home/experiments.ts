export type ExperimentEntry = {
  number: string;
  title: string;
  description: string;
  metadata: string[];
  status: string;
  courseHref: string;
};

export const experimentEntries: ExperimentEntry[] = [
  {
    number: "01",
    title: "Neural Networks: Zero to Hero",
    description:
      "Learning implementations while working through Andrej Karpathy's \"Neural Networks: Zero to Hero.\"",
    metadata: ["Python", "Deep Learning", "From Scratch"],
    status: "In Progress · 4 Lectures",
    courseHref:
      "https://www.youtube.com/watch?v=VMj-3S1tku0&list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",
  },
];