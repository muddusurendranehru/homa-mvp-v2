"use client";

import { FormEvent, useState } from "react";

export default function CoinsPage() {
  const [mobile, setMobile] = useState("");
  const [serial, setSerial] = useState("");
  const [claimed, setClaimed] = useState(false);

  function handleClaim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextSerial =
      String(Math.floor(Math.random() * 1000)).padStart(3, "0") +
      String(Math.floor(Math.random() * 1000)).padStart(3, "0");
    setSerial(nextSerial);
    setClaimed(true);
  }

  function startOver() {
    setMobile("");
    setSerial("");
    setClaimed(false);
  }

  const whatsappHref = `https://wa.me/919963721999?text=Hello%20HOMA%20Team%2C%20I%20claimed%20100%20Coins.%20My%20Mobile%20is%20${mobile}%20and%20my%20Serial%20Number%20is%20${serial}.%20Please%20activate%20it.`;

  return (
    <main className="min-h-screen bg-[#0b1b33] px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 text-[#0b1b33] shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#16a34a]">
          HOMA Healthcare
        </p>
        <h1 className="mt-2 text-2xl font-bold">Claim 100 Free HOMA Coins</h1>

        {claimed ? (
          <div className="mt-6 space-y-5">
            <p className="text-3xl font-bold text-[#0b1b33]">
              Your Code: {serial}
            </p>
            <p className="text-base leading-relaxed">
              Show this at the HOMA Lab to get ₹100 off your blood test.
            </p>
            <p className="text-base font-medium">Call us: 09963721999</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl bg-[#16a34a] px-4 py-4 text-center text-lg font-bold text-white"
            >
              WhatsApp HOMA Team
            </a>
            <button
              type="button"
              onClick={startOver}
              className="w-full rounded-xl border border-[#0b1b33] px-4 py-3 text-base font-semibold text-[#0b1b33]"
            >
              Start Over
            </button>
          </div>
        ) : (
          <form onSubmit={handleClaim} className="mt-6 space-y-4">
            <label className="block text-sm font-medium" htmlFor="mobile">
              Enter 10-digit Mobile Number
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              required
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="Enter 10-digit Mobile Number"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-[#0b1b33] outline-none focus:border-[#16a34a]"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-[#16a34a] px-4 py-4 text-lg font-bold text-white"
            >
              Claim 100 Free HOMA Coins
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
