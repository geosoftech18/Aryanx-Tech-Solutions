"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AboutUsStat } from "@prisma/client"
import { createStat, deleteStat } from "@/actions/static/aboutus/stats"
import { updateStat } from "@/actions/static/aboutus/stats"

interface StatsFormProps {
  initialStats: AboutUsStat[]
}

export function StatsForm({ initialStats }: StatsFormProps) {
  const [stats, setStats] = useState(initialStats)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [editStat, setEditStat] = useState<Partial<AboutUsStat> | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [newStat, setNewStat] = useState({
    label: "",
    value: 0,
  })

  function startEdit(idx: number) {
    setEditIdx(idx)
    setEditStat({ ...stats[idx] })
  }

  function cancelEdit() {
    setEditIdx(null)
    setEditStat(null)
  }

  async function handleUpdate(id: string) {
    if (!editStat) return
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await updateStat(id, editStat)
      setStats(stats.map(s => s.id === id ? { ...s, ...editStat } : s))
      setMessage("Stat updated successfully.")
      cancelEdit()
    } catch {
      setError("Failed to update stat.")
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd() {
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      const created = await createStat(newStat)
      if (created) setStats([...stats, created])
      setNewStat({ label: "", value: 0 })
      setMessage("Stat added successfully.")
    } catch {
      setError("Failed to add stat.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await deleteStat(id)
      setStats(stats.filter(s => s.id !== id))
      setMessage("Stat deleted successfully.")
    } catch {
      setError("Failed to delete stat.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Stats</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Label</th>
              <th className="border px-2 py-1">Value</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, idx) => (
              <tr key={stat.id} className="border-b">
                {editIdx === idx ? (
                  <>
                    <td className="border px-2 py-1"><Input value={editStat?.label ?? ""} onChange={e => setEditStat({ ...editStat, label: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input type="number" value={editStat?.value ?? 0} onChange={e => setEditStat({ ...editStat, value: Number(e.target.value) })} disabled={loading} /></td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" onClick={() => handleUpdate(stat.id)} disabled={loading}>Save</Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit} disabled={loading}>Cancel</Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-1">{stat.label}</td>
                    <td className="border px-2 py-1">{stat.value}</td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => startEdit(idx)} disabled={loading}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(stat.id)} disabled={loading}>Delete</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mb-2 mt-4">
        <Input value={newStat.label} onChange={e => setNewStat({ ...newStat, label: e.target.value })} placeholder="Label" disabled={loading} />
        <Input type="number" value={newStat.value} onChange={e => setNewStat({ ...newStat, value: Number(e.target.value) })} placeholder="Value" disabled={loading} />
        <Button onClick={handleAdd} disabled={loading}>Add Stat</Button>
      </div>
      {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  )
} 