"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AboutUsTeamMember } from "@prisma/client"
import { deleteTeamMember, createTeamMember } from "@/actions/static/aboutus/team-members"
import { updateTeamMember } from "@/actions/static/aboutus/team-members"

interface TeamMembersFormProps {
  initialTeamMembers: AboutUsTeamMember[]
}

export function TeamMembersForm({ initialTeamMembers }: TeamMembersFormProps) {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [editMember, setEditMember] = useState<Partial<AboutUsTeamMember> | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    email: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    website: "",
  })

  function startEdit(idx: number) {
    setEditIdx(idx)
    setEditMember({ ...teamMembers[idx] })
  }

  function cancelEdit() {
    setEditIdx(null)
    setEditMember(null)
  }

  async function handleUpdate(id: string) {
    if (!editMember) return
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await updateTeamMember(id, editMember)
      setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, ...editMember } : m))
      setMessage("Team member updated successfully.")
      cancelEdit()
    } catch {
      setError("Failed to update team member.")
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd() {
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      const created = await createTeamMember(newMember)
      if (created) setTeamMembers([...teamMembers, created])
      setNewMember({ name: "", role: "", bio: "", image: "", email: "", linkedin: "", twitter: "", instagram: "", website: "" })
      setMessage("Team member added successfully.")
    } catch {
      setError("Failed to add team member.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await deleteTeamMember(id)
      setTeamMembers(teamMembers.filter(m => m.id !== id))
      setMessage("Team member deleted successfully.")
    } catch {
      setError("Failed to delete team member.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Team Members</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Bio</th>
              <th className="border px-2 py-1">Image</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">LinkedIn</th>
              <th className="border px-2 py-1">Twitter</th>
              <th className="border px-2 py-1">Instagram</th>
              <th className="border px-2 py-1">Website</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, idx) => (
              <tr key={member.id} className="border-b">
                {editIdx === idx ? (
                  <>
                    <td className="border px-2 py-1"><Input value={editMember?.name ?? ""} onChange={e => setEditMember({ ...editMember, name: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editMember?.role ?? ""} onChange={e => setEditMember({ ...editMember, role: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editMember?.bio ?? ""} onChange={e => setEditMember({ ...editMember, bio: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editMember?.image ?? ""} onChange={e => setEditMember({ ...editMember, image: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editMember?.email ?? ""} onChange={e => setEditMember({ ...editMember, email: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editMember?.linkedin ?? ""} onChange={e => setEditMember({ ...editMember, linkedin: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editMember?.twitter ?? ""} onChange={e => setEditMember({ ...editMember, twitter: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editMember?.instagram ?? ""} onChange={e => setEditMember({ ...editMember, instagram: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editMember?.website ?? ""} onChange={e => setEditMember({ ...editMember, website: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" onClick={() => handleUpdate(member.id)} disabled={loading}>Save</Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit} disabled={loading}>Cancel</Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-1">{member.name}</td>
                    <td className="border px-2 py-1">{member.role}</td>
                    <td className="border px-2 py-1">{member.bio}</td>
                    <td className="border px-2 py-1">{member.image}</td>
                    <td className="border px-2 py-1">{member.email}</td>
                    <td className="border px-2 py-1">{member.linkedin}</td>
                    <td className="border px-2 py-1">{member.twitter}</td>
                    <td className="border px-2 py-1">{member.instagram}</td>
                    <td className="border px-2 py-1">{member.website}</td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => startEdit(idx)} disabled={loading}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)} disabled={loading}>Delete</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mb-2 mt-4">
        <Input value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} placeholder="Name" disabled={loading} />
        <Input value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })} placeholder="Role" disabled={loading} />
        <Input value={newMember.bio} onChange={e => setNewMember({ ...newMember, bio: e.target.value })} placeholder="Bio" disabled={loading} />
        <Input value={newMember.image} onChange={e => setNewMember({ ...newMember, image: e.target.value })} placeholder="Image" disabled={loading} />
        <Input value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })} placeholder="Email" disabled={loading} />
        <Input value={newMember.linkedin} onChange={e => setNewMember({ ...newMember, linkedin: e.target.value })} placeholder="LinkedIn" disabled={loading} />
        <Input value={newMember.twitter} onChange={e => setNewMember({ ...newMember, twitter: e.target.value })} placeholder="Twitter" disabled={loading} />
        <Input value={newMember.instagram} onChange={e => setNewMember({ ...newMember, instagram: e.target.value })} placeholder="Instagram" disabled={loading} />
        <Input value={newMember.website} onChange={e => setNewMember({ ...newMember, website: e.target.value })} placeholder="Website" disabled={loading} />
        <Button onClick={handleAdd} disabled={loading}>Add Member</Button>
      </div>
      {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  )
} 