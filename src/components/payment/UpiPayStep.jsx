import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { AtSign, QrCode, Smartphone, LoaderCircle, CircleCheck, CircleAlert, Copy, Check, ArrowLeft } from "lucide-react";
import {
  SCHOOL_UPI,
  upiApps,
  buildUpiLink,
  isValidVpa,
  verifyVpa,
  sendCollectRequest,
  formatRupees,
} from "../../services/upiPayment";

const tabs = [
  { id: "upi-id", label: "UPI ID", icon: AtSign },
  { id: "qr", label: "Scan QR", icon: QrCode },
  { id: "apps", label: "UPI Apps", icon: Smartphone },
];

// ---------- Tab 1: UPI ID daalo -> verify -> collect request ----------
function UpiIdPanel({ form, txnId, note, onStartAuth }) {
  const [vpa, setVpa] = useState("");
  // idle | verifying | verified | invalid | sending | error
  const [status, setStatus] = useState("idle");

  const handleChange = (value) => {
    setVpa(value.trim());
    setStatus("idle"); // UPI ID badalte hi verification dobara karni padegi
  };

  const handleVerify = async () => {
    if (!isValidVpa(vpa)) {
      setStatus("invalid");
      return;
    }
    setStatus("verifying");
    try {
      const result = await verifyVpa(vpa);
      setStatus(result.valid ? "verified" : "invalid");
    } catch {
      setStatus("error");
    }
  };

  const handleSend = async () => {
    setStatus("sending");
    try {
      await sendCollectRequest({
        vpa,
        amount: Number(form.amount),
        txnId,
        note,
        student: { name: form.studentName, admissionNo: form.admissionNo },
      });
      onStartAuth({ method: "collect", vpa });
    } catch {
      setStatus("error");
    }
  };

  const isBusy = status === "verifying" || status === "sending";

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Your UPI ID</label>
        <div className="flex gap-2">
          <input
            value={vpa}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="e.g. name@okhdfcbank"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${
              status === "invalid" ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:border-coral focus:ring-coral/50"
            }`}
          />
          <button
            type="button"
            onClick={handleVerify}
            disabled={!vpa || isBusy || status === "verified"}
            className="shrink-0 rounded-xl bg-navy px-5 text-sm font-semibold text-white transition-colors hover:bg-navy/85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "verifying" ? <LoaderCircle size={16} className="animate-spin" /> : "Verify"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {status === "verified" && (
            <motion.p key="ok" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-600">
              <CircleCheck size={14} /> UPI ID verified
            </motion.p>
          )}
          {status === "invalid" && (
            <motion.p key="bad" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
              <CircleAlert size={14} /> This UPI ID looks invalid or was not found. Please check and try again.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p key="err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
              <CircleAlert size={14} /> Something went wrong. Please try again.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={handleSend}
        disabled={status !== "verified"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-coral/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E55A3B] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
      >
        {status === "sending" ? (
          <><LoaderCircle size={16} className="animate-spin" /> Sending request…</>
        ) : (
          <>Pay {formatRupees(Number(form.amount))}</>
        )}
      </button>
    </div>
  );
}

// ---------- Tab 2: QR code scan ----------
function QrPanel({ upiLink, onStartAuth }) {
  const [copied, setCopied] = useState(false);

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(SCHOOL_UPI.vpa);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard block ho to chup-chaap ignore */
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative rounded-3xl bg-white p-4 shadow-lg ring-1 ring-navy/10"
      >
        <QRCodeSVG value={upiLink} size={184} level="M" fgColor="#1B2A4A" />
        {/* Scan-line animation */}
        <motion.div
          aria-hidden="true"
          className="absolute left-4 right-4 h-0.5 rounded-full bg-coral/80 shadow-[0_0_12px_2px_rgba(255,107,74,0.6)]"
          animate={{ top: ["8%", "92%", "8%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <p className="max-w-xs text-sm text-gray-600">
        Scan with any UPI app, enter your UPI PIN there, then come back here.
      </p>

      <button
        type="button"
        onClick={copyUpiId}
        className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
      >
        {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
        {SCHOOL_UPI.vpa}
      </button>

      <button
        type="button"
        onClick={() => onStartAuth({ method: "qr", vpa: "" })}
        className="w-full rounded-xl bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#17dd45] hover:text-black"
      >
        I've scanned &amp; paid — check status
      </button>
    </div>
  );
}

// ---------- Tab 3: UPI apps (mobile par app khulta hai) ----------
function AppsPanel({ form, txnId, note, onStartAuth }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {upiApps.map((app) => (
          <motion.a
            key={app.id}
            href={buildUpiLink({ amount: Number(form.amount), txnId, note, scheme: app.scheme })}
            onClick={() => onStartAuth({ method: "app", vpa: "" })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center rounded-2xl border-2 border-gray-200 bg-white px-4 py-5 text-sm font-semibold text-navy transition-colors hover:border-coral hover:bg-coral/5"
          >
            {app.label}
          </motion.a>
        ))}
      </div>
      <p className="text-center text-xs text-gray-500">
        Works on mobile — your UPI app opens with the amount filled in. On a computer, use the QR code or UPI ID.
      </p>
    </div>
  );
}

export default function UpiPayStep({ form, feeLabel, txnId, onStartAuth, onBack }) {
  const [activeTab, setActiveTab] = useState("upi-id");

  // UPI note max ~50 characters hota hai
  const note = `${feeLabel} - ${form.studentName}`.slice(0, 50);
  const upiLink = buildUpiLink({ amount: Number(form.amount), txnId, note });

  return (
    <div>
      <button type="button" onClick={onBack} className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-coral">
        <ArrowLeft size={15} /> Edit details
      </button>

      {/* Tabs */}
      <div className="relative mb-6 grid grid-cols-3 rounded-2xl bg-gray-100 p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`relative z-10 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
              activeTab === id ? "text-navy" : "text-gray-500 hover:text-navy"
            }`}
          >
            {activeTab === id && (
              <motion.span layoutId="upi-tab" className="absolute inset-0 -z-10 rounded-xl bg-white shadow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "upi-id" && <UpiIdPanel form={form} txnId={txnId} note={note} onStartAuth={onStartAuth} />}
          {activeTab === "qr" && <QrPanel upiLink={upiLink} onStartAuth={onStartAuth} />}
          {activeTab === "apps" && <AppsPanel form={form} txnId={txnId} note={note} onStartAuth={onStartAuth} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
