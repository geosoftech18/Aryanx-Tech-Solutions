"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AboutUsWhyChooseUsCard } from "@prisma/client"
import { createWhyChooseUsCard, updateWhyChooseUsCard, deleteWhyChooseUsCard } from "@/actions/static/aboutus/why-choose-us-cards"

interface WhyChooseUsCardsFormProps {
  initialWhyChooseUsCards: AboutUsWhyChooseUsCard[]
}

export function WhyChooseUsCardsForm({ initialWhyChooseUsCards }: WhyChooseUsCardsFormProps) {
  const [cards, setCards] = useState(initialWhyChooseUsCards)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [editCard, setEditCard] = useState<Partial<AboutUsWhyChooseUsCard> | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    icon: "Award",
  })

  function startEdit(idx: number) {
    setEditIdx(idx)
    setEditCard({ ...cards[idx] })
  }

  function cancelEdit() {
    setEditIdx(null)
    setEditCard(null)
  }

  async function handleUpdate(id: string) {
    if (!editCard) return
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await updateWhyChooseUsCard(id, editCard)
      setCards(cards.map(c => c.id === id ? { ...c, ...editCard } : c))
      setMessage("Card updated successfully.")
      cancelEdit()
    } catch {
      setError("Failed to update card.")
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd() {
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      const created = await createWhyChooseUsCard(newCard)
      if (created) setCards([...cards, created])
      setNewCard({ title: "", description: "", icon: "Award" })
      setMessage("Card added successfully.")
    } catch {
      setError("Failed to add card.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await deleteWhyChooseUsCard(id)
      setCards(cards.filter(c => c.id !== id))
      setMessage("Card deleted successfully.")
    } catch {
      setError("Failed to delete card.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Why Choose Us Cards</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Icon</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, idx) => (
              <tr key={card.id} className="border-b">
                {editIdx === idx ? (
                  <>
                    <td className="border px-2 py-1"><Input value={editCard?.title ?? ""} onChange={e => setEditCard({ ...editCard, title: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editCard?.description ?? ""} onChange={e => setEditCard({ ...editCard, description: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editCard?.icon ?? ""} onChange={e => setEditCard({ ...editCard, icon: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" onClick={() => handleUpdate(card.id)} disabled={loading}>Save</Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit} disabled={loading}>Cancel</Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-1">{card.title}</td>
                    <td className="border px-2 py-1">{card.description}</td>
                    <td className="border px-2 py-1">{card.icon}</td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => startEdit(idx)} disabled={loading}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(card.id)} disabled={loading}>Delete</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mb-2 mt-4">
        <Input value={newCard.title} onChange={e => setNewCard({ ...newCard, title: e.target.value })} placeholder="Title" disabled={loading} />
        <Input value={newCard.description} onChange={e => setNewCard({ ...newCard, description: e.target.value })} placeholder="Description" disabled={loading} />
        <Input value={newCard.icon} onChange={e => setNewCard({ ...newCard, icon: e.target.value })} placeholder="Icon (e.g. Award, UserCheck)" disabled={loading} />
        <Button onClick={handleAdd} disabled={loading}>Add Card</Button>
      </div>
      {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  )
} 