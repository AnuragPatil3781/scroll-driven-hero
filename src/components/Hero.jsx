import Stats from "./Stats";

const HEADLINE = "WELCOME ITZ FIZZ";

/** Headline, subtitle and statistics. Letters are individually wrapped for the intro stagger. */
export default function Hero() {
  return (
    <div className="fz-hero-copy" data-hero-copy>
      <h1 className="fz-headline" aria-label={HEADLINE}>
        {HEADLINE.split("").map((char, i) =>
          char === " " ? (
            <span className="fz-space" key={i} aria-hidden="true">
              &nbsp;
            </span>
          ) : (
            <span className="fz-letter-wrap" key={i} aria-hidden="true">
              <span className="fz-letter" data-letter>
                {char}
              </span>
            </span>
          ),
        )}
      </h1>

      <p className="fz-subtitle" data-subtitle>
        Crafting scroll-driven experiences where motion meets precision.
      </p>

      <Stats />
    </div>
  );
}
