import { useState } from "react";

/**
 * Lookbook grid that hides any image which fails to load, and hides the whole
 * section if none are present yet. Wire filenames now; drop the files in later.
 */
export function Gallery({ title, images }: { title: string; images: string[] }) {
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const visible = images.filter((s) => !failed.has(s));
  if (visible.length === 0) return null;

  return (
    <section className="detail-gallery">
      <h2 className="h2 reveal">{title}</h2>
      <div className="gallery-grid">
        {visible.map((src, i) => (
          <img
            key={src}
            className="gallery-img reveal"
            src={src}
            alt={`${title} — image ${i + 1}`}
            decoding="async"
            onError={() => setFailed((f) => new Set(f).add(src))}
          />
        ))}
      </div>
    </section>
  );
}
