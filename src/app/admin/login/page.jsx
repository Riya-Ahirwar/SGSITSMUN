"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      window.location.href = "/admin";
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-cream rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">
        <h1 className="font-display text-2xl text-navy">Admin Login</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-navy/20 rounded-lg px-4 py-2 text-navy"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-navy text-cream rounded-lg py-2 font-semibold disabled:opacity-50"
        >
          {loading ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
