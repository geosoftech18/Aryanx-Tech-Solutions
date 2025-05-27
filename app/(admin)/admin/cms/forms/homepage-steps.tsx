"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HomepageStep } from "@prisma/client";
import { updateSteps } from "@/actions/static/homepage/update-steps";

export function HomepageSteps({ initialSteps }: { initialSteps: HomepageStep[] }) {
  const [steps, setSteps] = useState(initialSteps);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  function handleChange(idx: number, field: string, value: string | number) {
    setSteps(steps.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await updateSteps(steps);
      setMessage("Steps updated successfully.");
    } catch {
      setError("Failed to update steps.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">Steps</h2>
      {steps.map((step, idx) => (
        <div key={step.id} className="flex gap-2 mb-2">
          <Input value={step.icon} onChange={e => handleChange(idx, "icon", e.target.value)} placeholder="Icon" />
          <Input value={step.title} onChange={e => handleChange(idx, "title", e.target.value)} placeholder="Title" />
          <Input value={step.description} onChange={e => handleChange(idx, "description", e.target.value)} placeholder="Description" />
        </div>
      ))}
      <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Steps"}</Button>
      {message && <div className="text-green-600 text-sm">{message}</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
} 