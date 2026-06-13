import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BETA_CODE = "HORABETA3";
const BETA_URL = "https://mvp.horaapp.co";

export default function Beta() {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    setShowCodeInput(true);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === BETA_CODE) {
      window.location.href = BETA_URL;
    } else {
      setError("Invalid code — reach out to us to get access");
    }
  };

  return (
    <>
      <Helmet>
        <title>NYC Beta | Hora</title>
        <meta
          name="description"
          content="Hora NYC Beta — an invite-only pilot in NYC. Get support with everyday tasks or earn money supporting others. Participation is limited and personally managed by the Hora team."
        />
      </Helmet>

      <div className="min-h-screen bg-primary flex flex-col items-center px-4 py-12">
        {/* Logo */}
        <div className="w-28 mb-8">
          <img src="/img/hora_logo.png" alt="Hora" className="w-full" />
        </div>

        <div className="w-full max-w-lg space-y-10">
          {/* Hero */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-accent">
              Hora NYC Beta
            </h1>
           <p className="text-accent/60 text-sm leading-relaxed">
            We're hand-picking a small group of New Yorkers to try HO:RA
            before we fully launch. Spots are limited and personally managed
            by our team. 💚
          </p>
          </div>

          {/* What is Hora */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-accent">What is Hora?</h2>
            <p className="text-accent/60 text-sm leading-relaxed mb-3">
              Hora is a local task platform where anyone can participate as both:
            </p>
            <ul className="space-y-2 text-sm text-accent/60">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
               <span><span className="text-accent font-medium">Requester</span> — get support with everyday tasks: pickups, drop-offs, package returns, grocery runs, walking companion, and more</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                <span><span className="text-accent font-medium">Supporter</span> — earn money supporting others in your spare time</span>
              </li>
            </ul>
            <p className="text-accent/60 text-sm leading-relaxed">
              There's no need to choose just one — you can do both.
            </p>
          </section>

          {/* What to expect */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-accent">
              What to expect during beta
            </h2>
            <ul className="space-y-2 text-sm text-accent/60">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                <span>
                  Free to use — no platform fee during the pilot{" "}
                  <span className="text-accent/40 text-xs">
                    (Direct task costs such as purchases, transit, or other
                    third-party expenses remain the Requester's responsibility.)
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                NYC only — Midtown Manhattan focus during beta
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                Public locations only — no private residences
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                Participation is invite-only and manually reviewed by our team
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                Some task types and availability may be limited as we test operations
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
              <span>Your feedback directly shapes what HO:RA becomes — we're building this with you 💚</span>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <div className="space-y-4">
            {!showCodeInput ? (
              <button
                onClick={handleApply}
                className="w-full py-3 rounded-xl bg-secondary text-white font-semibold text-sm hover:bg-secondary/85 transition"
              >
                Apply to Join
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter your access code"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent placeholder:text-accent/30 focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-secondary text-white font-semibold text-sm hover:bg-secondary/85 transition"
                >
                  Submit
                </button>
                {error && (
                  <div className="text-center space-y-1">
                    <p className="text-danger text-xs">{error}</p>
                    <Link to="/Contact" className="text-secondary text-xs underline">
                      Contact us
                    </Link>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-16">
          <Link to="/" className="text-accent/40 text-sm hover:text-accent/70 transition">
            ← Back to main site
          </Link>
        </div>
      </div>
    </>
  );
}
