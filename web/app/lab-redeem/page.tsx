"use client";

import { useUser } from "@clerk/nextjs";
import { FormEvent, useState } from "react";

const STAFF_PIN = "HOMA2026";

const STAFF_EMAILS = [
  "homahealthcarecenter@gmail.com", // ✅ you (seen in screenshot)
  "homahealthcaredavid@gmail.com", // ✅ David (you confirmed)
  "sidduchintham951@gmail.com", // ✅ Siddhu (seen in screenshot)
  "sadan.kudikala@gmail.com", // ✅ Sadan (seen in screenshot)
  "suresh06nayak@gmail.com", // ✅ Suresh (you confirmed)
];

export default function LabRedeemPage() {
  const { isLoaded, user } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [serial, setSerial] = useState("");
  const [patientName, setPatientName] = useState("");
  const [amount, setAmount] = useState("");
  const [verified, setVerified] = useState(false);

  function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pin === STAFF_PIN) {
      setPinError("");
      setIsAuthenticated(true);
      return;
    }
    setPinError("Invalid PIN");
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setPin("");
    setPinError("");
    setSerial("");
    setPatientName("");
    setAmount("");
    setVerified(false);
  }

  function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVerified(true);
  }

  const staffEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "";
  const isStaff = STAFF_EMAILS.includes(staffEmail);

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1b33] px-4 text-white">
        <p className="text-lg font-semibold">Checking staff access…</p>
      </main>
    );
  }

  if (!isStaff) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1b33] px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-red-600 p-6 text-white shadow-xl">
          <p className="text-xl font-bold">Access Denied. You are not HOMA Staff.</p>
          <a
            href="/coins"
            className="mt-6 block w-full rounded-xl bg-white px-4 py-4 text-center text-lg font-bold text-[#0b1b33]"
          >
            Return to Coins
          </a>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1b33] px-4 py-10 text-white">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-[#0b1b33] shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#16a34a]">
            HOMA Lab
          </p>
          <h1 className="mt-2 text-2xl font-bold">HOMA Staff Portal</h1>
          <form onSubmit={handleUnlock} className="mt-6 space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              placeholder="Enter Staff PIN"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#16a34a]"
            />
            {pinError ? (
              <p className="text-sm font-semibold text-red-600">{pinError}</p>
            ) : null}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#16a34a] px-4 py-4 text-lg font-bold text-white"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1b33] px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-white px-4 py-2 text-sm font-semibold text-white"
          >
            Log Out
          </button>
        </div>
        <div className="rounded-2xl bg-white p-6 text-[#0b1b33] shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#16a34a]">
            HOMA Lab
          </p>
          <h1 className="mt-2 text-2xl font-bold">Staff Redeem</h1>

          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium" htmlFor="serial">
                Enter 6-digit Patient Serial Number
              </label>
              <input
                id="serial"
                name="serial"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={serial}
                onChange={(event) => setSerial(event.target.value)}
                placeholder="Enter 6-digit Patient Serial Number"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#16a34a]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="patientName">
                Patient Name
              </label>
              <input
                id="patientName"
                name="patientName"
                type="text"
                required
                value={patientName}
                onChange={(event) => setPatientName(event.target.value)}
                placeholder="Patient Name"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#16a34a]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="amount">
                Amount Collected (e.g., 400)
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                required
                min={0}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Amount Collected (e.g., 400)"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-[#16a34a]"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#16a34a] px-4 py-4 text-lg font-bold text-white"
            >
              Verify & Receive Sample
            </button>
          </form>

          {verified ? (
            <div className="mt-6 rounded-xl bg-[#16a34a] p-5 text-lg font-bold leading-relaxed text-white">
              ✅ SUCCESS! ₹100 Discount applied for {patientName}. Please collect ₹
              {amount} and draw blood.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
