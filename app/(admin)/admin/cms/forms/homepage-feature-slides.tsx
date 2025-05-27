"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFeatureSlide, updateFeatureSlide } from "@/actions/static/homepage/create-feature-slide";
import { deleteFeatureSlide } from "@/actions/static/homepage/delete-feature-slide";
import { HomepageFeatureSlide } from "@prisma/client";

export function HomepageFeatureSlides({ initialSlides }: { initialSlides: HomepageFeatureSlide[] }) {
  const [slides, setSlides] = useState(initialSlides);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editSlide, setEditSlide] = useState<Partial<HomepageFeatureSlide> | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newSlide, setNewSlide] = useState({ heading: "", subheading: "", description: "", buttonText: "", buttonLink: "", image: "" });

  function startEdit(idx: number) {
    setEditIdx(idx);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color: _color, ...rest } = slides[idx];
    setEditSlide({ ...rest });
  }

  function cancelEdit() {
    setEditIdx(null);
    setEditSlide(null);
  }

  async function handleUpdate(id: string) {
    if (!editSlide) return;
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const { heading, subheading, description, buttonText, buttonLink, image } = editSlide;
      await updateFeatureSlide(id, { heading, subheading, description, buttonText, buttonLink, image });
      setSlides(slides.map(s => s.id === id ? { ...s, ...editSlide } : s));
      setMessage("Slide updated successfully.");
      cancelEdit();
    } catch {
      setError("Failed to update slide.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const created = await createFeatureSlide({ ...newSlide, color: "from-emerald-600 to-teal-700" });
      if (created) setSlides([...slides, created]);
      setNewSlide({ heading: "", subheading: "", description: "", buttonText: "", buttonLink: "", image: "" });
      setMessage("Slide added successfully.");
    } catch {
      setError("Failed to add slide.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await deleteFeatureSlide(id);
      setSlides(slides.filter(s => s.id !== id));
      setMessage("Slide deleted successfully.");
    } catch {
      setError("Failed to delete slide.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Feature Slides</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Heading</th>
              <th className="border px-2 py-1">Subheading</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Button Text</th>
              <th className="border px-2 py-1">Button Link</th>
              <th className="border px-2 py-1">Image</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.map((slide, idx) => (
              <tr key={slide.id} className="border-b">
                {editIdx === idx ? (
                  <>
                    <td className="border px-2 py-1"><Input value={editSlide?.heading ?? ""} onChange={e => setEditSlide({ ...editSlide, heading: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editSlide?.subheading ?? ""} onChange={e => setEditSlide({ ...editSlide, subheading: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editSlide?.description ?? ""} onChange={e => setEditSlide({ ...editSlide, description: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editSlide?.buttonText ?? ""} onChange={e => setEditSlide({ ...editSlide, buttonText: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editSlide?.buttonLink ?? ""} onChange={e => setEditSlide({ ...editSlide, buttonLink: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1"><Input value={editSlide?.image ?? ""} onChange={e => setEditSlide({ ...editSlide, image: e.target.value })} disabled={loading} /></td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" onClick={() => handleUpdate(slide.id)} disabled={loading}>Save</Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit} disabled={loading}>Cancel</Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-1">{slide.heading}</td>
                    <td className="border px-2 py-1">{slide.subheading}</td>
                    <td className="border px-2 py-1">{slide.description}</td>
                    <td className="border px-2 py-1">{slide.buttonText}</td>
                    <td className="border px-2 py-1">{slide.buttonLink}</td>
                    <td className="border px-2 py-1">{slide.image}</td>
                    <td className="border px-2 py-1 flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => startEdit(idx)} disabled={loading}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(slide.id)} disabled={loading}>Delete</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mb-2 mt-4">
        <Input value={newSlide.heading} onChange={e => setNewSlide({ ...newSlide, heading: e.target.value })} placeholder="Heading" disabled={loading} />
        <Input value={newSlide.subheading} onChange={e => setNewSlide({ ...newSlide, subheading: e.target.value })} placeholder="Subheading" disabled={loading} />
        <Input value={newSlide.description} onChange={e => setNewSlide({ ...newSlide, description: e.target.value })} placeholder="Description" disabled={loading} />
        <Input value={newSlide.buttonText} onChange={e => setNewSlide({ ...newSlide, buttonText: e.target.value })} placeholder="Button Text" disabled={loading} />
        <Input value={newSlide.buttonLink} onChange={e => setNewSlide({ ...newSlide, buttonLink: e.target.value })} placeholder="Button Link" disabled={loading} />
        <Input value={newSlide.image} onChange={e => setNewSlide({ ...newSlide, image: e.target.value })} placeholder="Image" disabled={loading} />
        <Button onClick={handleAdd} disabled={loading}>Add Slide</Button>
      </div>
      {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  );
} 