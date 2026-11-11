import type { ReactNode } from "react";

/** The site's text column. Sections can be full-bleed and put this inside. */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <div className={`max-w-[40rem] md:ml-[8%] lg:max-w-[52rem] xl:max-w-[60rem] ${className}`}>{children}</div>
    </div>
  );
}
