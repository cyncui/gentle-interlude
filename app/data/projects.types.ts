export type ProjectImage = {
  src?: string;
  alt: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  services: string;
  images: ProjectImage[];
};
