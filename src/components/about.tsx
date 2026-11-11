import { beliefs, outsideWork } from "../content/about";
import Container from "./container";

export default function About() {
  return (
    <Container>
      <section className="settle mt-20 sm:mt-28">
        <h1 className="text-[2.25rem] leading-[1.1] font-light tracking-[-0.01em] text-paper sm:text-[3.25rem] lg:text-[4rem]">
          A Karachi native, now based in Berlin.
        </h1>
        <p className="mt-8 max-w-[34rem] text-lg lg:max-w-[42rem] leading-relaxed">{outsideWork}</p>
      </section>

      <section className="mt-20" aria-labelledby="beliefs-heading">
        <h2 id="beliefs-heading" className="mb-4 text-sm text-dust">
          A few things I believe in
        </h2>
        <dl className="border-t border-deep">
          {beliefs.map((belief) => (
            <div key={belief.title} className="border-b border-deep py-5">
              <dt className="text-paper">{belief.title}</dt>
              <dd className="mt-2 max-w-[34rem] leading-relaxed lg:max-w-[42rem] text-dust">{belief.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Container>
  );
}
