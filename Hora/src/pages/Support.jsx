import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { IMESSAGE_HREF, IMESSAGE_NUMBER, SUPPORTER_APPLY_URL } from "../lib/config";

const SUPPORT_EMAIL = "info@my-hora.com";

// THIN ON PURPOSE. This page used to carry pricing, cancellation, how to become
// a Supporter and the service area — all five sections are now answered in the
// FAQ, in more detail and in one place. Two copies of a cancellation policy is
// how one of them quietly goes out of date.
//
// It stays a real page rather than a redirect to /faq because the App Store
// listing's support URL points here, and a support URL that resolves to a page
// titled "Support" is one less thing for a reviewer to think about.
//
// In the messaging model the support channel and the booking channel are the
// same number, which is why texting leads.

export default function Support() {
  return (
    <>
      <Helmet>
        <title>Support | HO:RA</title>
        <meta
          name="description"
          content="Get help with HO:RA — text us, email info@my-hora.com, or read the FAQ."
        />
      </Helmet>

      <Header />

      <main id="main-content" className="bg-white pt-18 text-ink">

        <section className="bg-cream">
          <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-20">
            <h1 className="mb-6 text-[2.5rem] font-bold leading-[1.05] tracking-[-0.035em] md:text-5xl">
              Support
            </h1>
            <p className="font-secondary text-lg leading-relaxed text-ink/78">
              A person answers, not a ticket queue. The fastest way to reach us is the
              same conversation you&apos;d use to book anything.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-20">

            <div className="mb-12 border-t-2 border-forest pt-6">
              <h2 className="mb-3 text-2xl font-semibold tracking-[-0.018em]">Text us</h2>
              <p className="mb-5 font-secondary text-base leading-relaxed text-ink/78">
                {IMESSAGE_NUMBER} — about anything, including a task that is already running.
              </p>
              <a
                href={IMESSAGE_HREF}
                className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-forest px-7 py-3.5 text-base font-semibold text-white transition hover:bg-forest/90 active:scale-[0.98]"
              >
                Open Messages <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mb-12 border-t-2 border-forest pt-6">
              <h2 className="mb-3 text-2xl font-semibold tracking-[-0.018em]">Email</h2>
              <p className="font-secondary text-base leading-relaxed text-ink/78">
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="font-medium text-forest underline underline-offset-4"
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                — for anything that needs an attachment, a receipt or a written record.
              </p>
            </div>

            <div className="border-t-2 border-forest pt-6">
              <h2 className="mb-3 text-2xl font-semibold tracking-[-0.018em]">Before you write</h2>
              <p className="mb-5 font-secondary text-base leading-relaxed text-ink/78">
                Pricing, cancellations, what happens if a Supporter is late, what Supporters
                earn — all of it is in the FAQ.
              </p>
              <ul className="flex list-none flex-col gap-3 text-base">
                <li>
                  <Link to="/faq" className="font-medium text-forest underline underline-offset-4">
                    Read the FAQ →
                  </Link>
                </li>
                <li>
                  <a href={SUPPORTER_APPLY_URL} className="font-medium text-forest underline underline-offset-4">
                    Apply to be a Supporter →
                  </a>
                </li>
                <li>
                  <Link to="/terms" className="font-medium text-forest underline underline-offset-4">
                    Terms of Service →
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="font-medium text-forest underline underline-offset-4">
                    Privacy Policy →
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto w-full max-w-3xl px-5 py-12 md:px-8">
            <p className="font-secondary text-[15px] leading-relaxed text-ink/65">
              HO:RA operates in New York City and is run by Arcodiax LLC.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
