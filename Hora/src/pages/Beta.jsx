import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BETA_CODE = "HORA2025";
const BETA_URL = "https://mvp.horaapp.co";

export default function Beta() {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
          content="Join the Hora NYC beta pilot. Free to use, no background check required yet. Help others or get help — earn while you have spare time."
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
              Hora NYC Beta — Pilot Week
            </h1>
            <p className="text-accent/60 text-sm leading-relaxed">
              We're running a 1-week pilot in NYC to test our execution flow and
              collect real feedback. It's completely free during beta — no
              background check required yet.
            </p>
          </div>

          {/* What is Hora */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-accent">What is Hora?</h2>
            <p className="text-accent/60 text-sm leading-relaxed">
              Hora is a local task platform where you can be{" "}
              <span className="text-accent font-medium">both</span> a{" "}
              <span className="text-secondary font-medium">Requester</span>{" "}
              (get help with everyday tasks) and a{" "}
              <span className="text-secondary font-medium">Supporter</span>{" "}
              (earn money by helping others in your spare time). No need to pick
              a role — you can do both.
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
                Free to use — no payment required during the pilot
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                NYC only for now
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                Tasks are public-location only (no private residences)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                Your feedback directly shapes the product
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
