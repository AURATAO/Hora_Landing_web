import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

const GATE_KEY = "hora-gate-seen";

export default function GateModal() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/beta") return;
    if (localStorage.getItem(GATE_KEY)) return;
    setVisible(true);
  }, [location.pathname]);

  if (!visible) return null;

  const handleInvestor = () => {
    localStorage.setItem(GATE_KEY, "1");
    setVisible(false);
  };

  const handleBeta = () => {
    localStorage.setItem(GATE_KEY, "1");
    setVisible(false);
    navigate("/beta");
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-modal-title"
    >
      <div className="bg-primary rounded-2xl shadow-2xl p-8 w-[90%] max-w-sm flex flex-col items-center gap-6">
        <div className="w-32">
          <img src="/img/hora_logo.png" alt="Hora" className="w-full" />
        </div>

        <div className="text-center space-y-2">
          <h2 id="gate-modal-title" className="text-2xl font-bold text-accent">
            Welcome to Hora
          </h2>
          <p className="text-accent/60 text-sm">
            Who are you here as today?
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleInvestor}
            className="w-full py-3 rounded-xl border border-accent/30 text-accent text-sm font-medium hover:bg-accent/10 transition"
          >
            Investor · Partner · Accelerator
          </button>
          <button
            onClick={handleBeta}
            className="w-full py-3 rounded-xl bg-secondary text-white text-sm font-semibold hover:bg-secondary/85 transition"
          >
            Join the Beta
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
