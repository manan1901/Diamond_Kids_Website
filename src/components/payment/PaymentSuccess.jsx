import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Printer, Home, RotateCcw } from "lucide-react";
import { formatRupees, maskVpa } from "../../services/upiPayment";

// Confetti ke tukde: har ek alag direction me udta hai
const confetti = Array.from({ length: 14 }, (_, i) => ({
  angle: (i / 14) * Math.PI * 2,
  distance: 70 + (i % 3) * 22,
  color: ["#FF6B4A", "#FFC857", "#7C9885", "#1B2A4A"][i % 4],
}));

function ReceiptRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-medium text-navy">{value}</span>
    </div>
  );
}

export default function PaymentSuccess({ receipt, onReset }) {
  return (
    <div>
      <div className="relative mb-6 flex justify-center no-print">
        {confetti.map((piece, index) => (
          <motion.span
            key={index}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(piece.angle) * piece.distance, y: Math.sin(piece.angle) * piece.distance, opacity: 0, scale: 0.4 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
            className="absolute top-8 h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: piece.color }}
          />
        ))}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
          </svg>
        </motion.div>
      </div>

      <div className="mb-6 text-center no-print">
        <h3 className="font-serif text-2xl font-semibold text-navy">Payment Successful</h3>
        <p className="mt-1 text-sm text-gray-600">Thank you! Your fee payment has been received.</p>
      </div>

      {/* Receipt — sirf yahi print hota hai (App.css me .print-area) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="print-area rounded-2xl border border-dashed border-navy/25 bg-sand p-5"
      >
        <div className="border-b border-navy/10 pb-3 text-center">
          <p className="font-serif text-lg font-bold uppercase tracking-tight text-navy">Diamond Kids School</p>
          <p className="text-xs uppercase tracking-widest text-gray-500">Fee Receipt</p>
        </div>

        <div className="divide-y divide-navy/5">
          <ReceiptRow label="Transaction ID" value={receipt.txnId} />
          <ReceiptRow label="Date & Time" value={receipt.paidAt} />
          <ReceiptRow label="Student" value={`${receipt.studentName} (${receipt.className})`} />
          <ReceiptRow label="Admission No." value={receipt.admissionNo} />
          <ReceiptRow label="Fee Type" value={receipt.feeLabel} />
          <ReceiptRow label="Paid via" value={receipt.vpa ? `UPI · ${maskVpa(receipt.vpa)}` : "UPI"} />
          <ReceiptRow label="Status" value={<span className="text-green-600">Paid</span>} />
        </div>

        <div className="mt-2 flex items-center justify-between rounded-xl bg-navy px-4 py-3 text-white">
          <span className="text-sm">Amount Paid</span>
          <span className="font-serif text-xl font-semibold">{formatRupees(receipt.amount)}</span>
        </div>
      </motion.div>

      <div className="no-print mt-6 grid gap-3 sm:grid-cols-3">
        <button type="button" onClick={() => window.print()} className="flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/85">
          <Printer size={15} /> Print receipt
        </button>
        <button type="button" onClick={onReset} className="flex items-center justify-center gap-2 rounded-xl border-2 border-navy/15 px-4 py-3 text-sm font-semibold text-navy transition-colors hover:border-coral hover:text-coral">
          <RotateCcw size={15} /> Pay another
        </button>
        <Link to="/" className="flex items-center justify-center gap-2 rounded-xl border-2 border-navy/15 px-4 py-3 text-sm font-semibold text-navy transition-colors hover:border-coral hover:text-coral">
          <Home size={15} /> Back home
        </Link>
      </div>
    </div>
  );
}
