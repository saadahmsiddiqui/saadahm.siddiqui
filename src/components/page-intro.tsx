import type { ReactNode } from "react";

/** Large heading and opening paragraph shared by the inner pages. */
export default function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="settle mt-20 sm:mt-28">
      <h1 className="text-[2.25rem] leading-[1.1] font-light tracking-[-0.01em] text-paper sm:text-[3.25rem] lg:text-[4rem]">
        {title}
      </h1>
      {children && (
        <p className="mt-8 max-w-[34rem] text-lg leading-relaxed lg:max-w-[42rem]">{children}</p>
      )}
    </section>
  );
}
