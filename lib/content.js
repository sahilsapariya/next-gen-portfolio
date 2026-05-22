/* All portfolio content lives here. Sections import what they need.
   Keep this file content-only — no React, no JSX, no imports. */

import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export const SOCIALS = [
  {
    idx: "01",
    label: "GitHub",
    href: "https://github.com/sahilsapariya",
    Icon: Github,
  },
  {
    idx: "02",
    label: "LinkedIn",
    href: "https://linkedin.com/in/sahilsapariya",
    Icon: Linkedin,
  },
  {
    idx: "03",
    label: "Twitter",
    href: "https://twitter.com/sahil_sapariya",
    Icon: Twitter,
  },
  {
    idx: "04",
    label: "Instagram",
    href: "https://instagram.com/_sahil_sapariya_03",
    Icon: Instagram,
  },
];

export const NAV_LINKS = [
  { href: "#work", label: "Work", id: "work" },
  { href: "#systems", label: "Systems", id: "systems" },
  { href: "#notes", label: "Notes", id: "notes" },
  { href: "#lab", label: "Lab", id: "lab" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export const FOCUS = [
  {
    status: "active",
    title: "School ERP platform",
    desc: "Frontend architecture and several backend modules.",
  },
  {
    status: "active",
    title: "Inventory management system",
    desc: "Practical workflows and reliable execution.",
  },
  {
    status: "exploring",
    title: "AI-assisted engineering workflows",
    desc: "Pipelines, automation, iteration loops.",
  },
  {
    status: "shipping",
    title: "Production SaaS systems",
    desc: "Release cadence and deployment discipline.",
  },
  {
    status: "curious",
    title: "Low-level + high-performance systems",
    desc: "Systems thinking and execution depth.",
  },
];

export const PROJECTS = [
  {
    n: "01",
    title: "Nexchool",
    year: "2025",
    status: "Active · SaaS",
    context:
      "A school management SaaS platform built for real institutions — academics, attendance, timetable, dashboards, and operational workflows. Co-owned with a friend; shipping iteratively.",
    role: "I own the frontend architecture and several backend modules, working closely on product decisions and implementation flow.",
    decision:
      "Designing the academic backbone in a future-proof way instead of taking shortcuts that would have made timetable, attendance, and subject management harder later.",
    stakes:
      "Schools don't get to be down. Academic cycles are calendar-driven. A subtle data-model decision in week two echoes for years.",
    scope: ["Co-owner", "Frontend architecture", "Several backend modules", "Product decisions"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "REST", "Auth"],
    preview: {
      url: "https://nexchool.in",
      title: "Nexchool",
      tagline: "School management, built for the institutions that actually run schools.",
      label: "LIVE MARKETING SITE",
    },
    links: { live: "https://nexchool.in" },
  },
  {
    n: "02",
    title: "College360",
    year: "2024",
    status: "Shipped · Award",
    context:
      "A 3D virtual campus experience built during DUHACKS 2.0 to help students explore Dharmsinh Desai University remotely.",
    role: "I was the team lead — product direction, frontend implementation, and overall execution.",
    decision:
      "Aggressively limiting scope so the demo felt polished and complete instead of trying to simulate an entire university ecosystem.",
    stakes:
      "Forty-eight hours. Three people. A judging panel. Scope wasn't a planning exercise — it was the only variable we could actually control.",
    scope: ["Team lead", "Frontend", "3D scene", "Product direction"],
    stack: ["Three.js", "Panolens.js", "HTML", "CSS"],
    award: "Best Open Innovation — DUHACKS 2.0",
    preview: {
      url: "https://college360.netlify.app",
      image: "/college360.png",
      title: "College360",
      label: "LIVE PROJECT",
    },
    links: {
      repo: "https://github.com/sahilsapariya/college360",
      live: "https://college360.netlify.app",
    },
  },
  {
    n: "03",
    title: "Retail-OS",
    year: "2025",
    status: "Active · SaaS",
    context:
      "A retail SaaS platform that runs the whole shop — parties (customers/suppliers), products, purchases, inventory, POS sales, returns, with accounting and analytics on the roadmap. Inventory is one module inside it; retail is the actual domain.",
    role: "I handle the product architecture, frontend system design, and backend workflow implementation.",
    decision:
      "Prioritizing operational simplicity and maintainability over adding unnecessary complexity too early — a small retailer's reality is messier than the abstractions you'd reach for first.",
    stakes:
      "Retail data is operational data. A confusing UI doesn't slow people down — it produces wrong numbers. Reliability beats novelty here.",
    scope: ["Product architecture", "Frontend", "Backend workflows", "UX"],
    stack: ["Next.js", "PostgreSQL", "Prisma", "REST"],
    links: null,
  },
  {
    n: "04",
    title: "AI Workflow Experiments",
    year: "Ongoing",
    status: "Exploring · Solo",
    context:
      "A collection of internal experiments around AI-assisted engineering workflows, implementation pipelines, and developer automation systems.",
    role: "Solo — exploring how AI can improve execution speed and iteration quality without replacing engineering judgment.",
    decision:
      "Designing workflows that remain reliable and practical instead of becoming over-automated gimmicks.",
    stakes:
      "Trust is the bottleneck, not throughput. A pipeline that's slightly wrong fifty percent of the time saves nothing — engineering judgment stays the bar.",
    scope: ["Workflow design", "Critique loops", "Patch + test", "Diff review"],
    stack: ["OpenAI API", "LangChain", "Python", "Node"],
    links: null,
  },
];

export const JOURNEY = [
  {
    year: "2017",
    body: "A small town. Curiosity. Internet mostly through mobile devices, and early interest in technology before I had words for it.",
  },
  {
    year: "2021",
    body: "JEE preparation in a metro hostel after years of native-language schooling. The transition exposed me to intense competition and reshaped how I think about discipline, pressure, and ambition.",
  },
  {
    year: "2022",
    body: "Entered DDU for Information Technology. Started programming seriously and got deeply pulled into software engineering and product building.",
  },
  {
    year: "2023",
    body: "First real-world projects and collaborative development. Early exposure to production thinking and implementation discipline.",
  },
  {
    year: "2024",
    body: "Frontend-heavy product development. Sharper sense of UI systems, implementation quality, and engineering workflows.",
  },
  {
    year: "2024",
    body: "DUHACKS 2.0 — won Best Open Innovation with College360 while leading the team.",
    highlight: true,
  },
  {
    year: "2025",
    body: "Working on complete product systems — frontend architecture, backend workflows, deployment flow, and product execution.",
  },
  {
    year: "Today",
    body: "Building School ERP, exploring AI-assisted engineering workflows, and getting more interested in systems thinking, execution quality, and low-level engineering concepts.",
    active: true,
  },
];

/* Lab — real repositories + internal experiments.
   `touched` is a Date.UTC() timestamp; rendered relative via useRelativeTime. */
export const LAB = [
  {
    title: "CShell",
    body: "A small Unix shell built in C. Process control, pipes, syscalls — low-level exploration to learn how the layer beneath the language actually works.",
    status: "exploring",
    tech: "C",
    touched: Date.UTC(2026, 2, 5),
    repo: "https://github.com/sahilsapariya/CShell",
  },
  {
    title: "8086 Assembly Notes",
    body: "Assembly experiments from undergrad. Low-level programming on the 8086 — register conventions, addressing modes, the metal underneath higher-level abstractions.",
    status: "shelved",
    tech: "Assembly",
    touched: Date.UTC(2023, 3, 6),
    repo: "https://github.com/sahilsapariya/8086-Programming",
  },
  {
    title: "AI Engineering Pipeline",
    body: "Structured AI-assisted implementation workflows. Prompt → critique → patch → test loops for my own development cadence.",
    status: "exploring",
    tech: "Python · TypeScript",
    touched: Date.UTC(2026, 4, 22),
    repo: null,
  },
  {
    title: "Portfolio Monograph",
    body: "This site — a cinematic editorial engineering portfolio. Built in public.",
    status: "in use",
    tech: "Next.js · framer-motion",
    touched: Date.UTC(2026, 4, 22),
    repo: "https://github.com/sahilsapariya/next-gen-portfolio",
  },
  {
    title: "Account-Verse",
    body: "My own take on Authorizer.dev — user management primitives, auth flows, role boundaries. Mostly a learning exercise; the original is the better tool, but rebuilding it taught me where the hard parts actually are.",
    status: "shelved",
    tech: "Go",
    touched: Date.UTC(2025, 9, 9),
    repo: "https://github.com/sahilsapariya/Account-Verse",
  },
];

/* Field Notes — production lessons. Real engineering work, abstracted to
   protect client/internal details. Notes, not resume bullets. */
export const NOTES = [
  {
    n: "01",
    tag: "ACCESSIBILITY",
    title: "On building for users who don't see the page.",
    body: "Worked on an education product where some users were visually impaired. Keyboard navigation, focus rings, screen-reader landmarks, semantic structure — features that should have been there from day one became retrofits. The lesson stayed: accessibility isn't a feature, it's a debugging discipline.",
    pills: ["WCAG 2.1", "ARIA", "Keyboard nav", "Screen readers"],
  },
  {
    n: "02",
    tag: "INTEGRATION",
    title: "On integrating against real APIs.",
    body: "Building a Zoom integration inside an internal product. Users could connect their Zoom account, authorize access, browse the recordings of meetings that had happened in the product, pick the ones they wanted, and import those recordings back in. The documentation example fit on one screen — making it survive timezones, token refresh, large recording lists, and partial import failures took weeks. Real integrations are five percent protocol and ninety-five percent edge cases.",
    pills: ["Zoom API", "OAuth", "Recordings", "Import flow"],
  },
  {
    n: "03",
    tag: "CERTIFICATION",
    title: "On engineering for compliance.",
    body: "Helping a client product clear a certification audit meant writing not just the code but the trail it leaves — audit logs, role boundaries, data handling, retention policy. Engineering is the part everyone sees. The certification is the part nobody does.",
    pills: ["Audit logs", "RBAC", "Data handling", "Documentation"],
  },
  {
    n: "04",
    tag: "PRODUCTION",
    title: "On debugging things you didn't build.",
    body: "A deployment that should have been routine wasn't. Half the diagnosis was reading other engineers' notes from eighteen months ago. The other half was learning the system from the way it failed. Production teaches faster than docs — but only if you write the docs as you go.",
    pills: ["Postmortem", "Logging", "Tracing", "Onboarding"],
  },
  {
    n: "05",
    tag: "FRONTEND",
    title: "On the boring half of frontend.",
    body: "Most of the work on a real product isn't shipping the flashy components. It's making sure the existing ones don't break when the content is in Hindi instead of English, when the browser is Safari, when the network is 3G, or when the device hasn't been updated since 2019. The boring half is most of it.",
    pills: ["I18n", "Cross-browser", "Performance", "Edge cases"],
  },
];

export const PHILOSOPHY = [
  "Ship the smallest version that proves it.",
  "Architecture is a series of small honest choices.",
  "Most engineering taste is restraint.",
  "Read code more than you write code.",
  "The best tool is the one you finish.",
];
