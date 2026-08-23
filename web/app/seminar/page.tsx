"use client";
import { useState } from "react";

export default function SeminarPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/seminar-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendee_name: name, phone_number: phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Booking failed. Please try again.");
      } else {
        setBookingId(data.booking_id);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (bookingId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full text-center bg-white border-2 rounded-2xl p-8 shadow-lg" style={{ borderColor: "#d4af37" }}>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#1e40af" }}>
            You're booked!
          </h1>
          <p className="text-lg mb-1">
            Booking ID: <span className="font-semibold">{bookingId}</span>
          </p>
          <p className="text-slate-600 mb-4">See you at 7 PM.</p>
          <a href="https://meet.google.com/epb-fcdg-qqw" target="_blank" rel="noopener noreferrer" className="inline-block w-full py-2.5 rounded-lg font-semibold text-white transition" style={{ backgroundColor: "#1e40af" }}>
            Join Seminar on Google Meet
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "#1e40af" }}>
        HOMA Metabolic Health Seminar
      </h1>
      <p className="text-center mb-8" style={{ color: "#d4af37" }}>
        Every Evening, 7:00 PM - 20 Minutes
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-4 border" style={{ borderColor: "#d4af37" }}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2" placeholder="Your full name" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2" placeholder="10-digit mobile number" />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg font-semibold text-white transition disabled:opacity-60" style={{ backgroundColor: "#1e40af" }}>
          {loading ? "Booking..." : "Join Seminar"}
        </button>
      </form>
    </div>
  );
}