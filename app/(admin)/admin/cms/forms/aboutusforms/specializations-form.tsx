"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AboutUsSpecialization } from "@prisma/client"
import { createSpecialization, deleteSpecialization } from "@/actions/static/aboutus/specializations"
import { updateSpecialization } from "@/actions/static/aboutus/specializations"

interface SpecializationsFormProps {
  initialSpecializations: AboutUsSpecialization[]
}

export function SpecializationsForm({ initialSpecializations }: SpecializationsFormProps) {
  const [specializations, setSpecializations] = useState(initialSpecializations)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [editSpec, setEditSpec] = useState<Partial<AboutUsSpecialization> | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [newSpec, setNewSpec] = useState({
    title: "",
  })

  function startEdit(idx: number) {
    setEditIdx(idx)
    setEditSpec({ ...specializations[idx] })
  }

  function cancelEdit() {
    setEditIdx(null)
    setEditSpec(null)
  }

  async function handleUpdate(id: string) {
    if (!editSpec) return
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await updateSpecialization(id, editSpec)
      setSpecializations(specializations.map(s => s.id === id ? { ...s, ...editSpec } : s))
      setMessage("Specialization updated successfully.")
      cancelEdit()
    } catch {
      setError("Failed to update specialization.")
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd() {
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      const created = await createSpecialization(newSpec)
      if (created) setSpecializations([...specializations, created])
      setNewSpec({ title: "" })
      setMessage("Specialization added successfully.")
    } catch {
      setError("Failed to add specialization.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await deleteSpecialization(id)
      setSpecializations(specializations.filter(s => s.id !== id))
      setMessage("Specialization deleted successfully.")
    } catch {
      setError("Failed to delete specialization.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Specializations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {specializations.map((spec, idx) => (
              <tr key={spec.id} className="border-b">
                {editIdx === idx ? (
                  <>
                    <td className="border px-2 py-1"><Input value={editSpec?.title ?? ""} onChange={e => setEditSpec({ ...editSpec, title: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" onClick={() => handleUpdate(spec.id)} disabled={loading}>Save</Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit} disabled={loading}>Cancel</Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-1">{spec.title}</td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => startEdit(idx)} disabled={loading}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(spec.id)} disabled={loading}>Delete</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mb-2 mt-4">
        <Input value={newSpec.title} onChange={e => setNewSpec({ ...newSpec, title: e.target.value })} placeholder="Title" disabled={loading} />
        <Button onClick={handleAdd} disabled={loading}>Add Specialization</Button>
      </div>
      {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  )
} 