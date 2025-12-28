export type ProjectTag =
  | 'Angular'
  | 'TypeScript'
  | 'RxJS'
  | 'Material'
  | 'NestJS'
  | 'Node'
  | 'PostgreSQL'
  | 'Docker'
  | 'Testing'
  | 'CI/CD';

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  description: string;
  tags: ProjectTag[];
  highlights: string[];
  links?: ProjectLink[];
};
