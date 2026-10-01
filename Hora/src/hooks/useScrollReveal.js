import { useLayoutEffect } from "react";

// Keep in sync with .reveal-in in animations.css
const DURATION_MS = 550;
const TONE_DURATION_MS = 900;
const STEP_MS = 80;
const STAGGER_MS = 70;
const STAGGER_CAP = 4; // siblings past this share the last slot, so a big grid finishes within ~0.9s

/**
 * One-time reveal on scroll for every [data-reveal] element inside `rootRef`.
 *
 *   data-reveal="rise"        fade in while rising a short distance
 *   data-reveal="fade"        fade in with no movement (large images)
 *   data-reveal="tone"        dark section background eases in from a deeper shade
 *   data-reveal-margin="-20%" trigger this far inside the bottom edge instead of just before it
 *   data-reveal-step="1"      follow the heading by one beat (body copy, CTAs)
 *   data-reveal-stagger       siblings that enter together cascade in reading order
 *   data-reveal-block         on a grid: below the `sm` breakpoint, where it is one column, the grid
 *                             reveals as a single block and its children are left alone
 *
 * Elements are visible by default. This hook hides them before first paint and
 * reveals them as they approach the viewport, so nothing stays hidden if the
 * script fails, IntersectionObserver is missing, or reduced motion is requested.
 * The classes are set on the DOM directly: don't give these elements a dynamic className.
 */
export default function useScrollReveal(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const phone = window.matchMedia("(max-width: 639px)").matches;
    const targets = Array.from(root.querySelectorAll("[data-reveal], [data-reveal-block]")).filter((el) =>
      phone ? !el.parentElement.hasAttribute("data-reveal-block") : !el.hasAttribute("data-reveal-block"),
    );
    const timers = new Set();
    targets.forEach((el) => el.classList.add("reveal-pending"));

    const reveal = (el, delay) => {
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.classList.add("reveal-in");
      el.classList.remove("reveal-pending");
      // Drop the transition afterwards so it can't interfere with hover states.
      const timer = setTimeout(() => {
        el.classList.remove("reveal-in");
        el.style.removeProperty("--reveal-delay");
        timers.delete(timer);
      }, delay + (el.dataset.reveal === "tone" ? TONE_DURATION_MS : DURATION_MS) + 50);
      timers.add(timer);
    };

    const onIntersect = (entries, observer) => {
        const staggered = new Map();
        entries.forEach(({ target: el, isIntersecting, boundingClientRect }) => {
          if (!isIntersecting) return;
          observer.unobserve(el);
          if (boundingClientRect.bottom < 0) {
            // Already scrolled past (an anchor jump, a restored scroll position): show without animating.
            el.classList.remove("reveal-pending");
            return;
          }
          let delay = (Number(el.dataset.revealStep) || 0) * STEP_MS;
          if (el.hasAttribute("data-reveal-stagger")) {
            const index = staggered.get(el.parentElement) ?? 0;
            staggered.set(el.parentElement, index + 1);
            delay += Math.min(index, STAGGER_CAP) * STAGGER_MS;
          }
          reveal(el, delay);
        });
    };

    // One observer per distinct bottom margin (in practice two: the default and the Trust section's).
    // Bottom: by default start just before the element crosses the edge (pending elements sit 20px low).
    // Top: effectively unbounded, so anything above the viewport reports in and is never left hidden.
    const observers = new Map();
    targets.forEach((el) => {
      const margin = el.dataset.revealMargin || "32px";
      if (!observers.has(margin)) {
        observers.set(margin, new IntersectionObserver(onIntersect, { rootMargin: `100000px 0px ${margin} 0px` }));
      }
      observers.get(margin).observe(el);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      timers.forEach(clearTimeout);
      targets.forEach((el) => {
        el.classList.remove("reveal-pending", "reveal-in");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [rootRef]);
}
