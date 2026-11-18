import { quotes } from "../content/quotes";

export default function Quotes() {
  return (
    <section className="mt-32 mb-24" aria-label="Quotes">
      <div className="grid gap-12">
        {quotes.map((quote) => (
          <figure key={quote.author} className="mx-auto max-w-[44rem] text-center">
            <blockquote className="text-2xl leading-snug font-medium text-muse sm:text-3xl">
              “{quote.text}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-dust">— {quote.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
