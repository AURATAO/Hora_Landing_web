import { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation.jsx";

// The hero film: 20 seconds, silent, looping. One request from "what can I help
// with?" to "Jake is on the way".
//
// It autoplays because it is not a film you decide to watch — it is the product
// demonstrating itself while you read the headline beside it. Three things make
// that acceptable rather than rude, and all three are load-bearing:
//
//   muted + playsInline   iOS refuses to autoplay anything else, and inline
//                         stops it hijacking the screen as a fullscreen player.
//                         The encoded files carry NO audio track at all, so
//                         there is nothing to unmute even by accident.
//   no controls           Nothing to pause means nothing demanding a decision.
//   prefers-reduced-motion  The whole element is swapped for the static
//                         conversation. Not paused — swapped, so the person
//                         still gets the story, and the bytes are never
//                         fetched.
//
// preload="none" with the poster painted underneath: the page costs 40 KB for
// the still, and the 2.2 MB only loads once the hero is actually on screen. On
// a phone over slow 4G that is the difference between a hero that appears and
// one that arrives.

export default function HeroFilm({ variant = "framed" }) {
  const videoRef = useRef(null);
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  // The setting can change while the page is open (macOS and iOS both let you
  // flip it without reloading), so this follows it rather than reading once.
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Load and play only once the hero is on screen; pause when it is not. A loop
  // decoding behind three sections of scrolled-past page is pure battery.
  useEffect(() => {
    const video = videoRef.current;
    if (reduced || !video || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload !== "auto") video.preload = "auto";
          // Autoplay can still be refused (Low Power Mode, a data-saver setting).
          // The poster stays up and the page is unharmed, so the rejection is
          // swallowed rather than logged at the visitor.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  // FULL-BLEED (phones). The film fills the first screen and the writing starts
  // below it. No bezel: the phone in your hand is the bezel.
  //
  // Reduced motion gets the poster rather than the Conversation markup — a
  // threaded list cannot fill a screen edge to edge without becoming a different
  // design. The explanation those visitors lose here is the section directly
  // below, which carries it in text for everyone.
  if (variant === "fill") {
    if (reduced) {
      return (
        <img
          src="/video/hora-imessage-poster.jpg"
          alt="A text conversation with HO:RA: two bunches of purple carrots from the Union Square Greenmarket, delivered near Bryant Park by 1pm, quoted and charged at $43, with a Supporter on the way."
          className="absolute inset-0 h-full w-full object-cover"
        />
      );
    }
    return (
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full bg-ink object-cover"
        poster="/video/hora-imessage-poster.jpg"
        preload="none"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-label="A text conversation with HO:RA: a request for two bunches of purple carrots from the Union Square Greenmarket, delivered to an office near Bryant Park by 1pm. HO:RA quotes $43, the request is confirmed, $43 is charged to a Visa, and a Supporter sets off."
      >
        <source src="/video/hora-imessage.webm" type="video/webm" />
        <source src="/video/hora-imessage.mp4" type="video/mp4" />
      </video>
    );
  }

  if (reduced) return <Conversation />;

  // SIZED BY HEIGHT, NOT WIDTH. A 9:16 frame given its column's full width is
  // 890px tall on a desktop and taller than the screen on a phone, which pushed
  // the hero past one viewport and made the first thing a visitor did a scroll.
  //
  // So height leads and width follows from the aspect ratio. On a phone the
  // height is h-full inside the hero's flex-1 slot — the film takes exactly what
  // the text left over, on any screen, rather than a guessed cap that is wrong on
  // an SE and wasteful on a Pro Max. Desktop lays out side by side and uses svh
  // (not vh, which counts a phone's address bar and overflows when it retracts).
  return (
    <div className="mx-auto flex h-full w-fit max-w-full items-center rounded-[2.1rem] bg-ink p-2 shadow-[0_30px_70px_-30px_rgba(34,40,49,0.55)] sm:rounded-[2.4rem] sm:p-2.5 lg:h-auto lg:rounded-[2.6rem] lg:p-3">
      <video
        ref={videoRef}
        className="block aspect-[9/16] h-full max-h-[460px] min-h-[180px] w-auto rounded-[1.7rem] bg-ink object-cover sm:rounded-[2rem] lg:h-[min(68svh,560px)] lg:max-h-none lg:rounded-[2.1rem]"
        poster="/video/hora-imessage-poster.jpg"
        preload="none"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-label="A text conversation with HO:RA: a request for two bunches of purple carrots from the Union Square Greenmarket, delivered to an office near Bryant Park by 1pm. HO:RA quotes $43, the request is confirmed, $43 is charged to a Visa, and a Supporter sets off."
      >
        <source src="/video/hora-imessage.webm" type="video/webm" />
        <source src="/video/hora-imessage.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
