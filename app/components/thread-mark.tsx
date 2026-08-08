/**
 * THE MARK — nodes, and the thread through them.
 *
 * This is the logo, and it is the site's own diagram: a red thread descending
 * through titles in the order you have to watch them, with two prerequisites
 * merging into one film partway down. That junction is not decoration — it is
 * literally what every path page here draws.
 *
 * TWO GEOMETRIES, AND THE SECOND ONE IS NOT A COMPROMISE.
 *
 * The full mark has five nodes. At 16px — which is what a browser tab actually
 * is — a 6-unit radius on a 64-unit grid lands at a ring a pixel and a half
 * across, five times over, and the whole thing turns to soup. So the tab gets
 * a three-node reduction: the same thread, the same alternation of red ends
 * and ink middle, drawn with room to be seen.
 *
 * THE RINGS ARE `currentColor`, which is what makes the mark work on both
 * grounds without a second file: white on the near-black surface, near-black
 * on the light one. Only the thread and the end nodes are fixed red, and that
 * red is `--color-red` — the site's single accent, not a new one.
 *
 * ONE SOURCE, SEVERAL OUTPUTS. `scripts/gen-icons.ts` imports these constants
 * to rasterise the PNG icons, and `app/[locale]/opengraph-image.tsx` imports
 * them for the social card, so there is no second drawing of the logo to keep
 * in sync.
 */

export interface MarkNode {
  cx: number;
  cy: number;
  red: boolean;
}

/**
 * FIVE NODES — the wordmark, the social card, the home-screen icon.
 *
 * Rows sit at 8/20/32/44/56 on a 64 grid, which is the widest even spread that
 * still keeps the outermost ring (radius 6 plus half of a 3.5 stroke) inside
 * the box. The first version bunched them at 9/24/32/45/57 and the middle
 * three collided — a mark has to be laid out on a rhythm, not placed by eye.
 */
export const MARK_NODES: MarkNode[] = [
  { cx: 38, cy: 8, red: true },
  { cx: 12, cy: 20, red: false },
  { cx: 52, cy: 32, red: false },
  { cx: 12, cy: 44, red: false },
  { cx: 38, cy: 56, red: true },
];

export const MARK_THREADS: string[] = [
  /* Down from the top node, then right into the third — the spine. */
  "M38 15.75 V27 Q38 32 43 32 H44.25",
  /* The second node joins it. The spine runs THROUGH this junction and carries
     on, which is why the two lines cross: one film, two things to watch first. */
  "M19.75 20 H38",
  /* Back left and down into the fourth. */
  "M44.25 32 H17 Q12 32 12 36.25",
  /* Right and down into the fifth, where the thread ends. */
  "M19.75 44 H33 Q38 44 38 48.25",
];

/** THREE NODES — the browser tab, at the size a browser tab really is. */
export const MARK_NODES_SMALL: MarkNode[] = [
  { cx: 44, cy: 12, red: true },
  { cx: 20, cy: 32, red: false },
  { cx: 44, cy: 52, red: true },
];

export const MARK_THREADS_SMALL: string[] = [
  "M44 20.25 V27 Q44 32 39 32 H27.75",
  "M20 39.75 V47 Q20 52 25 52 H36.25",
];

export const MARK_RED = "#e23636";
/** Radius and stroke are shared by both geometries, so weight reads the same. */
export const MARK_R = 6;
export const MARK_STROKE = 3.5;

export function ThreadMark({
  size = 32,
  small = false,
  className,
}: {
  size?: number;
  /** The three-node reduction. Use below about 24px. */
  small?: boolean;
  className?: string;
}) {
  const nodes = small ? MARK_NODES_SMALL : MARK_NODES;
  const threads = small ? MARK_THREADS_SMALL : MARK_THREADS;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      /* Decorative: the wordmark beside it is the accessible name, and a
         second reading of "The Thread" is noise in a screen reader. */
      aria-hidden="true"
      focusable="false"
    >
      {threads.map((d) => (
        <path
          key={d}
          d={d}
          stroke={MARK_RED}
          strokeWidth={MARK_STROKE}
          strokeLinecap="round"
          fill="none"
        />
      ))}
      {nodes.map((n) => (
        <circle
          key={`${n.cx}-${n.cy}`}
          cx={n.cx}
          cy={n.cy}
          r={MARK_R}
          stroke={n.red ? MARK_RED : "currentColor"}
          strokeWidth={MARK_STROKE}
          fill="none"
        />
      ))}
    </svg>
  );
}
