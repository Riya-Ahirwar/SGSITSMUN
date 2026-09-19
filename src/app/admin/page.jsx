"use client";
import { useEffect, useState } from "react";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminPanel() {
  const [tab, setTab] = useState("editions");

  return (
    <div className="min-h-screen bg-cream px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl text-navy mb-6">Admin Panel</h1>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("editions")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              tab === "editions" ? "bg-navy text-cream" : "bg-navy/10 text-navy"
            }`}
          >
            Past Editions
          </button>
          <button
            onClick={() => setTab("secretariat")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              tab === "secretariat" ? "bg-navy text-cream" : "bg-navy/10 text-navy"
            }`}
          >
            Secretariat
          </button>
        </div>

        {tab === "editions" ? <EditionsTab /> : <SecretariatTab />}
      </div>
    </div>
  );
}

function EditionsTab() {
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", year: "", theme: "", summary: "" });
  const [selectedId, setSelectedId] = useState("");
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/past-editions");
    const data = await res.json();
    setEditions(data);
    setLoading(false);
    if (data.length && !selectedId) setSelectedId(data[0]._id);
  }

  useEffect(() => {
    load();
  }, []);

  async function createEdition(e) {
    e.preventDefault();
    setStatus("Creating…");
    const res = await fetch("/api/past-editions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, year: Number(form.year) }),
    });
    if (res.ok) {
      setForm({ title: "", year: "", theme: "", summary: "" });
      setStatus("Edition created.");
      await load();
    } else {
      setStatus("Failed to create edition.");
    }
  }

  async function uploadPhotos(e) {
    e.preventDefault();
    if (!selectedId || files.length === 0) return;
    setStatus(`Uploading 0/${files.length}…`);
    for (let i = 0; i < files.length; i++) {
      const base64 = await fileToBase64(files[i]);
      await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64, editionId: selectedId }),
      });
      setStatus(`Uploading ${i + 1}/${files.length}…`);
    }
    setStatus("Done. Photos uploaded.");
    setFiles([]);
  }

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={createEdition} className="border border-navy/15 rounded-2xl p-6 flex flex-col gap-3">
        <h2 className="font-semibold text-navy">Add a past edition</h2>
        <input
          placeholder="Title (e.g. SGSITS MUN 2025)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border border-navy/20 rounded-lg px-3 py-2"
          required
        />
        <input
          placeholder="Year (e.g. 2025)"
          type="number"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="border border-navy/20 rounded-lg px-3 py-2"
          required
        />
        <input
          placeholder="Theme (optional)"
          value={form.theme}
          onChange={(e) => setForm({ ...form, theme: e.target.value })}
          className="border border-navy/20 rounded-lg px-3 py-2"
        />
        <textarea
          placeholder="Short summary (optional)"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="border border-navy/20 rounded-lg px-3 py-2"
          rows={3}
        />
        <button type="submit" className="bg-navy text-cream rounded-lg py-2 font-semibold">
          Create edition
        </button>
      </form>

      <form onSubmit={uploadPhotos} className="border border-navy/15 rounded-2xl p-6 flex flex-col gap-3">
        <h2 className="font-semibold text-navy">Upload photos to an edition</h2>
        {loading ? (
          <p className="text-sm text-navy/60">Loading editions…</p>
        ) : editions.length === 0 ? (
          <p className="text-sm text-navy/60">No editions yet — create one above first.</p>
        ) : (
          <>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="border border-navy/20 rounded-lg px-3 py-2"
            >
              {editions.map((ed) => (
                <option key={ed._id} value={ed._id}>
                  {ed.title} ({ed.year})
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="text-sm"
            />
            <button type="submit" className="bg-navy text-cream rounded-lg py-2 font-semibold">
              Upload {files.length > 0 ? `${files.length} photo(s)` : ""}
            </button>
          </>
        )}
        {status && <p className="text-sm text-navy/70">{status}</p>}
      </form>
    </div>
  );
}

function SecretariatTab() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", role: "", quote: "", order: "" });
  const [status, setStatus] = useState("");
  const [photoFiles, setPhotoFiles] = useState({}); // memberId -> File

  async function load() {
    setLoading(true);
    const res = await fetch("/api/secretariat");
    const data = await res.json();
    setMembers(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addMember(e) {
    e.preventDefault();
    setStatus("Adding…");
    const res = await fetch("/api/secretariat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, order: form.order ? Number(form.order) : 0 }),
    });
    if (res.ok) {
      setForm({ name: "", role: "", quote: "", order: "" });
      setStatus("Member added.");
      await load();
    } else {
      setStatus("Failed to add member.");
    }
  }

  async function uploadPhoto(memberId) {
    const file = photoFiles[memberId];
    if (!file) return;
    setStatus("Uploading photo…");
    const base64 = await fileToBase64(file);
    await fetch("/api/secretariat/photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: base64, memberId }),
    });
    setStatus("Photo uploaded.");
    await load();
  }

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={addMember} className="border border-navy/15 rounded-2xl p-6 flex flex-col gap-3">
        <h2 className="font-semibold text-navy">Add a secretariat member</h2>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-navy/20 rounded-lg px-3 py-2"
          required
        />
        <input
          placeholder="Role (e.g. Secretary General)"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border border-navy/20 rounded-lg px-3 py-2"
          required
        />
        <input
          placeholder="Quote (optional)"
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          className="border border-navy/20 rounded-lg px-3 py-2"
        />
        <input
          placeholder="Display order (optional, lower = first)"
          type="number"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: e.target.value })}
          className="border border-navy/20 rounded-lg px-3 py-2"
        />
        <button type="submit" className="bg-navy text-cream rounded-lg py-2 font-semibold">
          Add member
        </button>
      </form>

      <div className="border border-navy/15 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-navy">Existing members — add photos</h2>
        {loading ? (
          <p className="text-sm text-navy/60">Loading…</p>
        ) : members.length === 0 ? (
          <p className="text-sm text-navy/60">No members yet — add one above.</p>
        ) : (
          members.map((m) => (
            <div key={m._id} className="flex items-center gap-4 border-b border-navy/10 pb-3">
              <div className="w-12 h-12 rounded-full bg-navy/10 overflow-hidden flex-shrink-0">
                {m.image?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image.url} alt={m.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{m.name}</p>
                <p className="text-xs text-navy/60">{m.role}</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPhotoFiles({ ...photoFiles, [m._id]: e.target.files[0] })
                }
                className="text-xs w-32"
              />
              <button
                onClick={() => uploadPhoto(m._id)}
                className="bg-navy text-cream rounded-lg px-3 py-1.5 text-xs font-semibold"
              >
                Upload
              </button>
            </div>
          ))
        )}
        {status && <p className="text-sm text-navy/70">{status}</p>}
      </div>
    </div>
  );
}
