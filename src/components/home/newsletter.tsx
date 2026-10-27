"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { Reveal } from "@/components/reveal";

const img =
  "https://images.pexels.com/photos/38946831/pexels-photo-38946831.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=1400";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong");
        return;
      }
      setState("done");
      setMessage(data.message ?? "You're in.");
    } catch {
      setState("error");
      setMessage("Network error — please try again.");
    }
  };

  return (
    <section id="newsletter" className="mx-auto max-w-7xl px-4 pb-20 lg:px-6">
      <Reveal>
        <div className="grain relative overflow-hidden rounded-[28px] bg-forest-950 shadow-lift">
          <Image
            src={img}
            alt="Gold watch on deep green fabric"
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/80 to-forest-900/40" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

          <div className="relative z-[2] grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-400">
                <Mail className="h-4 w-4" /> Stay Ahead of Time
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium leading-tight text-cream-50 sm:text-4xl">
                Join Our Newsletter
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-50/65">
                Subscribe for early access to new arrivals, private sales and the occasional
                horological love letter. Straight to your inbox — never spam.
              </p>
            </div>

            {state === "done" ? (
              <div className="flex items-center gap-4 rounded-2xl border border-gold-500/40 bg-forest-900/80 p-6 backdrop-blur">
                <CheckCircle2 className="h-8 w-8 shrink-0 text-gold-400" />
                <div>
                  <p className="font-display text-lg text-cream-50">Welcome to the club.</p>
                  <p className="text-sm text-cream-50/60">{message}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="w-full">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    aria-label="Email address"
                    className="w-full rounded-full border border-cream-50/20 bg-forest-900/60 px-6 py-3.5 text-sm text-cream-50 placeholder:text-cream-50/40 backdrop-blur transition focus:border-gold-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-300 disabled:opacity-70"
                  >
                    {state === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Subscribe
                  </button>
                </div>
                {state === "error" && (
                  <p className="mt-3 text-xs text-red-300">{message}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
