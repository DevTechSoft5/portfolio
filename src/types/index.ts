export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  technologies: string[];
  deliverables: string[];
  useCases: string[];
  keyBenefits: string[];
  demoSlug: string;
  projectSlug: string;
  architectureHighlight: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  serviceId: string;
  serviceName: string;
  badge: string;
  demoRoute: string;
  summary: string;
  businessProblem: string;
  proposedSolution: string;
  externalUrl?: string;
  isLiveProduct?: boolean;
  ctaLabel?: string;
  features: {
    title: string;
    description: string;
  }[];
  techStack: {
    category: string;
    items: string[];
  }[];
  architecture: {
    overview: string;
    layers: {
      name: string;
      description: string;
      tech: string[];
    }[];
  };
  keyWorkflows: {
    name: string;
    steps: string[];
  }[];
  implementationDetails: string[];
  productionIntegrationNotes: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  category: string;
  budget: string;
  description: string;
  preferredContact: 'email' | 'phone' | 'video';
  createdAt: string;
}
