import { useEffect } from "react";
import { useLocation } from "react-router";
import { entriesOfKind, formatYears } from "../content/entries";
import Container from "./container";
import Explore from "./explore";
import SignalField from "./signal-field";
import Timeline from "./timeline";

export default function Home() {
  const { hash, key } = useLocation();

  // Scroll to a section when arriving with a hash, e.g. /#experience.
  useEffect(() => {
    if (!hash) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(hash.slice(1))
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, [hash, key]);

  const work = entriesOfKind("work").map((entry) => ({
    id: entry.title,
    when: formatYears(entry),
    title: entry.title,
    detail: entry.detail,
    description: entry.description,
    meta: entry.place && `${entry.place}${entry.remote ? " (remote)" : ""}`,
    href: entry.href,
  }));

  return (
    <>
      <section className="relative">
        {/* Extends up behind the header so the field starts at the top of the page. */}
        <SignalField className="signal-mask absolute inset-x-0 -top-40 bottom-0 -z-10" />
        <Container className="settle flex min-h-[64svh] flex-col justify-center py-20">
          <h1 className="text-[2.25rem] leading-[1.1] font-light tracking-[-0.01em] text-paper sm:text-[3.25rem] lg:text-[4rem]">
            Building Quality Software
          </h1>
          <p className="mt-8 max-w-[34rem] text-md lg:max-w-[42rem] leading-relaxed">
            Working across different domains: 24/7 financial exchanges, climate
            disaster management, AI for software testing, and platforms for
            buying and selling cars. I like working on things that matter, and
            sometimes things that move very fast.
          </p>
        </Container>
      </section>

      <Container>
        <Explore />

        <section
          id="experience"
          className="mt-24 scroll-mt-10"
          aria-labelledby="work-heading"
        >
          <h2 id="work-heading" className="mb-8 text-sm text-dust">
            Where I’ve worked
          </h2>
          <Timeline items={work} />
        </section>
      </Container>
    </>
  );
}
