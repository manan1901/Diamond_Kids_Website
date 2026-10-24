import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Lock, FlaskConical } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import PaymentStepper from "../components/payment/PaymentStepper";
import FeeDetailsStep from "../components/payment/FeeDetailsStep";
import UpiPayStep from "../components/payment/UpiPayStep";
import UpiAuthStep from "../components/payment/UpiAuthStep";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import { feeTypes } from "../components/schoolData";
import { createTransactionId, formatRupees, isDemoMode } from "../services/upiPayment";

const emptyForm = {
  studentName: "",
  admissionNo: "",
  className: "",
  parentPhone: "",
  feeType: "tuition",
  amount: String(feeTypes[0].amount),
};

// Page ka flow ek chhoti state machine hai:
//   details -> pay -> authenticate -> success
const stepIndex = { details: 0, pay: 1, authenticate: 2, success: 3 };

export default function FeePayment() {
  const [step, setStep] = useState("details");
  const [form, setForm] = useState(emptyForm);
  const [txnId, setTxnId] = useState(createTransactionId);
  const [payment, setPayment] = useState({ method: "", vpa: "" });
  const [receipt, setReceipt] = useState(null);

  // Step badalne par card ko screen me wapas laate hain (mobile par kaafi kaam aata hai)
  const cardRef = useRef(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const feeLabel = feeTypes.find((fee) => fee.id === form.feeType)?.label ?? "Fee";

  const handleStartAuth = ({ method, vpa }) => {
    setPayment({ method, vpa });
    setStep("authenticate");
  };

  // Retry par naya txnId banate hain taaki purani attempt se mix na ho
  const handleRetry = () => {
    setTxnId(createTransactionId());
    setStep("pay");
  };

  const handleSuccess = useCallback(() => {
    setReceipt({
      txnId,
      paidAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      studentName: form.studentName,
      className: form.className,
      admissionNo: form.admissionNo,
      feeLabel,
      amount: Number(form.amount),
      vpa: payment.vpa,
    });
    setStep("success");
  }, [txnId, form, feeLabel, payment.vpa]);

  const handleReset = () => {
    setForm(emptyForm);
    setTxnId(createTransactionId());
    setReceipt(null);
    setStep("details");
  };

  return (
    <div className="bg-sand pb-24">
      <PageHeader
        icon={Wallet}
        title="Online Fee Payment"
        subtitle="Pay your child's school fee securely with UPI — it only takes a minute."
      >
        <PaymentStepper currentIndex={stepIndex[step]} />
      </PageHeader>

      <div className="relative z-10 mx-auto -mt-10 max-w-2xl px-5">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="scroll-mt-28 overflow-hidden rounded-3xl border border-navy/5 bg-white shadow-xl"
        >
          {isDemoMode && (
            <div className="no-print flex items-center justify-center gap-2 bg-gold/25 px-4 py-2 text-xs font-medium text-navy">
              <FlaskConical size={14} /> Demo mode — payments are simulated and no money is deducted.
            </div>
          )}

          {/* Amount summary: pay + authenticate steps me dikhta hai */}
          {(step === "pay" || step === "authenticate") && (
            <div className="flex items-center justify-between bg-navy px-6 py-4 text-white">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/60">{feeLabel}</p>
                <p className="text-sm text-white/80">{form.studentName} · {form.className}</p>
              </div>
              <p className="font-serif text-2xl font-semibold text-gold">{formatRupees(Number(form.amount))}</p>
            </div>
          )}

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                {step === "details" && (
                  <FeeDetailsStep form={form} setForm={setForm} onNext={() => setStep("pay")} />
                )}

                {step === "pay" && (
                  <UpiPayStep
                    form={form}
                    feeLabel={feeLabel}
                    txnId={txnId}
                    onStartAuth={handleStartAuth}
                    onBack={() => setStep("details")}
                  />
                )}

                {step === "authenticate" && (
                  <UpiAuthStep
                    txnId={txnId}
                    method={payment.method}
                    vpa={payment.vpa}
                    amount={Number(form.amount)}
                    onSuccess={handleSuccess}
                    onRetry={handleRetry}
                  />
                )}

                {step === "success" && receipt && <PaymentSuccess receipt={receipt} onReset={handleReset} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="no-print mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Lock size={13} /> Secure UPI payment · Your UPI PIN is never shared with this website
        </p>
      </div>
    </div>
  );
}
