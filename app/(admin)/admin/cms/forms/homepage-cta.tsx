"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateCta } from "@/actions/static/homepage/update-cta";
import { HomepageCta as HomepageCtaType } from "@prisma/client";

export function HomepageCta({ initialCta }: { initialCta: HomepageCtaType[] }) {
  const [cta, setCta] = useState(initialCta);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleChange(idx: number, field: string, value: string | number) {
    setCta(cta.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await updateCta(cta);
      setMessage("CTA updated successfully.");
    } catch {
      setError("Failed to update CTA.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">CTA</h2>
      {cta.map((c, idx) => (
        <div key={c.id} className="flex gap-2 mb-2">
          <Input value={c.title} onChange={e => handleChange(idx, "title", e.target.value)} placeholder="Title" disabled={loading} />
          <Input value={c.subtitle} onChange={e => handleChange(idx, "subtitle", e.target.value)} placeholder="Subtitle" disabled={loading} />
          <Input value={c.button1Text} onChange={e => handleChange(idx, "button1Text", e.target.value)} placeholder="Button 1 Text" disabled={loading} />
          <Input value={c.button1Link} onChange={e => handleChange(idx, "button1Link", e.target.value)} placeholder="Button 1 Link" disabled={loading} />
          <Input value={c.button2Text} onChange={e => handleChange(idx, "button2Text", e.target.value)} placeholder="Button 2 Text" disabled={loading} />
          <Input value={c.button2Link} onChange={e => handleChange(idx, "button2Link", e.target.value)} placeholder="Button 2 Link" disabled={loading} />
        </div>
      ))}
      <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update CTA"}</Button>
      {message && <div className="text-green-600 text-sm">{message}</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
} 