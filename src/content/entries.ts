/**
 * Everything on the site is an entry. To add something new, add an object
 * here. Pages pick the kinds they show (the home timeline shows "work").
 *
 * `kind` grows over time: "project", "note", "experiment", ...
 */
export type Entry = {
  kind: "work" | "project" | "note" | "experiment";
  title: string;
  detail?: string;
  /** One or two sentences on what you did there. */
  description?: string;
  /** First year, and last year if it spans more than one. */
  from: number;
  /** Month started (1–12). Optional; shown on project cards as "Mar 2025". */
  month?: number;
  to?: number;
  place?: string;
  remote?: boolean;
  href?: string;
  /** Projects only: source code link, shown as a "GitHub" link on the card. */
  github?: string;
  /** Projects only: where the project stands today. */
  status?: ProjectStatus;
};

export type ProjectStatus = "live" | "development" | "unmaintained";

export const entries: Entry[] = [
  {
    kind: "project",
    title: "dkv - Distributed Key-Value Cache",
    from: 2026,
    month: 10,
    status: "development",
    github: "https://github.com/saadahmsiddiqui/dkv",
    description:
      "A distributed key-value cache written in Rust. I started it to learn systems programming and Rust development.",
  },
  {
    kind: "project",
    title: "You can just pay me",
    from: 2026,
    month: 9,
    status: "development",
    href: "https://youcanjustpayme.com",
    github: "",
    description:
      "A simple, privacy-focused payment page for freelancers and creators. I built it to learn Next.js, TypeScript, and Supabase.",
  },
  {
    kind: "project",
    title: "basic-exchange",
    from: 2025,
    month: 5,
    status: "unmaintained",
    github: "https://github.com/saadahmsiddiqui/basic-exchange",
    description:
      "An order matching engine implementation in RUST. It was created as a take home assignment for a job application. It was a fun project to learn RUST and how order matching engines work.",
  },
  // {
  //   kind: "project",
  //   title: "Project name",
  //   from: 2025,
  //   month: 3,
  //   status: "live", // "live" | "development" | "unmaintained"
  //   href: "https://example.com", // live site, links the title
  //   repo: "https://github.com/you/project",
  //   description: "What it is and why you built it.",
  // },
  {
    kind: "work",
    title: "Geode Labs",
    detail: "Senior Software Engineer",
    from: 2026,
    place: "Denver, Colorado, USA",
    remote: true, 
    description: "At Geode Labs, I drove both technical performance and business growth for the Opportunity Board platform. Using Next.js, TypeScript, Supabase, and OpenAI APIs, I built automated AI workflows while executing a full UI/UX redesign to refine the product's core focus. Additionally, I introduced new revenue streams by engineering monetization features, including an automated Telegram bot and a paid opportunity advertising system.",
  },
  {
    kind: "work",
    title: "XScanner.org",
    detail: "Senior software engineer",
    from: 2025,
    to: 2026,
    place: "Zug, Switzerland",
    remote: true,
    description: "I designed and built a multi-chain data indexing platform for cross-chain liquidity networks including THORChain, Maya Protocol, and ChainFlip. I engineered a scalable microservices architecture to process raw cross-chain data, while building high-performance backend APIs that seamlessly fed indexed data to a responsive Next.js web application.",
  },
  {
    kind: "work",
    title: "Chainsafe Systems",
    detail: "Senior software engineer",
    from: 2024,
    to: 2025,
    place: "Berlin, Germany",
    remote: true,
    description:
      "At ChainSafe, I focused on core blockchain infrastructure by developing the TypeScript SDK for ChainBridge, the company's flagship cross-chain protocol. My work enabled seamless interaction with EVM-compatible networks, directly supporting the secure transfer of high-value digital assets across disparate chains.",
  },
  {
    kind: "work",
    title: "Antematter",
    detail: "Full stack developer",
    from: 2023,
    to: 2024,
    place: "Islamabad, Pakistan",
    remote: true,
    description:
      "At Antematter, I specialized in multi-chain backend infrastructure and data indexing across EVM networks. I designed and deployed high-performance GraphQL microservices using TypeScript and Java to transform raw blockchain data into responsive application logic, while contributing full-stack features with React to deliver intuitive data-driven interfaces.",
  },
  {
    kind: "work",
    title: "Glitter Finance",
    detail: "Senior software engineer",
    from: 2022,
    to: 2023,
    place: "Harjumaa, Estonia",
    remote: true,
    description:
      "At Glitter Finance, I worked across the full stack of cross-chain DeFi infrastructure. I authored EVM smart contracts in Solidity for networks like Ethereum and Arbitrum to power their bridge protocol. Alongside contract development, I maintained the TypeScript SDK and built key web application features using Next.js, seamlessly connecting multi-chain smart contract functionality with high-performance Web3 frontends.",
  },
  // {
  //   kind: "work",
  //   title: "Composable Labs",
  //   detail: "Full stack developer",
  //   from: 2021,
  //   to: 2022,
  //   place: "Cyprus",
  //   remote: true,
  //   description: "",
  // },
  // {
  //   kind: "work",
  //   title: "Seed Labs",
  //   detail: "Software engineer",
  //   from: 2020,
  //   to: 2021,
  //   place: "Karachi, Pakistan",
  //   description: "",
  // },
  // {
  //   kind: "work",
  //   title: "SBT Japan",
  //   detail: "Software engineer",
  //   from: 2020,
  //   place: "Karachi, Pakistan",
  //   description: "",
  // },
  // {
  //   kind: "work",
  //   title: "Sofy.ai",
  //   detail: "Software engineer",
  //   from: 2019,
  //   to: 2020,
  //   place: "Karachi, Pakistan",
  //   description: "",
  // },
  // {
  //   kind: "work",
  //   title: "GFK Etilize",
  //   detail: "Software intern",
  //   from: 2018,
  //   place: "Karachi, Pakistan",
  //   description: "",
  // },
];

export function sortedEntries(): Entry[] {
  return [...entries].sort(
    (a, b) => (b.to ?? b.from) - (a.to ?? a.from) || b.from - a.from,
  );
}

export function entriesOfKind(kind: Entry["kind"]): Entry[] {
  return sortedEntries().filter((entry) => entry.kind === kind);
}

export function formatYears({ from, to }: Entry): string {
  if (!to || to === from) return String(from);
  return `${from}–${String(to).slice(-2)}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatStarted({ from, month }: Entry): string {
  return month ? `${MONTHS[month - 1]} ${from}` : String(from);
}
