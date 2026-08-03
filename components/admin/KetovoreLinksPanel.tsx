"use client";

import { useEffect, useState } from "react";
import {
  emptyKetovoreLink,
  fetchKetovoreLinks,
  ketovoreLinkFields,
  saveKetovoreLinks,
  type KetovoreLink,
} from "@/lib/ketovoreLinks";

export default function KetovoreLinksPanel() {
  const [rows, setRows] = useState<KetovoreLink[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetchKetovoreLinks().then((data) => {
      setRows(data);
      setLoaded(true);
    });
  }, []);

  function addRow() {
    setRows((current) => [
      ...current,
      { ...emptyKetovoreLink, id: crypto.randomUUID() },
    ]);
    setSaveState("idle");
  }

  function updateRow(id: string, field: keyof KetovoreLink, value: string) {
    setRows((current) => current.map((row) => row.id === id ? { ...row, [field]: value } : row));
    setSaveState("idle");
  }

  function deleteRow(id: string) {
    if (!window.confirm("Delete this resource row?")) return;
    setRows((current) => current.filter((row) => row.id !== id));
    setSaveState("idle");
  }

  async function saveAll() {
    setSaveState("saving");
    const ok = await saveKetovoreLinks(rows);
    setSaveState(ok ? "saved" : "error");
  }

  if (!loaded) {
    return <div className="rounded-sm border border-black/15 bg-white p-6 text-sm text-black/60">Loading resource links…</div>;
  }

  return (
    <section className="rounded-sm border border-black/15 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/10 pb-5">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ba0a07]">Public directory</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase">Ketovore Links</h2>
          <p className="mt-2 text-sm text-black/55">Add one resource per row. Leave any platform link blank when it does not apply.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-black/45" role="status">
            {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : saveState === "error" ? "Save failed" : ""}
          </span>
          <button type="button" onClick={addRow} className="rounded-sm border border-black px-4 py-2 text-sm font-extrabold transition hover:bg-black hover:text-white">
            Add resource
          </button>
          <button type="button" onClick={saveAll} disabled={saveState === "saving"} className="rounded-sm bg-[#ba0a07] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-60">
            Save all changes
          </button>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="py-12 text-center text-sm text-black/50">No resources yet. Select “Add resource” to create the first row.</div>
      ) : (
        <div className="mt-6 space-y-6">
          {rows.map((row, index) => (
            <fieldset key={row.id} className="border border-black/15 bg-black/[0.02] p-4">
              <legend className="px-2 text-xs font-extrabold uppercase tracking-[0.15em] text-black/55">Resource {index + 1}</legend>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {ketovoreLinkFields.map((field) => (
                  <label key={field.key} className={field.key === "resource" ? "xl:col-span-2" : ""}>
                    <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-[0.12em] text-black/55">{field.label}</span>
                    <input
                      type={field.key === "resource" ? "text" : "url"}
                      value={row[field.key]}
                      onChange={(event) => updateRow(row.id, field.key, event.target.value)}
                      placeholder={field.key === "resource" ? "Name or account" : "https://"}
                      className="w-full rounded-sm border border-black/20 bg-white px-3 py-2.5 text-sm focus:border-[#ba0a07] focus:outline-none"
                    />
                  </label>
                ))}
              </div>
              <button type="button" onClick={() => deleteRow(row.id)} className="mt-4 text-sm font-extrabold text-[#ba0a07] underline underline-offset-4 transition hover:text-black">
                Delete resource
              </button>
            </fieldset>
          ))}
        </div>
      )}
    </section>
  );
}
