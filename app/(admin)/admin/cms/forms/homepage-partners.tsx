"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPartner, updatePartner } from "@/actions/static/homepage/create-partner";
import { deletePartner } from "@/actions/static/homepage/delete-partner";
import { Partner } from "@prisma/client";

export function HomepagePartners({ initialPartners }: { initialPartners: Partner[] }) {
  const [partners, setPartners] = useState(initialPartners);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editPartner, setEditPartner] = useState<Partial<Partner> | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newPartner, setNewPartner] = useState({ name: "", logoUrl: "", website: "" });

  function startEdit(idx: number) {
    setEditIdx(idx);
    setEditPartner({ ...partners[idx] });
  }

  function cancelEdit() {
    setEditIdx(null);
    setEditPartner(null);
  }

  async function handleUpdate(id: string) {
    if (!editPartner) return;
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const { name, logoUrl, website } = editPartner;
      await updatePartner(id, { name, logoUrl, website });
      setPartners(partners.map(p => p.id === id ? { ...p, ...editPartner } : p));
      setMessage("Partner updated successfully.");
      cancelEdit();
    } catch {
      setError("Failed to update partner.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const created = await createPartner(newPartner);
      if (created) setPartners([...partners, created]);
      setNewPartner({ name: "", logoUrl: "", website: "" });
      setMessage("Partner added successfully.");
    } catch {
      setError("Failed to add partner.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await deletePartner(id);
      setPartners(partners.filter(p => p.id !== id));
      setMessage("Partner deleted successfully.");
    } catch {
      setError("Failed to delete partner.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Partners</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Logo URL</th>
              <th className="border px-2 py-1">Website</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner, idx) => (
              <tr key={partner.id} className="border-b">
                {editIdx === idx ? (
                  <>
                    <td className="border px-2 py-1"><Input value={editPartner?.name ?? ""} onChange={e => setEditPartner({ ...editPartner, name: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editPartner?.logoUrl ?? ""} onChange={e => setEditPartner({ ...editPartner, logoUrl: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editPartner?.website ?? ""} onChange={e => setEditPartner({ ...editPartner, website: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" onClick={() => handleUpdate(partner.id)} disabled={loading}>Save</Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit} disabled={loading}>Cancel</Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-1">{partner.name}</td>
                    <td className="border px-2 py-1">{partner.logoUrl}</td>
                    <td className="border px-2 py-1">{partner.website}</td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => startEdit(idx)} disabled={loading}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(partner.id)} disabled={loading}>Delete</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mb-2 mt-4">
        <Input value={newPartner.name} onChange={e => setNewPartner({ ...newPartner, name: e.target.value })} placeholder="Name" disabled={loading} />
        <Input value={newPartner.logoUrl} onChange={e => setNewPartner({ ...newPartner, logoUrl: e.target.value })} placeholder="Logo URL" disabled={loading} />
        <Input value={newPartner.website} onChange={e => setNewPartner({ ...newPartner, website: e.target.value })} placeholder="Website" disabled={loading} />
        <Button onClick={handleAdd} disabled={loading}>Add Partner</Button>
      </div>
      {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  );
} 