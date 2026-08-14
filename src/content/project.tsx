import bootstrapObservatory from "@/assets/projects/outverse/bootstrap-observatory.webp";
import conversationHistory from "@/assets/projects/outverse/conversation-history-safe.webp";
import conversationFiltersPoster from "@/assets/projects/outverse/conversation-filters-poster.jpg";
import escalationRules from "@/assets/projects/outverse/escalation-rules-v2.webp";
import intentTools from "@/assets/projects/outverse/intent-tools-v2.webp";
import sandboxPrototypePoster from "@/assets/projects/outverse/sandbox-prototype-poster.webp";
import voicePrototypePoster from "@/assets/projects/outverse/voice-prototype-poster.jpg";
import widgetAnswer from "@/assets/projects/outverse/widget-answer.png";
import widgetHome from "@/assets/projects/outverse/widget-home.png";
import widgetObservatory from "@/assets/projects/outverse/widget-observatory.webp";
import widgetThinking from "@/assets/projects/outverse/widget-thinking.png";
import blogGuides from "@/assets/projects/streaming-calculator/blog-guides.webp";
import distributorComparison from "@/assets/projects/streaming-calculator/distributor-comparison.webp";
import streamingCalculatorPreview from "@/assets/projects/streaming-calculator/preview.webp";
import treatwellPreview from "@/assets/projects/treatwell/preview.webp";
import venueBooking from "@/assets/projects/treatwell/venue-booking.webp";

export type Project = (typeof projects)[number];

export const projects = [
  {
    number: "01",
    name: "Outverse",
    shortName: "Outverse",
    category: "AI product · Frontend platform · Leadership",
    period: "2021 to Now",
    role: "Lead Frontend Engineer",
    href: "https://outverse.com",
    galleryLink: {
      href: "https://github.com/filpgc/Portfolio/blob/main/README.md",
      label: "Case study",
      hideOnMobile: true,
    },
    image: conversationHistory,
    imageAlt:
      "Outverse conversation workspace showing customer messages, policy execution and operational context",
    gallery: [
      {
        image: conversationHistory,
        aspectRatio: "3588 / 2114",
        title: "Conversation history",
        alt: "Outverse conversation workspace showing customer messages, policy execution and operational context",
        description:
          "A transcript alone cannot explain why an agent behaved as it did. Operators need to understand the customer exchange without losing the policy, escalation and operational context behind it. I designed the conversation workspace as a single readable history, progressively exposing execution detail while keeping the dialogue central.",
      },
      {
        image: intentTools,
        aspectRatio: "3588 / 2114",
        title: "Intent orchestration",
        alt: "Outverse intent editor with regional scope, a policy workflow and typed tool picker",
        description:
          "Raw prompts blur two different problems: deciding when an agent should act and defining what it can safely do next. That ambiguity makes complex workflows fragile and difficult to review. I separated trigger logic from policy, then made typed tools discoverable inside the authoring flow so capability and intent remain explicit.",
      },
      {
        image: escalationRules,
        aspectRatio: "3588 / 2114",
        title: "Escalation logic",
        alt: "Outverse escalation editor showing scenario triggers and precise multilingual matching criteria",
        description:
          "Human handoff fails at both extremes: vague rules escalate harmless conversations, while narrow rules miss urgent ones. The pain compounds across languages, markets and exceptions. I modelled escalation as explicit triggers, guardrails, matching criteria and exclusions, making behaviour readable, testable and safer to change.",
      },
      {
        image: conversationFiltersPoster,
        videoSrc: "https://media.filippopiggici.dev/videos/filters.mov",
        aspectRatio: "3588 / 2114",
        title: "Operational filtering",
        alt: "Outverse conversation workspace filtering a review queue by time, status, intent, escalation rule and review state",
        description:
          "Review queues quickly become unworkable when operators need to isolate a narrow class of conversations across status, intent, escalation and review state. Separate searches and fixed views obscure how those criteria combine. I designed a composable filter system that keeps every active constraint visible, supports multi-select values and updates conversation and question totals with the result set, making complex investigations easier to build and trust.",
      },
      {
        image: widgetAnswer,
        aspectRatio: "1.7",
        images: [
          {
            image: widgetHome,
            alt: "Branded Outverse iframe widget in its ready state",
          },
          {
            image: widgetThinking,
            alt: "Branded Outverse iframe widget showing a transparent working state",
          },
          {
            image: widgetAnswer,
            alt: "Branded Outverse iframe widget showing a sourced answer and feedback controls",
          },
        ],
        title: "Adaptive iframe widget",
        alt: "Branded Outverse iframe widget showing a customer question, sourced answer and feedback controls",
        description:
          "A small embedded widget still has to communicate a complex system: retrieval, policy, progress, sources and failure states, inside an unknown host page. Conventional chat patterns hide too much of that work. I designed a compact ready to working to answer journey that preserves trust signals while adapting its size, branding and accessible colours to each customer.",
      },
      {
        image: sandboxPrototypePoster,
        aspectRatio: "1.7",
        images: [
          {
            image: sandboxPrototypePoster,
            alt: "Dark Outverse sandbox prototype showing suggested customer support actions",
          },
          {
            image: voicePrototypePoster,
            alt: "Outverse voice prototype showing a connected audio conversation with an AI agent",
          },
        ],
        title: "Interaction prototypes",
        alt: "Outverse sandbox and voice interface prototypes shown side by side",
        description:
          "These prototypes explored two ways into the same agent experience. The sandbox used suggested tasks to reduce blank-canvas friction and make the agent’s capabilities immediately legible. The voice concept kept spoken input alongside the persistent text transcript, giving listening, speaking, interruption and mute states explicit treatment without sacrificing the clarity, history and scanability of text.",
      },
      {
        image: widgetObservatory,
        aspectRatio: "3588 / 2114",
        title: "Embedded diagnostics",
        alt: "Widget Observatory with state controls, live pipeline analytics and an event log",
        description:
          "Iframe failures were intermittent and crossed the boundary between host page, bootstrap script and widget, so normal browser debugging rarely captured the full cause. I built the Observatory to expose processing state and the postMessage sequence together, turning timing and pointer event bugs into repeatable scenarios instead of anecdotes.",
      },
      {
        image: bootstrapObservatory,
        aspectRatio: "3588 / 2114",
        title: "Integration testing",
        alt: "Widget Observatory testing an embedded Outverse widget inside a desktop host page",
        description:
          "An embed can work perfectly in isolation and still break inside a customer site because of viewport, theme, stacking or pointer behaviour. Reproducing every host environment was the missing layer. I created a controlled bootstrap harness around the production widget so those integration boundaries can be exercised before release.",
      },
    ],
    color: "#6674fa",
    textColor: "#f7f5ee",
    description:
      "Enterprise service AI operations, from intent and escalation configuration to reasoning observability, analytics and the embedded customer widget.",
    evidenceLabel: "Production use",
    evidence: "Supporting millions of interactions live in production.",
  },
  {
    number: "02",
    name: "Streaming Calculator",
    shortName: "Streaming",
    category: "Independent product · Design & engineering",
    period: "Owner",
    role: "Owner & builder",
    href: "https://streamingcalculator.com",
    galleryLink: {
      href: "https://streamingcalculator.com",
      label: "Website",
      hideOnMobile: false,
    },
    image: streamingCalculatorPreview,
    imageAlt:
      "Streaming Calculator showing multi-platform royalty estimates and combined earnings",
    gallery: [
      {
        image: streamingCalculatorPreview,
        aspectRatio: "3588 / 2114",
        title: "Royalties in one view",
        alt: "Streaming Calculator showing per-platform stream inputs and a combined royalty estimate",
        description:
          "Streaming income is split across platforms, rates, currencies and royalty shares. I brought those variables into one responsive calculator, so artists can compare each source and see a combined estimate without building a spreadsheet. The result is then grouped into a broad earnings range to surface a relevant next step.",
      },
      {
        image: distributorComparison,
        aspectRatio: "3588 / 2114",
        title: "Distribution, compared",
        alt: "Streaming Calculator distributor comparison with creator inputs and ranked distribution services",
        description:
          "Distributor pricing only makes sense in context. I built a comparison that uses release cadence, catalogue size, earnings and required features to rank services around each artist’s needs, replacing a static table with a more useful decision tool.",
      },
      {
        image: blogGuides,
        aspectRatio: "3588 / 2114",
        title: "Editorial discovery",
        alt: "Streaming Calculator Blog and Guides index with featured and categorised articles for independent artists",
        description:
          "More than 50 guides connect the platform’s 30+ dynamic tools into an SEO-driven content system. Clear categories, featured articles and related guidance help artists move from a single calculation to understanding royalties, rights, platforms and release decisions. Together, they attract more than 20k views each month and create relevant, clearly labelled placements for sponsors.",
      },
    ],
    color: "#5ce7c4",
    textColor: "#10261f",
    description:
      "Independent product work across dynamic creator tools, UX, SEO-driven editorial and contextual sponsorships, reaching over 20k views each month.",
    evidenceLabel: "Independent reach",
    evidence:
      "Over 20k monthly views across 30+ tools and 50+ guides, with ~800 backlinks.",
  },
  {
    number: "03",
    name: "Treatwell",
    shortName: "Treatwell",
    category: "Consumer marketplace · React product development",
    period: "2019 to 2021",
    role: "Frontend Software Engineer",
    href: "https://treatwell.com",
    galleryLink: null,
    image: venueBooking,
    imageAlt:
      "Treatwell venue page with salon imagery, reviews, availability and bookable services",
    gallery: [
      {
        image: venueBooking,
        aspectRatio: "1800 / 1060",
        title: "Confident booking",
        alt: "Treatwell venue page with salon imagery, reviews, availability and bookable services",
        description:
          "Choosing a salon requires trust, place, service detail, price, reviews and availability, but exposing everything at once creates noise. I worked across the venue and booking experience to organise those signals around the customer’s decision, progressively revealing detail while keeping the path to checkout clear.",
      },
      {
        image: treatwellPreview,
        title: "Bookable inspiration",
        alt: "Treatwell Lookbook with hair filters and a feed of bookable inspiration",
        description:
          "Beauty discovery happened through images, while booking started somewhere else with service names and venue lists. That disconnect turned inspiration into a dead end. Our small team built Lookbook from the ground up, linking real salon work and visual filters directly to bookable supply.",
      },
    ],
    color: "#ff5c39",
    textColor: "#171714",
    description:
      "Consumer marketplace work across product delivery, responsive systems, localisation and frontend quality.",
    evidenceLabel: "Product scope",
    evidence: "Greenfield Lookbook across discovery, reviews and booking.",
  },
] as const;
