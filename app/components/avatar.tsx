import Image from "next/image";
import { remoteSrc } from "@/image-loader";

/**
 * A CHARACTER, not the actor who played one.
 *
 * The distinction is the whole reason this component exists beside `Portrait`.
 * `Portrait` renders a TMDB actor still and belongs in the cast rail and on the
 * "played by" line, where the question really is "who performed this". Here the
 * question is "who is this", and the answer is artwork of the character.
 *
 * Explicit width/height rather than `fill`, for the same reason everything else
 * on this site does it: `fill` emits a load-bearing inline style, and a CSP
 * without `unsafe-inline` blocks style ATTRIBUTES with nothing thrown and
 * nothing logged.
 *
 * THE GAP IS DESIGNED. Eleven of the eighty-four have no artwork in any source
 * we use, and that is a real state rather than a bug. It renders a plate with
 * the character's initial set in the display face, the same treatment the
 * missing posters get. What it must never do is quietly substitute an actor's
 * face and let it pass as character art.
 */

/**
 * A SPLIT AVATAR, for a record that is a PERFORMANCE rather than a person.
 *
 * The three live-action Peters are the only records here that are half one
 * thing and half another: they are Spider-Man, and they are a specific man in
 * the suit. A single portrait can only say one of those. Two halves in one
 * frame say both at once, and say it before any label is read — which is the
 * job, because the label is the only thing distinguishing three records whose
 * names are otherwise identical.
 *
 * The character half comes first in reading order, so it leads in English and
 * mirrors correctly in Arabic without a second rule: the halves are laid out
 * with logical columns, so RTL flips them and the character still leads.
 */
export function SplitAvatar({
  characterSrc,
  actorSrc,
  name,
  priority = false,
}: {
  characterSrc: string | null;
  actorSrc: string | null;
  name: string;
  priority?: boolean;
}) {
  /* If either half is missing there is no split to make, and half a split
     avatar reads as a rendering fault rather than as a design. */
  if (!characterSrc || !actorSrc) {
    return <Avatar src={actorSrc ?? characterSrc} name={name} priority={priority} />;
  }
  /**
   * A WRAPPER PER HALF, and it is load-bearing.
   *
   * The cut and the push cannot live on the same element. `clip-path` is
   * applied in the element's own box and `transform` moves that box — so
   * pushing the actor's face toward its side pushed the WEDGE toward that side
   * too, straight off the frame. The first version showed one enormous
   * Spider-Man and a sliver of nothing.
   *
   * So the span carries the cut and holds still, and the image inside it does
   * the moving. Same two rules, no longer fighting.
   */
  return (
    <span className="avatar avatar-split">
      {[characterSrc, actorSrc].map((src, i) => (
        <span key={src} className={`avatar-half ${i === 0 ? "avatar-half-a" : "avatar-half-b"}`}>
          <Image
            src={remoteSrc(src, 342)}
        unoptimized
            alt=""
            width={320}
            height={480}
            sizes="(max-width: 48rem) 15vw, 80px"
            priority={priority}
            {...(priority
              ? {}
              : { loading: "lazy" as const, fetchPriority: "low" as const })}
          />
        </span>
      ))}
    </span>
  );
}

export function Avatar({
  src,
  name,
  priority = false,
}: {
  src: string | null;
  name: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <span className="avatar avatar-empty">
        <span className="avatar-initial" aria-hidden="true">
          {[...name][0] ?? ""}
        </span>
      </span>
    );
  }
  return (
    <span className="avatar">
      <Image
        src={remoteSrc(src, 342)}
        unoptimized
        alt=""
        width={320}
        height={480}
        sizes="(max-width: 48rem) 30vw, 160px"
        priority={priority}
        {...(priority ? {} : { loading: "lazy" as const, fetchPriority: "low" as const })}
      />
    </span>
  );
}
