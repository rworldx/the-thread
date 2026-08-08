import { titles, posterOf } from "@/content/build";

/**
 * Title ids from an editor's note, resolved to what the note needs to render.
 *
 * A missing id is DROPPED rather than thrown on, because a note that names five
 * titles should still show four if one is renamed mid-edit — and B21 fails the
 * build for the missing one anyway, which is the right place to be loud.
 */
export function mentionsOf(ids: readonly string[]) {
  const byId = new Map(titles.map((t) => [t.id, t]));
  return ids.flatMap((id) => {
    const t = byId.get(id);
    return t
      ? [{ id: t.id, titleEn: t.titleEn, titleAr: t.titleAr, poster: posterOf(t.id) }]
      : [];
  });
}
