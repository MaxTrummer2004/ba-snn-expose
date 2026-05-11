export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How does the free trial work?",
    a: "Every workspace starts on Pro for 14 days, no card required. You get the full feature set, unlimited projects, and real collaboration. When the trial ends you can downgrade, switch to Enterprise, or keep going on Pro.",
  },
  {
    q: "Can I bring my existing tools?",
    a: "Yes. Lumen connects to GitHub, GitLab, Slack, Linear, Jira, and Figma out of the box. Anything else, the public API and webhooks cover. Most teams are wired up in under an hour.",
  },
  {
    q: "What does pricing look like at scale?",
    a: "Pro stays at $29 per seat regardless of headcount. Enterprise pricing depends on your security model, support tier, and infrastructure footprint. We will quote a flat annual commitment, never a metered surprise.",
  },
  {
    q: "How is my data handled?",
    a: "Data is encrypted in transit and at rest, isolated per workspace, and stored in the region you pick at signup. Enterprise plans add SSO, SCIM, audit logs, custom DPAs, and SOC 2 Type II reports on request.",
  },
  {
    q: "Do you support self-hosting?",
    a: "Self-hosted deployments are available on Enterprise. You run Lumen inside your own VPC on AWS, GCP, or Azure, we handle upgrades through a managed control plane. Talk to sales for a reference architecture.",
  },
  {
    q: "What if I need to cancel?",
    a: "Cancel anytime from billing settings. You keep access through the end of the current period and can export every project, file, and asset as a single archive. No retention games.",
  },
];
