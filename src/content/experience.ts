export const experiences = [
  {
    company: "Outverse",
    period: "2021 to Now",
    role: "Lead Frontend Engineer",
    progression: "Mid → Senior → Lead Frontend Engineer",
    areas: "Frontend & Design direction",
    summary:
      "I lead the frontend of Outverse’s AI agent platform, taking work from problem framing and interaction design through implementation and production iteration. I design systems for intents, policies, tools and escalations, and make RAG context, sources and reasoning understandable. I also shape the shared frontend architecture, component library and engineering practices behind the platform and embedded customer widget.",
    technologies: [
      {
        label: "Core",
        items: [
          "React",
          "Svelte 4/5",
          "SvelteKit",
          "TypeScript",
          "Tailwind",
          "Vite",
        ],
      },
      {
        label: "Platform",
        items: ["WebSockets", "Embedded iframes"],
      },
      {
        label: "Quality",
        items: [
          "Playwright",
          "Vitest",
          "GitHub Actions",
          "Qodo AI",
          "Sentry",
          "PostHog",
          "Checkly",
          "Storybook",
          "Chromatic",
        ],
      },
    ],
    tone: "accent",
    featured: true,
  },
  {
    company: "Streaming Calculator",
    period: "Independent",
    role: "Owner · Product, design and engineering",
    progression: null,
    areas: "End-to-end ownership",
    summary:
      "I grew a single royalty calculator into a platform of more than 30 tools reaching approximately 20k views per month. I own product, design and engineering, as well as distribution and revenue: improving domain rating through technical SEO, roughly 800 backlinks and editorial collaborations; finding sponsors and affiliate partners; and building first-party analytics with placements that adapt to each tool.",
    technologies: [
      {
        label: "Core",
        items: ["SvelteKit", "TypeScript", "Tailwind"],
      },
      {
        label: "Platform",
        items: ["Cloudflare", "First-party analytics"],
      },
      {
        label: "Growth",
        items: ["Technical SEO", "Prerendering", "Dynamic sponsor slots"],
      },
    ],
    tone: "default",
    featured: false,
  },
  {
    company: "Treatwell",
    period: "2019 to 2021",
    role: "Frontend Software Engineer",
    progression: null,
    areas: "Greenfield delivery",
    summary:
      "Within a small cross-functional team, I owned frontend delivery for Lookbook from greenfield concept to a bookable discovery experience. I also shipped venue and review journeys across a mature multi-market product, covering localisation, testing and release.",
    technologies: [
      {
        label: "Core",
        items: ["React", "TypeScript"],
      },
      {
        label: "Delivery",
        items: ["GitLab", "Localisation"],
      },
      {
        label: "Quality",
        items: [
          "Cypress E2E + visual regression",
          "Jest",
          "Testing Library",
          "Grafana",
        ],
      },
    ],
    tone: "default",
    featured: false,
  },
] as const;
