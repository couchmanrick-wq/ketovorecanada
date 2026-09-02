"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const platformFields = [
  { name: "website", label: "Website" },
  { name: "youtube", label: "YouTube" },
  { name: "tiktok", label: "TikTok" },
  { name: "facebook", label: "Facebook page" },
  { name: "instagram", label: "Instagram" },
  { name: "podcast", label: "Apple Podcast" },
  { name: "spotifyPodcast", label: "Spotify Podcast" },
] as const;

export default function LinkSuggestionForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/ketovore-link-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Unable to submit suggestion");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5" aria-label="Link directory suggestion form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="suggestion-name" className="text-xs font-extrabold uppercase tracking-[0.16em]">
            Your name <span className="text-black/45">(optional)</span>
          </label>
          <input
            id="suggestion-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            className="mt-2 w-full border-2 border-black bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ba0a07] focus:ring-offset-2"
          />
        </div>
        <div>
          <label htmlFor="suggestion-email" className="text-xs font-extrabold uppercase tracking-[0.16em]">
            Email <span className="text-black/45">(optional)</span>
          </label>
          <input
            id="suggestion-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            className="mt-2 w-full border-2 border-black bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ba0a07] focus:ring-offset-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="suggestion-resource" className="text-xs font-extrabold uppercase tracking-[0.16em]">
          Resource Name <span className="text-black/45">(optional)</span>
        </label>
        <input
          id="suggestion-resource"
          name="resource"
          type="text"
          maxLength={160}
          placeholder="Who or what should we add or update?"
          className="mt-2 w-full border-2 border-black bg-white px-4 py-3 text-sm placeholder:text-black/45 focus:outline-none focus:ring-2 focus:ring-[#ba0a07] focus:ring-offset-2"
        />
      </div>

      <fieldset className="grid gap-3 border-0 p-0">
        <legend className="sr-only">Resource links</legend>
        {platformFields.map((field) => (
          <div key={field.name} className="grid gap-2 sm:grid-cols-[150px_1fr] sm:items-center">
            <label htmlFor={`suggestion-${field.name}`} className="text-xs font-extrabold uppercase tracking-[0.12em]">
              {field.label} <span className="text-black/45">(optional)</span>
            </label>
            <input
              id={`suggestion-${field.name}`}
              name={field.name}
              type="url"
              maxLength={2048}
              placeholder="https://"
              className="w-full border-2 border-black bg-white px-4 py-3 text-sm placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-[#ba0a07] focus:ring-offset-2"
            />
          </div>
        ))}
      </fieldset>

      <div>
        <label htmlFor="suggestion-note" className="text-xs font-extrabold uppercase tracking-[0.16em]">
          Add a Note <span className="text-black/45">(optional)</span>
        </label>
        <textarea
          id="suggestion-note"
          name="note"
          rows={5}
          maxLength={2000}
          placeholder="Share any helpful details about this addition or change."
          className="mt-2 w-full resize-y border-2 border-black bg-white px-4 py-3 text-sm placeholder:text-black/45 focus:outline-none focus:ring-2 focus:ring-[#ba0a07] focus:ring-offset-2"
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="suggestion-company">Company</label>
        <input id="suggestion-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-[#ba0a07] px-6 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#ba0a07] focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send suggestion"}
        </button>
        <p className="text-sm font-bold" role="status" aria-live="polite">
          {status === "success" && <span className="text-green-700">Thanks! Your suggestion has been received.</span>}
          {status === "error" && <span className="text-[#ba0a07]">Something went wrong. Please try again.</span>}
        </p>
      </div>
    </form>
  );
}
