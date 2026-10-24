import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, IndianRupee } from "lucide-react";
import { feeTypes, classOptions } from "../schoolData";
import { MIN_AMOUNT, MAX_AMOUNT, formatRupees } from "../../services/upiPayment";

const inputClasses =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all bg-gray-50 focus:bg-white text-sm";

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export default function FeeDetailsStep({ form, setForm, onNext }) {
  const [errors, setErrors] = useState({});

  const updateField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const selectFeeType = (fee) => {
    setForm((prev) => ({ ...prev, feeType: fee.id, amount: fee.amount ? String(fee.amount) : "" }));
  };

  const validate = () => {
    const found = {};
    if (form.studentName.trim().length < 2) found.studentName = "Please enter the student's full name";
    if (!form.admissionNo.trim()) found.admissionNo = "Admission number is required";
    if (!form.className) found.className = "Please select a class";
    if (!/^[6-9]\d{9}$/.test(form.parentPhone)) found.parentPhone = "Enter a valid 10-digit mobile number";

    const amount = Number(form.amount);
    if (!amount || amount < MIN_AMOUNT) found.amount = "Enter a valid amount";
    else if (amount > MAX_AMOUNT) found.amount = `UPI limit is ${formatRupees(MAX_AMOUNT)} per payment`;

    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Student Name" error={errors.studentName}>
          <input
            className={inputClasses}
            placeholder="e.g. Aarav Sharma"
            value={form.studentName}
            onChange={(e) => updateField("studentName", e.target.value)}
          />
        </Field>

        <Field label="Admission No." error={errors.admissionNo}>
          <input
            className={inputClasses}
            placeholder="e.g. DKS-2041"
            value={form.admissionNo}
            onChange={(e) => updateField("admissionNo", e.target.value)}
          />
        </Field>

        <Field label="Class" error={errors.className}>
          <select
            className={inputClasses}
            value={form.className}
            onChange={(e) => updateField("className", e.target.value)}
          >
            <option value="">Select class</option>
            {classOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </Field>

        <Field label="Parent Mobile Number" error={errors.parentPhone}>
          <input
            className={inputClasses}
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit number"
            value={form.parentPhone}
            onChange={(e) => updateField("parentPhone", e.target.value.replace(/\D/g, ""))}
          />
        </Field>
      </div>

      {/* Fee type selector */}
      <div>
        <p className="mb-2 block text-sm font-medium text-gray-700">Fee Type</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {feeTypes.map((fee) => {
            const isSelected = form.feeType === fee.id;
            return (
              <motion.button
                key={fee.id}
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => selectFeeType(fee)}
                className={`rounded-2xl border-2 p-3.5 text-left transition-colors duration-200 ${
                  isSelected ? "border-coral bg-coral/10" : "border-gray-200 bg-white hover:border-coral/40"
                }`}
              >
                <span className="block text-sm font-semibold text-navy">{fee.label}</span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  {fee.amount ? `${formatRupees(fee.amount)} · ${fee.hint}` : fee.hint}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Field label="Amount to Pay" error={errors.amount}>
        <div className="relative">
          <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className={`${inputClasses} pl-10 text-base font-semibold`}
            inputMode="numeric"
            placeholder="0"
            value={form.amount}
            onChange={(e) => updateField("amount", e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </Field>

      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#17dd45] hover:text-black hover:shadow-lg"
      >
        Continue to Payment
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
