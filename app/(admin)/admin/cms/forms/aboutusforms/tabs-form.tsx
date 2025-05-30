"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AboutUsTab } from "@prisma/client"
import { createTab, deleteTab } from "@/actions/static/aboutus/tabs"
import { updateTab } from "@/actions/static/aboutus/tabs"

interface TabsFormProps {
  initialTabs: AboutUsTab[]
}

export function TabsForm({ initialTabs }: TabsFormProps) {
  const [tabs, setTabs] = useState(initialTabs)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [editTab, setEditTab] = useState<Partial<AboutUsTab> | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [newTab, setNewTab] = useState({
    value: "",
    icon: "",
    title: "",
    description: "",
  })

  function startEdit(idx: number) {
    setEditIdx(idx)
    setEditTab({ ...tabs[idx] })
  }

  function cancelEdit() {
    setEditIdx(null)
    setEditTab(null)
  }

  async function handleUpdate(id: string) {
    if (!editTab) return
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await updateTab(id, editTab)
      setTabs(tabs.map(t => t.id === id ? { ...t, ...editTab } : t))
      setMessage("Tab updated successfully.")
      cancelEdit()
    } catch {
      setError("Failed to update tab.")
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd() {
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      const created = await createTab(newTab)
      if (created) setTabs([...tabs, created])
      setNewTab({ value: "", icon: "", title: "", description: "" })
      setMessage("Tab added successfully.")
    } catch {
      setError("Failed to add tab.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await deleteTab(id)
      setTabs(tabs.filter(t => t.id !== id))
      setMessage("Tab deleted successfully.")
    } catch {
      setError("Failed to delete tab.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Tabs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Value</th>
              <th className="border px-2 py-1">Icon</th>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tabs.map((tab, idx) => (
              <tr key={tab.id} className="border-b">
                {editIdx === idx ? (
                  <>
                    <td className="border px-2 py-1"><Input value={editTab?.value ?? ""} onChange={e => setEditTab({ ...editTab, value: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editTab?.icon ?? ""} onChange={e => setEditTab({ ...editTab, icon: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editTab?.title ?? ""} onChange={e => setEditTab({ ...editTab, title: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editTab?.description ?? ""} onChange={e => setEditTab({ ...editTab, description: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" onClick={() => handleUpdate(tab.id)} disabled={loading}>Save</Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit} disabled={loading}>Cancel</Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-1">{tab.value}</td>
                    <td className="border px-2 py-1">{tab.icon}</td>
                    <td className="border px-2 py-1">{tab.title}</td>
                    <td className="border px-2 py-1">{tab.description}</td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => startEdit(idx)} disabled={loading}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(tab.id)} disabled={loading}>Delete</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mb-2 mt-4">
        <Input value={newTab.value} onChange={e => setNewTab({ ...newTab, value: e.target.value })} placeholder="Value" disabled={loading} />
        <Input value={newTab.icon} onChange={e => setNewTab({ ...newTab, icon: e.target.value })} placeholder="Icon" disabled={loading} />
        <Input value={newTab.title} onChange={e => setNewTab({ ...newTab, title: e.target.value })} placeholder="Title" disabled={loading} />
        <Input value={newTab.description} onChange={e => setNewTab({ ...newTab, description: e.target.value })} placeholder="Description" disabled={loading} />
        <Button onClick={handleAdd} disabled={loading}>Add Tab</Button>
      </div>
      {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  )
} 