import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, CircleAlert, RotateCcw } from "lucide-react";
import { getPaymentStatus, maskVpa, formatRupees } from "../../services/upiPayment";

const TIMEOUT_SECONDS = 300; // 5 minute
const POLL_EVERY_MS = 2500;

const formatClock = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

// Is step me user apne UPI app me PIN dalta hai (authentication wahin hoti hai).
// Hum sirf status poll karte rehte hain jab tak SUCCESS / FAILED / timeout na ho.
export default function UpiAuthStep({ txnId, method, vpa, amount, onSuccess, onRetry }) {
  const [secondsLeft, setSecondsLeft] = useState(TIMEOUT_SECONDS);
  const [outcome, setOutcome] = useState("waiting"); // waiting | failed | expired

  // Countdown timer
  useEffect(() => {
    if (outcome !== "waiting") return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setOutcome("expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [outcome]);

  // Status polling
  useEffect(() => {
    if (outcome !== "waiting") return;
    let cancelled = false;

    const check = async () => {
      try {
        const { status } = await getPaymentStatus(txnId);
        if (cancelled) return;
        if (status === "SUCCESS") onSuccess();
        if (status === "FAILED") setOutcome("failed");
      } catch {
        /* network hiccup: agle poll me dobara try hoga */
      }
    };

    const poller = setInterval(check, POLL_EVERY_MS);
    return () => {
      cancelled = true;
      clearInterval(poller);
    };
  }, [outcome, txnId, onSuccess]);

  if (outcome !== "waiting") {
    const isExpired = outcome === "expired";
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <CircleAlert size={32} />
        </div>
        <h3 className="font-serif text-xl font-semibold text-navy">
          {isExpired ? "Payment request expired" : "Payment was not completed"}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
          {isExpired
            ? "We didn't receive a confirmation in time. If money was deducted, it will be refunded by your bank automatically."
            : "The payment was declined or cancelled in your UPI app. No amount has been charged."}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/85"
        >
          <RotateCcw size={15} /> Try again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="py-4 text-center">
      {/* Phone + pulse rings */}
      <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-coral/30 animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full bg-coral/30 animate-pulse-ring [animation-delay:0.9s]" />
        <motion.div
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-coral text-white shadow-xl shadow-coral/40"
        >
          <Smartphone size={34} />
        </motion.div>
      </div>

      <h3 className="font-serif text-xl font-semibold text-navy">Approve the payment in your UPI app</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
        {method === "collect"
          ? `We've sent a request of ${formatRupees(amount)} to ${maskVpa(vpa)}. Open your UPI app and authorise it with your UPI PIN.`
          : `Complete the payment of ${formatRupees(amount)} in your UPI app with your UPI PIN. We'll update this page automatically.`}
      </p>

      <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold tabular-nums text-navy">
        <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
        Waiting for confirmation · {formatClock(secondsLeft)}
      </div>

      <div className="mx-auto mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-coral to-gold"
          initial={false}
          animate={{ width: `${(secondsLeft / TIMEOUT_SECONDS) * 100}%` }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>

      <p className="mx-auto mt-6 flex max-w-sm items-start justify-center gap-2 text-xs text-gray-500">
        <ShieldCheck size={15} className="mt-0.5 shrink-0 text-sage" />
        Your UPI PIN is entered only inside your UPI app. We never see or store it. Please don't close this page.
      </p>

      <button type="button" onClick={onRetry} className="mt-5 text-sm font-medium text-gray-500 underline-offset-4 transition-colors hover:text-coral hover:underline">
        Cancel and go back
      </button>
    </div>
  );
}
