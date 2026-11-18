import { useState } from "react";
import { BOOKING_LIVE, IMESSAGE_DRAFT, WAITLIST_URL, imessageHrefFor, whatsappHrefFor } from "./config";

// Which messaging channel to put first for this visitor (Aura, 2026-11-14).
//
// iMessage only exists on Apple devices, so an iPhone, iPad or Mac leads with
// it; everything else (Android, Windows, Linux) leads with WhatsApp, which
// opens the app on a phone and WhatsApp Web/Desktop on a computer. Both
// channels stay reachable everywhere: this only picks the order.
//
// iPadOS reports itself as a Mac ("Macintosh"), which is what we want here.
export function prefersIMessage() {
  if (typeof navigator === "undefined") return true;
  return /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent || "");
}

export const CHANNELS = {
  imessage: { label: "iMessage", cta: "Text us to start", hrefFor: imessageHrefFor },
  whatsapp: { label: "WhatsApp", cta: "Message us on WhatsApp", hrefFor: whatsappHrefFor },
};

export const otherChannel = (c) => (c === "imessage" ? "whatsapp" : "imessage");

// Backstop: until booking is live, no sms: or wa.me link can reach the page, even
// from a call site that forgot to check BOOKING_LIVE. Callers still check it so
// the label matches where the link goes.
export const messageHrefFor = (channel, body = IMESSAGE_DRAFT) =>
  BOOKING_LIVE ? CHANNELS[channel].hrefFor(body) : WAITLIST_URL;

// The visitor's first channel, decided once on first render.
export function useChannel() {
  const [channel] = useState(() => (prefersIMessage() ? "imessage" : "whatsapp"));
  return channel;
}
