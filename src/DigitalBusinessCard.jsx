import React, { useEffect, useState } from "react";
import "./digital-business-card.css";

const EMAIL = "contact@josebbk.com";

const Icon = ({ children, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`h-5 w-5 flex-none ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const BrandIcon = ({ path, label }) => (
  <svg viewBox="0 0 24 24" aria-hidden={label ? undefined : true} className="h-5 w-5" fill="currentColor">
    <path d={path} />
  </svg>
);

const icons = {
  check: (
    <Icon className="text-emerald-300">
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  ),
  chevron: (
    <Icon className="h-4 w-4">
      <path d="m6 9 6 6 6-6" />
    </Icon>
  ),
  arrowLeft: (
    <Icon className="h-4 w-4">
      <path d="M15 6 9 12l6 6" />
    </Icon>
  ),
  arrowRight: (
    <Icon className="h-4 w-4">
      <path d="M9 6l6 6-6 6" />
    </Icon>
  ),
};

const brandPaths = {
  telegram:
    "M9.78 15.37 9.4 20.7c.55 0 .79-.24 1.08-.52l2.59-2.48 5.37 3.93c.98.54 1.67.26 1.94-.91l3.51-16.46h.01c.31-1.45-.53-2.02-1.48-1.67L1.8 10.48c-1.4.55-1.38 1.34-.24 1.69l5.27 1.64L19.07 6.14c.58-.35 1.1-.16.67.22",
  whatsapp:
    "M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.49 0 .15 5.34.15 11.91c0 2.1.55 4.15 1.6 5.95L.05 24l6.3-1.65a11.9 11.9 0 0 0 5.72 1.46h.01C18.65 23.81 24 18.47 24 11.9a11.84 11.84 0 0 0-3.48-8.42ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.87 9.87 0 1 1 8.4 4.62Zm5.42-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.11.57-.08 1.75-.71 2-1.4.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z",
  github:
    "M12 .3A12 12 0 0 0 8.2 23.7c.6.1.82-.26.82-.58v-2.24c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .3Z",
  linkedin:
    "M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.53V9H7.1v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 5.77.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.12 1.39A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.39 2.12.66.67 1.33 1.08 2.12 1.39.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.39 5.86 5.86 0 0 0 1.39-2.12c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.39-2.12A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  email:
    "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.4 4.25-7.07 5.3a.88.88 0 0 1-1.06 0L4.4 8.25V6.8l7.6 5.7 7.6-5.7v1.45Z",
};

// HERO ROLES: Add or remove strings in this array to change the typing loop.
// Each one is shown after the static "I'm a " prefix, e.g. "I'm a Full-Stack Developer".
const heroRoles = [
  "Full-Stack Developer",
  "Geomatics Engineer",
  "AI-Augmented Builder",
  "Fun guy to have around :)",
];

// HERO METADATA: Consolidated from the old "Tertiary Utils" boxes. Each entry renders
// as one compact emoji + label pill beneath the typing text. Add/remove/reorder freely —
// the row wraps automatically at every breakpoint.
const heroMetadata = [
  { emoji: "📍", label: "Tehran" },
  { emoji: "🕒", label: "IRST" },
  { emoji: "💻", label: "Software Engineer" },
  { emoji: "😊", label: "Good Boy" },
  { emoji: "🎓", label: "University of Tehran" },
  { emoji: "🌐", label: "English, Farsi, Turkmen, German, Japanese" },
];

// TECH STACK MATRIX: Add a new object to show another skill pill, or remove one to drop it —
// the flex-wrap row reflows automatically. `color` drives the hover glow on both the pill and
// the card border/shadow; `docs` is the URL opened in a new tab when the pill is clicked.
const techStack = [
  { name: "React", color: "#61DAFB", docs: "https://react.dev" },
  { name: "Vite", color: "#B73CE4", docs: "https://vitejs.dev" },
  { name: "Tailwind CSS", color: "#38B2AC", docs: "https://tailwindcss.com/docs" },
  { name: "Python", color: "#FFD43B", docs: "https://docs.python.org/3/" },
  { name: "Pandas", color: "#E70488", docs: "https://pandas.pydata.org/docs/" },
  { name: "AutoCAD", color: "#E52920", docs: "https://www.autodesk.com/support/technical/product/autocad" },
  { name: "Civil 3D", color: "#1E88E5", docs: "https://www.autodesk.com/support/technical/product/civil3d" },
  { name: "ArcGIS", color: "#32A852", docs: "https://developers.arcgis.com/documentation/" },
];

// PROJECT SPOTLIGHT: Add projects by appending objects with title, summary, href, and image.
// `image` is a local screenshot path used as a low-opacity background layer — swap in your own.
// If you remove projects, the carousel timing, dots, and edge arrows update automatically.
const projects = [
  {
    title: "Route Curve Design Project",
    summary: "Precision-focused road geometry, alignment logic, and engineering-grade deliverables.",
    href: "https://github.com/josebbk/geometric-route-curve-design-project",
    image: "/curve_img.png",
  },
  {
    title: "Amsterdam Funda Home-Search Agent",
    summary: "A real estate scraping AI Agent for the Amsterdam housing market.",
    href: "https://github.com/josebbk/nl-housing-agent",
    image: "/funda_img.png",
  },
  {
    title: "Telegram Bot Username Sales",
    summary: "A monorepo containing the Telegram Bot and Web Management System for the Telegram Username Sales platform.",
    href: "https://github.com/arashid02-n/telegram-bot-username-sales",
    image: "/telegramusernamesales_img.png",
  },
  {
    title: "Space Invaders Game",
    summary: "A polished arcade build with responsive controls, scoring, and replay-friendly pacing.",
    href: "https://github.com/josebbk/Space-Invaders-PyGame",
    image: "/game_img.png",
  },
  {
    title: "Ecommerce App",
    summary: "Modern storefront patterns, product flows, and conversion-minded interface structure.",
    href: "https://github.com/josebbk/my-ecommerce",
    image: "/ecommerce_img.png",
  },
];

// WORKFLOW ACCORDION: Edit labels/descriptions here to change the dropdown sections.
// Items lay out two-per-row (single column on very small screens) to use the wider 2x1 card.
// Only one item is ever open; the list itself is height-capped with internal scroll so an
// expanded item never overflows the card.
const workflowItems = [
  {
    title: "Goals & Objectives",
    description: "'Every great system starts with a precise blueprint. I focus on breaking down the core problem, defining strict architectural constraints, and mapping out a logical roadmap. It is about aligning technical capabilities with real-world utility before a single line of code is written.'",
  },
  {
    title: "Research",
    description: "'I don't just gather data; I synthesize it. Whether I am analyzing complex spatial requirements or evaluating the absolute best tech stack for a new project, I ensure every technical decision is backed by solid logic. This phase is about finding the smartest, most efficient path forward.'",
  },
  {
    title: "Development & Execution",
    description: "'This is where my 'dive in headfirst' philosophy takes over. I build rapidly using AI-augmented workflows, transforming heavy technical challenges into clean, functional code. It is all about high-speed iteration, writing robust logic, and turning complex theory into a working reality.'",
  },
  {
    title: "Final Design & Deployment",
    description: "'A project isn't finished until it is live, beautifully styled, and bulletproof. I focus on seamless integrations, smart infrastructure optimizations, and delivering a polished, high-performance final product that simply works.'",
  },
];

// CONTACT MATRIX: Update href, titleLabel, tint, and ring values to match your profiles/brand
// colors. `tint`/`ring` are hex + alpha (e.g. "#2AABEE26") applied via inline style, since
// Tailwind can't statically generate classes built from a dynamic JS variable. Instagram uses
// `gradient: true` and renders its official 3-stop gradient instead of a flat tint.
// Telegram/WhatsApp/Instagram avatars must be local files — those platforms block hotlinking.
const socials = [
  {
    label: "Telegram",
    titleLabel: "Telegram Me",
    icon: brandPaths.telegram,
    href: "https://t.me/josebbk",
    tint: "#2AABEE26",
    ring: "#2AABEE99",
    avatar: "/telegram_img.jpg",
  },
  {
    label: "WhatsApp",
    titleLabel: "WhatsApp Me",
    icon: brandPaths.whatsapp,
    href: "https://wa.me/989211210031",
    tint: "#25D36626",
    ring: "#25D36699",
    avatar: "/whatsapp_img.png",
  },
  {
    label: "GitHub",
    titleLabel: "GitHub",
    icon: brandPaths.github,
    href: "https://github.com/josebbk",
    tint: "#ffffff14",
    ring: "#ffffff73",
    avatar: "https://github.com/josebbk.png",
  },
  {
    label: "LinkedIn",
    titleLabel: "Linkedin",
    icon: brandPaths.linkedin,
    href: "https://www.linkedin.com/",
    tint: "#0A66C226",
    ring: "#0A66C299",
    statusBadge: "Currently Unavailable",
  },
  {
    label: "Instagram",
    titleLabel: "Instagram",
    icon: brandPaths.instagram,
    href: "https://www.instagram.com/josebbk",
    gradient: true,
    ring: "#DD2A7B99",
    avatar: "/instagram_img.jpg",
  },
];

function useTypingLoop(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const atFullWord = letterCount === currentWord.length;
    const atEmptyWord = letterCount === 0;
    const delay = atFullWord && !isDeleting ? 1100 : isDeleting ? 36 : 58;

    const timeoutId = window.setTimeout(() => {
      if (atFullWord && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (atEmptyWord && isDeleting) {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }

      setLetterCount((count) => count + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, letterCount, wordIndex, words]);

  return words[wordIndex].slice(0, letterCount);
}

// BentoCard accepts an optional `style` prop so individual sections (e.g. Tech Stack) can push
// a `--card-accent` CSS variable to recolor the border/shadow on hover. When no override is
// passed, the CSS var falls back to the original cyan glow, so every other card is unaffected.
function BentoCard({ children, className = "", style, as: Component = "section", ...props }) {
  return (
    <Component
      style={style}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-1 hover:border-[var(--card-accent,rgba(103,232,249,0.7))] hover:shadow-[0_0_45px_-14px_var(--card-accent,rgba(34,211,238,0.4))] ${className}`}
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl transition duration-300 group-hover:bg-cyan-300/20" />
      {children}
    </Component>
  );
}

// SECTION - Hero: 2x2 on desktop (lg), full-width single row on tablet (md). Holds the avatar,
// name, "I'm a [typing role]" line, availability widget, and the consolidated metadata row.
// No email/contact logic lives here anymore — that's exclusively the Contact Matrix's job now.
function HeroBlock() {
  const typedRole = useTypingLoop(heroRoles);

  return (
    <BentoCard className="col-span-1 min-h-[360px] md:col-span-3 lg:col-span-2 lg:row-span-2">
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="flex items-start justify-between gap-5">
          <div className="aspect-square w-28 overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-xl shadow-black/20 sm:w-36">
            <img src="/profile.jpg" alt="Joseph Babaki" className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-medium text-emerald-100">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)] motion-safe:animate-pulse" />
            Currently available for new projects
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Digital Business Card</p>
          <h1 className="text-5xl font-black leading-none text-white sm:text-6xl">Joseph Babaki</h1>
          <p className="mt-4 min-h-8 text-xl font-bold sm:text-2xl">
            <span className="font-semibold text-white/70">I&apos;m a </span>
            <span className="text-cyan-300">{typedRole}</span>
            <span className="ml-1 inline-block h-6 w-0.5 translate-y-1 bg-cyan-300 motion-safe:animate-pulse" />
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {heroMetadata.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/75"
              >
                <span aria-hidden="true">{item.emoji}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

// SECTION - Tech Stack: now 2x1 (wide, short). Pills wrap organically and are centered as a
// block so they fill the card without a dead gap underneath. Hovering (or focusing) a pill
// recolors both the pill and the parent card's border/shadow via a `--card-accent` CSS
// variable lifted into React state. Clicking a pill opens its docs in a new tab.
function TechStackMatrix() {
  const [accent, setAccent] = useState(null);

  return (
    <BentoCard className="col-span-1 md:col-span-3 lg:col-span-2" style={accent ? { "--card-accent": accent } : undefined}>
      <div className="relative z-10 flex h-full flex-col">
        <div>
          <h2 className="text-lg font-extrabold text-white">Tech Stack</h2>
          <p className="mt-1 text-[11px] font-medium text-white/40">Core technologies powering my development cycle.</p>
        </div>
        <div className="mt-4 flex flex-1 flex-wrap content-center items-center justify-center gap-2">
          {techStack.map((tool) => (
            <a
              key={tool.name}
              href={tool.docs}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setAccent(tool.color)}
              onMouseLeave={() => setAccent(null)}
              onFocus={() => setAccent(tool.color)}
              onBlur={() => setAccent(null)}
              style={{ "--tech-color": tool.color }}
              className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white/80 transition hover:border-[var(--tech-color)] hover:text-white hover:shadow-[0_0_18px_-4px_var(--tech-color)]"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

// SECTION - Project Spotlight: 2x1. The whole card opens the active project's GitHub repo;
// floating left/right arrows and the bottom dots sit above it via z-index/pointer-events
// layering (not stopPropagation) so they never trigger the card-wide click. Manual navigation
// resets the 4.2s auto-rotate timer so it doesn't fight your click.
function ProjectSpotlight() {
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveProject((index) => (index + 1) % projects.length);
    }, 4200);
    return () => window.clearInterval(intervalId);
  }, [activeProject]);

  const goTo = (index) => setActiveProject(((index % projects.length) + projects.length) % projects.length);

  return (
    <BentoCard className="col-span-1 md:col-span-3 lg:col-span-2">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img src={project.image} alt="" className="h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <button
        type="button"
        onClick={() => window.open(project.href, "_blank", "noopener,noreferrer")}
        className="absolute inset-0 z-10"
        aria-label={`Open ${project.title} on GitHub`}
      />

      <div className="pointer-events-none relative z-20 flex h-full min-h-44 flex-col justify-between px-12 sm:px-16">
        <div>
          <span className="flex items-center justify-between gap-4">
            <span className="text-lg font-extrabold text-white">Project Spotlight</span>
          </span>
          <span className="block min-h-[150px] py-5">
           <span className="line-clamp-2 block min-h-[3.5rem] text-2xl font-black leading-tight text-white">{project.title}</span>
            <span className="mt-3 block max-w-xl text-sm leading-6 text-white/62">{project.summary}</span>
          </span>
        </div>

        <div className="pointer-events-auto flex gap-2" aria-label="Project navigation">
          {projects.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveProject(index)}
              aria-label={`Show ${item.title}`}
              className={`h-2 rounded-full transition-all ${
                activeProject === index ? "w-8 bg-cyan-300" : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => goTo(activeProject - 1)}
        aria-label="Previous project"
        className="pointer-events-auto absolute left-2 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-md transition hover:border-cyan-300/60 hover:text-cyan-200"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6 9 12l6 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => goTo(activeProject + 1)}
        aria-label="Next project"
        className="pointer-events-auto absolute right-2 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-md transition hover:border-cyan-300/60 hover:text-cyan-200"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </BentoCard>
  );
}

// SECTION - Workflow Accordion: now 2x1. Items lay out two-per-row to use the horizontal space;
// only one item is ever open (opening one collapses the rest). The list sits in a height-capped,
// scrollbar-hidden container so an expanded item scrolls internally instead of overflowing the
// card's fixed layout.
function WorkflowAccordion() {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState(0);
  const activeItem = workflowItems[activeWorkflowTab];

  return (
    <BentoCard className="col-span-1 md:col-span-3 lg:col-span-2">
      <div className="flex h-full flex-col">
        <h2 className="text-lg font-extrabold text-white">How I Build</h2>

        <div className="mt-4 flex h-full w-full flex-1 flex-col md:flex-row">
          <div className="flex h-full w-full flex-col border-r border-white/10 md:w-1/3">
            {workflowItems.map((item, index) => {
              const isActive = activeWorkflowTab === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveWorkflowTab(index)}
                  className={`flex flex-1 items-center border-l-2 px-6 text-left text-sm font-bold transition-colors duration-200 ${
                    isActive
                      ? "border-[#06B6D4] bg-white/5 text-white"
                      : "border-transparent text-white/40 hover:bg-white/[0.03] hover:text-white/70"
                  }`}
                >
                  {index + 1}. {item.title}
                </button>
              );
            })}
          </div>

          <div className="relative flex h-full w-full flex-col justify-center overflow-hidden p-8 md:w-2/3">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#06B6D4]/10 blur-3xl" />

            <div key={activeWorkflowTab} className="hide-scrollbar relative max-h-full overflow-y-auto transition-all duration-300 ease-out">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#06B6D4]">
                Step {String(activeWorkflowTab + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-4 text-2xl font-bold text-white">{activeItem.title}</h3>
              <p className="leading-relaxed text-white/70">{activeItem.description}</p>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

// One social square: brand-tinted background (or Instagram's gradient), brand-colored hover
// ring, a title label in the upper-left corner, and an optional circular avatar badge or
// status-text badge in the lower-left corner.
function SocialTile({ social }) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      aria-label={social.label}
      title={social.label}
      style={social.gradient ? undefined : { backgroundColor: social.tint, "--ring": social.ring }}
      className={`relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 text-white/80 transition hover:-translate-y-0.5 hover:text-white ${
        social.gradient
          ? "bg-gradient-to-tr from-[#F58529]/20 via-[#DD2A7B]/20 to-[#8134AF]/20 hover:border-[#DD2A7B]/70"
          : "hover:border-[var(--ring)]"
      }`}
    >
      <span className="absolute left-2 top-2 text-[9px] font-bold uppercase tracking-wide text-white/70">
        {social.titleLabel}
      </span>
      <BrandIcon path={social.icon} label={social.label} />
      {social.avatar && (
        <img
          src={social.avatar}
          alt=""
          className="absolute bottom-2 left-2 h-5 w-5 rounded-full border border-white/20 object-cover md:h-8 md:w-8"
        />
      )}
      {social.statusBadge && (
        <span className="absolute bottom-2 left-2 max-w-[90%] whitespace-nowrap rounded-sm border border-amber-400/30 bg-amber-400/10 px-0.5 py-0.5 text-[5px] font-bold uppercase leading-tight tracking-wide text-amber-300 sm:px-1 sm:text-[7px] md:px-2 md:text-[10px]">
          {social.statusBadge}
        </span>
      )}
    </a>
  );
}

// The Email square has dual-action logic: clicking the address text (bottom-left) copies it to
// the clipboard with a 2-second checkmark morph, via e.stopPropagation(); clicking anywhere else
// on the square opens a standard mailto: window. Unchanged from the previous version aside from
// the new "E-mail" title label and the exact neon-cyan brand tint.
function EmailTile() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (event) => {
    // We add preventDefault so clicking "copy" doesn't trigger the parent mailto: link
    event.preventDefault(); 
    event.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <a
      href={`mailto:${EMAIL}`}
      aria-label="Email Joseph — click the card to compose, or click the address to copy it"
      style={{ backgroundColor: "#06B6D426" }}
      className="relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 text-white/80 transition hover:-translate-y-0.5 hover:border-[#06B6D4]/70 hover:text-white"
    >
      <span className="absolute left-2 top-2 text-[9px] font-bold uppercase tracking-wide text-white/70">
        E-mail
      </span>
      
      {/* Assuming BrandIcon is imported/defined elsewhere in your file */}
      <BrandIcon path={brandPaths.email} label="Email" />
      
      <button
        type="button"
        onClick={copyEmail}
        className="absolute bottom-2 left-2 w-[calc(100%-1rem)] overflow-hidden rounded-full bg-black/40 px-2 py-0.5 font-semibold text-white/70 transition hover:text-cyan-200"
        aria-label="Copy email address"
      >
        <span className="flex w-full items-center justify-center overflow-hidden">
          {copied ? (
            <span className="inline-flex items-center gap-0.5 text-[5px] leading-tight text-emerald-300 sm:text-[9px] md:text-sm">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2 w-2 flex-none sm:h-3 sm:w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Copied
            </span>
          ) : (
            <span className="w-full truncate text-[5px] leading-tight sm:text-[9px] md:text-sm">{EMAIL}</span>
          )}
        </span>
      </button>
    </a>
  );
}

// SECTION - Contact Matrix: 2x1. Renders the five `socials` entries plus the bespoke EmailTile
// in the same 3-column mini-grid.
function ContactMatrix() {
  return (
    <BentoCard className="col-span-1 md:col-span-3 lg:col-span-2">
      <div className="flex h-full flex-col">
        <h2 className="text-lg font-extrabold text-white">Contact Me</h2>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {socials.map((social) => (
            <SocialTile key={social.label} social={social} />
          ))}
          <EmailTile />
        </div>
      </div>
    </BentoCard>
  );
}

export default function DigitalBusinessCard() {
  return (
    <main className="dbc-shell min-h-screen overflow-hidden px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* SECTION ORDER: source order stays the logical/accessible order. At lg (4 cols) the
          spans below tile a flush 12-cell rectangle with zero empty space:
          Hero(2x2) + TechStack(2x1) share row 1-2/cols 3-4 split across two rows,
          Workflow(2x1) + Contact(2x1) fill row 3. At md (3 cols) every section is full-width
          (col-span-3) since a 3-wide grid can't be tiled flush with only 2-wide pieces —
          the flush requirement was scoped to the lg/desktop grid. */}
      <div className="mx-auto grid max-w-7xl grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <HeroBlock />
        <TechStackMatrix />
        <ProjectSpotlight />
        <WorkflowAccordion />
        <ContactMatrix />
      </div>
    </main>
  );
}
