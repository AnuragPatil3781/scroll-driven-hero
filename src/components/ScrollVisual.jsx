import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import Vehicle from "./Vehicle";

gsap.registerPlugin(ScrollTrigger);

const TRAILS = [0, 1, 2, 3, 4, 5];
const PARTICLES = Array.from({ length: 26 }, (_, i) => i);

export default function ScrollVisual() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector;
      const vehicle = q("[data-vehicle]")[0];
      const heroCopy = q("[data-hero-copy]")[0];
      const stats = q("[data-stats]")[0];
      const grid = q("[data-grid]")[0];
      const glow = q("[data-glow]")[0];
      const particles = q("[data-particles]")[0];
      const trails = q("[data-trails]")[0];
      const trailItems = q("[data-trail]");
      const indicator = q("[data-scroll-indicator]")[0];
      const outro = q("[data-outro]")[0];

      /* ---------------- INTRO (page load) ---------------- */
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(q("[data-letter]"), {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          stagger: 0.035,
        })
        .from(q("[data-subtitle]"), { y: 18, opacity: 0, duration: 0.8 }, "-=0.45")
        .from(q("[data-stat]"), { y: 26, opacity: 0, duration: 0.7, stagger: 0.14 }, "-=0.5")
        .from(vehicle, { opacity: 0, scale: 0.94, duration: 1.1 }, "-=0.9")
        .from(indicator, { opacity: 0, y: 12, duration: 0.6 }, "-=0.5");

      /* ---------------- SCROLL TIMELINE ----------------
       * One master timeline. Units == scroll percent (total 100).
       */
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1280px)",
          laptop: "(min-width: 1024px) and (max-width: 1279px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { desktop, laptop, tablet } = context.conditions;
          // travel multiplier keeps the vehicle fully visible on small screens
          const k = desktop ? 1 : laptop ? 0.8 : tablet ? 0.6 : 0.34;
          const scaleK = desktop ? 1 : laptop ? 0.95 : tablet ? 0.9 : 0.82;
          const s = (v) => 1 + (v - 1) * scaleK;

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              pin: false,
              onUpdate: (st) => {
                const p = st.progress;
                // direct DOM writes — no React state on scroll
                if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
                if (percentRef.current)
                  percentRef.current.textContent = `${Math.round(p * 100)}%`;
                if (stageRef.current) {
                  const stage = Math.min(4, Math.floor(p * 4) + 1);
                  stageRef.current.textContent = `0${stage} / 04`;
                }
              },
            },
          });

          /* --- vehicle journey: six stages --- */
          gsap.set(vehicle, { xPercent: 0, yPercent: 5, scale: s(0.85), rotation: 0 });
          tl.to(vehicle, { xPercent: 20 * k, yPercent: 0, scale: s(1.0), rotation: 3, duration: 20 }, 0)
            .to(vehicle, { xPercent: 55 * k, yPercent: -5, scale: s(1.1), rotation: 5, duration: 15 }, 20)
            // cinematic crossing 35–65%: wider sweep, a touch more lean and scale
            .to(vehicle, { xPercent: 68 * k, yPercent: -7, scale: s(1.16), rotation: 7, duration: 5, ease: "sine.out" }, 35)
            .to(vehicle, { xPercent: -62 * k, yPercent: -13, scale: s(1.28), rotation: -8, duration: 20, ease: "sine.inOut" }, 40)
            .to(vehicle, { xPercent: -15 * k, yPercent: -20, scale: s(1.3), rotation: -2, duration: 20, ease: "sine.out" }, 60)
            .to(vehicle, { xPercent: 25 * k, yPercent: -25, scale: s(1.4), rotation: 0, duration: 16 }, 80)
            .to(vehicle, { opacity: 0.72, yPercent: -28, duration: 4 }, 96);

          /* --- headline: holds to 25%, lifts subtly, then gradual fade --- */
          tl.to(heroCopy, { y: -60, scale: 0.93, duration: 20 }, 25)
            .to(heroCopy, { opacity: 0, y: -140, duration: 15, ease: "power1.in" }, 45);

          /* --- statistics: hold, drift down, gone by 50% --- */
          tl.to(stats, { y: 60, opacity: 0.45, duration: 20 }, 25)
            .to(stats, { opacity: 0, duration: 10 }, 45);

          /* --- background parallax: grid and glow on different paths --- */
          tl.to(grid, { x: -150, y: 40, duration: 50 }, 0)
            .to(grid, { x: 100, y: 80, duration: 50 }, 50);
          tl.to(glow, { x: 220, y: -60, scale: 1.15, duration: 40 }, 0)
            .to(glow, { x: -180, y: 40, scale: 1.3, duration: 50 }, 40)
            .to(glow, { scale: 1.42, opacity: 1.0, filter: "brightness(1.25)", duration: 10 }, 90);
          tl.to(particles, { y: -120, x: -60, opacity: 0.85, duration: 100 }, 0);

          /* --- motion trails: hidden, fade in, sweep, fade out --- */
          gsap.set(trails, { opacity: 0 });
          tl.to(trails, { opacity: 1, duration: 10 }, 30)
            .fromTo(
              trailItems,
              { xPercent: 40 },
              { xPercent: -140, duration: 35, stagger: { each: 1.2, from: "random" } },
              30,
            )
            .to(trails, { opacity: 0, duration: 10 }, 65);

          /* --- scroll indicator fades out early --- */
          tl.to(indicator, { opacity: 0, y: 16, duration: 12 }, 0);

          /* --- outro: soft rise over the final stretch --- */
          gsap.set(outro, { opacity: 0, y: 32 });
          tl.to(outro, { opacity: 1, y: 0, duration: 8, ease: "power2.out" }, 92);

          return () => tl.kill();
        },
      );

      return () => {
        intro.kill();
        mm.revert();
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="fz-root">
      {/* scroll progress */}
      <div className="fz-progress">
        <div className="fz-progress-bar" ref={barRef} />
      </div>
      <div className="fz-readout">
        <span ref={stageRef}>01 / 04</span>
        <span className="fz-readout-sep" />
        <span ref={percentRef}>0%</span>
      </div>

      <section ref={heroRef} className="fz-hero">
        <div className="fz-stage">
          {/* background layers */}
          <div className="fz-bg" />
          <div className="fz-grid" data-grid />
          <div className="fz-glow" data-glow />

          <div className="fz-particles" data-particles>
            {PARTICLES.map((i) => (
              <span
                key={i}
                className="fz-particle"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                  opacity: 0.12 + ((i * 7) % 10) / 40,
                  transform: `scale(${0.6 + ((i * 3) % 7) / 8})`,
                }}
              />
            ))}
          </div>

          <div className="fz-trails" data-trails>
            {TRAILS.map((i) => (
              <span
                key={i}
                className="fz-trail"
                data-trail
                style={{ top: `${38 + i * 6}%`, width: `${28 + ((i * 13) % 34)}%` }}
              />
            ))}
          </div>

          <Hero />

          <div className="fz-vehicle" data-vehicle>
            <Vehicle className="fz-vehicle-svg" />
          </div>

          <div className="fz-scroll-indicator" data-scroll-indicator>
            <span>SCROLL</span>
            <span className="fz-scroll-line" />
            <span className="fz-scroll-arrow">↓</span>
          </div>

          <div className="fz-outro" data-outro>
            <h2>The journey continues.</h2>
            <p>Every pixel engineered for performance, every animation tied to intent.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
