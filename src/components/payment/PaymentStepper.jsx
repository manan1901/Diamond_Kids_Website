import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = ["Details", "Pay via UPI", "Authenticate", "Done"];

// currentIndex: 0 se 3. Complete ho chuke steps par tick dikhta hai.
export default function PaymentStepper({ currentIndex }) {
  return (
    <ol className="mx-auto flex w-full max-w-xl items-center justify-between">
      {steps.map((label, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{ scale: isCurrent ? 1.12 : 1 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                  isDone
                    ? "bg-sage text-white"
                    : isCurrent
                    ? "bg-coral text-white shadow-lg shadow-coral/40"
                    : "bg-white/15 text-white/60"
                }`}
              >
                {isDone ? <Check size={16} /> : index + 1}
              </motion.div>
              <span className={`hidden text-xs font-medium sm:block ${isCurrent ? "text-white" : "text-white/60"}`}>
                {label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="mx-2 mb-0 h-0.5 flex-1 overflow-hidden rounded-full bg-white/15 sm:mb-5">
                <motion.div
                  className="h-full bg-sage"
                  initial={false}
                  animate={{ width: isDone ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
