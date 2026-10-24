// =============================================================
// upiPayment.js — saari UPI payment logic ek hi jagah
// -------------------------------------------------------------
// UI components sirf is file ke functions call karte hain. Isliye jab
// real backend (FastAPI + Razorpay/Cashfree/PhonePe PG) ready ho, to
// sirf yahan ka "live" part use hoga — components change nahi honge.
//
// Do modes hain (.env me VITE_PAYMENT_MODE):
//   "demo" (default) : payment SIMULATE hota hai. Koi paisa nahi katta.
//   "live"           : niche likhe backend endpoints call hote hain.
//
// Demo me test karne ke liye:
//   - UPI ID me "fail" likha ho (e.g. test@fail)  => payment FAIL hoga
//   - UPI ID "@invalid" par end ho                => "UPI ID not found" aayega
//   - baaki sab UPI IDs ~7 second me SUCCESS honge
//
// Live mode ke liye backend contract (tumhare FastAPI me banana hai):
//   POST {API}/payments/upi/verify-vpa   body: { vpa }                  -> { valid, name }
//   POST {API}/payments/upi/collect      body: { vpa, amount, txnId, note, student } -> { status: "PENDING" }
//   GET  {API}/payments/upi/status/:txnId                               -> { status: "PENDING" | "SUCCESS" | "FAILED" }
// Status SIRF backend (gateway webhook) se confirm hona chahiye, frontend se nahi.
//
// IMPORTANT: UPI PIN kabhi bhi website par nahi li jaati. User apne UPI app
// (GPay/PhonePe/Paytm/BHIM) me PIN dalta hai — wahi "authentication" hai.
// =============================================================

export const PAYMENT_MODE = import.meta.env.VITE_PAYMENT_MODE || "demo";
export const isDemoMode = PAYMENT_MODE !== "live";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

// School ka receiving UPI ID. .env me VITE_SCHOOL_UPI_ID set karo.
export const SCHOOL_UPI = {
  vpa: import.meta.env.VITE_SCHOOL_UPI_ID || "diamondkidsschool@upi",
  name: "Diamond Kids School",
};

// Zyadatar banks me ek UPI transaction ki limit ₹1,00,000 hoti hai
export const MIN_AMOUNT = 1;
export const MAX_AMOUNT = 100000;

// ---------- Chhote helpers ----------

// Valid UPI ID jaise: name@okhdfcbank, 9876543210@paytm
export function isValidVpa(vpa) {
  return /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(vpa.trim());
}

// rahul.sharma@okhdfcbank -> ra***@okhdfcbank (receipt par poori ID nahi dikhate)
export function maskVpa(vpa) {
  const [name, handle] = vpa.split("@");
  if (!handle) return vpa;
  return `${name.slice(0, 2)}***@${handle}`;
}

export function createTransactionId() {
  const time = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DKS${time}${random}`;
}

export function formatRupees(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

// UPI deep link (QR code me bhi yahi jaata hai aur app buttons me bhi).
// `scheme` badal ke alag apps kholte hain.
export const upiApps = [
  { id: "gpay", label: "Google Pay", scheme: "tez://upi/pay" },
  { id: "phonepe", label: "PhonePe", scheme: "phonepe://pay" },
  { id: "paytm", label: "Paytm", scheme: "paytmmp://pay" },
  { id: "bhim", label: "Any UPI app", scheme: "upi://pay" },
];

export function buildUpiLink({ amount, txnId, note, scheme = "upi://pay" }) {
  const params = new URLSearchParams({
    pa: SCHOOL_UPI.vpa, // payee address
    pn: SCHOOL_UPI.name, // payee name
    am: String(amount), // amount
    cu: "INR",
    tn: note, // transaction note
    tr: txnId, // transaction reference
  });
  return `${scheme}?${params.toString()}`;
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callApi(path, options) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) throw new Error("Payment server error");
  return response.json();
}

// ---------- Demo mode ka fake "bank" ----------
// txnId -> { startedAt, vpa }  (sirf memory me, refresh par chala jaata hai)
const demoPayments = new Map();

// ---------- Public functions (components yahi use karte hain) ----------

// Step 1: UPI ID sahi hai ya nahi, ye bank se check karna
export async function verifyVpa(vpa) {
  if (!isValidVpa(vpa)) return { valid: false };

  if (isDemoMode) {
    await wait(900);
    return { valid: !vpa.toLowerCase().endsWith("@invalid") };
  }
  return callApi("/payments/upi/verify-vpa", { method: "POST", body: JSON.stringify({ vpa }) });
}

// Step 2: User ke UPI app par "collect request" bhejna (PIN wahin dalni hai)
export async function sendCollectRequest({ vpa, amount, txnId, note, student }) {
  if (isDemoMode) {
    await wait(1100);
    demoPayments.set(txnId, { startedAt: Date.now(), vpa });
    return { status: "PENDING" };
  }
  return callApi("/payments/upi/collect", {
    method: "POST",
    body: JSON.stringify({ vpa, amount, txnId, note, student }),
  });
}

// Step 3: Payment ka status poll karna (QR / app flow me bhi yahi use hota hai)
export async function getPaymentStatus(txnId) {
  if (isDemoMode) {
    await wait(300);
    // QR / app flow me collect request nahi bheji jaati, isliye yahin register kar lete hain
    if (!demoPayments.has(txnId)) demoPayments.set(txnId, { startedAt: Date.now(), vpa: "" });

    const { startedAt, vpa } = demoPayments.get(txnId);
    const secondsPassed = (Date.now() - startedAt) / 1000;
    const willFail = vpa.toLowerCase().includes("fail");

    if (willFail && secondsPassed > 5) return { status: "FAILED" };
    if (!willFail && secondsPassed > 7) return { status: "SUCCESS" };
    return { status: "PENDING" };
  }
  return callApi(`/payments/upi/status/${txnId}`);
}
