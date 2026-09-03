import { useCallback, useEffect, useState } from "react";
import {
  loadDraft,
  saveDraft,
  type Draft,
  type ItemAnswer,
} from "./reconveneDraft";

// Shared draft state. Every explorer and the ballot read and write the same
// local draft, so a visitor can review a few cards anywhere, leave, and come
// back to the ballot with their answers intact.
export function useReconveneDraft() {
  const [draft, setDraft] = useState<Draft>(() => loadDraft());

  // Pick up edits made in another tab.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "reconvene34.draft.v1") setDraft(loadDraft());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = useCallback((mutate: (d: Draft) => Draft) => {
    setDraft((prev) => saveDraft(mutate(prev)));
  }, []);

  const setOriginal = useCallback(
    (n: number, a: ItemAnswer) =>
      update((d) => ({ ...d, original: { ...d.original, [String(n)]: a } })),
    [update]
  );

  const setProposed = useCallback(
    (n: number, a: ItemAnswer) =>
      update((d) => ({ ...d, proposed: { ...d.proposed, [String(n)]: a } })),
    [update]
  );

  const answerOf = useCallback(
    (set: "original" | "proposed", n: number): ItemAnswer =>
      draft[set][String(n)] ?? {},
    [draft]
  );

  return { draft, update, setOriginal, setProposed, answerOf };
}
