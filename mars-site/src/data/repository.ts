import type { AideDraft, SolutionRecord } from "../domain/model";

export interface PrototypeRepository {
  listSolutions(): Promise<SolutionRecord[]>;
  getSolution(id: string): Promise<SolutionRecord | undefined>;
  saveSolution(record: SolutionRecord): Promise<SolutionRecord>;
  saveAideDraft(draft: AideDraft): Promise<AideDraft>;
  resetUserData(): Promise<void>;
  exportUserData(): Promise<string>;
  importUserData(json: string): Promise<number>;
}

const DB = "york-ai-solutions-prototype";
const VERSION = 1;
const SOLUTIONS = "solutions";
const AIDE = "aideDrafts";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(SOLUTIONS)) db.createObjectStore(SOLUTIONS, { keyPath: "id" });
      if (!db.objectStoreNames.contains(AIDE)) db.createObjectStore(AIDE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function request<T>(store: string, mode: IDBTransactionMode, operation: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, mode);
    const result = operation(tx.objectStore(store));
    result.onsuccess = () => resolve(result.result);
    result.onerror = () => reject(result.error);
    tx.oncomplete = () => db.close();
  });
}

export class IndexedDbRepository implements PrototypeRepository {
  async listSolutions() { return request<SolutionRecord[]>(SOLUTIONS, "readonly", s => s.getAll()); }
  async getSolution(id: string) { return request<SolutionRecord | undefined>(SOLUTIONS, "readonly", s => s.get(id)); }
  async saveSolution(record: SolutionRecord) {
    const saved = { ...record, schemaVersion: 1 as const, source: "user" as const, updatedAt: new Date().toISOString() };
    await request<IDBValidKey>(SOLUTIONS, "readwrite", s => s.put(saved)); return saved;
  }
  async saveAideDraft(draft: AideDraft) { const saved = { ...draft, updatedAt: new Date().toISOString() }; await request<IDBValidKey>(AIDE, "readwrite", s => s.put(saved)); return saved; }
  async resetUserData() { await Promise.all([request<undefined>(SOLUTIONS, "readwrite", s => s.clear()), request<undefined>(AIDE, "readwrite", s => s.clear())]); }
  async exportUserData() { const [solutions, aideDrafts] = await Promise.all([this.listSolutions(), request<AideDraft[]>(AIDE, "readonly", s => s.getAll())]); return JSON.stringify({ schemaVersion: 1, solutions, aideDrafts }, null, 2); }
  async importUserData(json: string) {
    const parsed = JSON.parse(json) as { schemaVersion?: number; solutions?: SolutionRecord[] };
    if (parsed.schemaVersion !== 1 || !Array.isArray(parsed.solutions)) throw new Error("This is not a supported prototype export.");
    for (const record of parsed.solutions) { if (!record.id || !record.name) throw new Error("Every imported solution needs an ID and name."); await this.saveSolution(record); }
    return parsed.solutions.length;
  }
}

export const repository = new IndexedDbRepository();

// One-time, non-destructive migration of recognizable records from the former prototype.
export async function migrateLegacyData() {
  if (localStorage.getItem("york-ai-migration-v1")) return;
  for (const key of ["mars-inventory", "mars-plugin-records", "inventoryRecords"]) {
    try {
      const value = localStorage.getItem(key);
      if (!value) continue;
      const records = JSON.parse(value);
      if (Array.isArray(records)) for (const item of records) if (item.id && item.name && item.schemaVersion === 1) await repository.saveSolution(item);
    } catch { /* Invalid legacy data remains untouched in localStorage. */ }
  }
  localStorage.setItem("york-ai-migration-v1", new Date().toISOString());
}
