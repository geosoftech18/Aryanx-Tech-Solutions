"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateStats } from "@/actions/static/homepage/update-stats";
import { HomepageStat } from "@prisma/client";

export function HomepageStats({ initialStats }: { initialStats: HomepageStat[] }) {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleChange(idx: number, field: string, value: string | number) {
    setStats(stats.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await updateStats(stats);
      setMessage("Stats updated successfully.");
    } catch {
      setError("Failed to update stats.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">Stats</h2>
      {stats.map((stat, idx) => (
        <div key={stat.id} className="flex gap-2 mb-2">
          <Input type="number" value={stat.percentage} onChange={e => handleChange(idx, "percentage", Number(e.target.value))} placeholder="Percentage" disabled={loading} />
          <Input value={stat.description} onChange={e => handleChange(idx, "description", e.target.value)} placeholder="Description" disabled={loading} />
        </div>
      ))}
      <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Stats"}</Button>
      {message && <div className="text-green-600 text-sm">{message}</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
} 