# NIL — The Label · Lookbook images

Drop your fashion photos in this folder to populate the **Lookbook** on the
`NIL — The Label` project page (`/work/nil-label`).

## How
- Name the files **`fashion-01.jpg` … `fashion-12.jpg`** (JPG or PNG — if PNG,
  tell me and I'll switch the extensions in `src/data/projects.ts`).
- You can add fewer than 12 — any missing slot is hidden automatically, and the
  whole Lookbook section stays invisible until at least one image is present.
- Recommended: portrait-ish crops look best (the grid uses a 4:5 aspect).
- Then `git add public/fashion && git commit && git push` — it auto-deploys.

To change the number of slots or the filenames, edit the `gallery` array on the
`nil-label` record in `src/data/projects.ts`.
