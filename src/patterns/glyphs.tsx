import type { ReactNode } from 'react'

/**
 * Glyphs used in the patterns that are not in the HOT icon set. They are drawn exactly as in Figma:
 * 1.3 outline, on a 16px box (some are shifted inside a bigger frame, so each has its own viewBox).
 */
export const patternGlyphs = {
  // A person with a small question mark. The two parts sit at different spots inside the 16px box.
  unassigned: {
    box: '0 0 16 16',
    paths: [
      { d: 'M7.88816 8.98333H4.31672C3.38635 8.98333 2.92115 8.98333 2.54263 9.09813C1.69035 9.35667 1.02341 10.0237 0.764879 10.8759C0.650052 11.2545 0.650052 11.7196 0.650052 12.65M8.98338 3.65C8.98338 5.30685 7.64025 6.65 5.98339 6.65C4.32653 6.65 2.98339 5.30685 2.98339 3.65C2.98339 1.99315 4.32653 0.65 5.98339 0.65C7.64025 0.65 8.98338 1.99315 8.98338 3.65Z', at: [0.683, 1.35] },
      { d: 'M0.650177 1.65146C0.767644 1.3176 0.999511 1.036 1.30464 0.856664C1.60984 0.677264 1.96864 0.611729 2.31751 0.671596C2.66638 0.731396 2.98284 0.912796 3.21078 1.1836C3.43878 1.4544 3.56351 1.79713 3.56298 2.15113C3.56298 3.1504 2.06411 3.65 2.06411 3.65M2.08351 5.65H2.09018', at: [10.779, 7.35] },
    ],
  },
} as const

export type PatternGlyphName = keyof typeof patternGlyphs

export function isPatternGlyph(name: string): name is PatternGlyphName {
  return name in patternGlyphs
}

/** Draws one of the glyphs at 16px, in the current text colour. */
export function PatternGlyph({ name }: { name: PatternGlyphName }): ReactNode {
  const g = patternGlyphs[name]
  return (
    <svg width={16} height={16} viewBox={g.box} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {g.paths.map((p) => <path key={p.d.slice(0, 24)} d={p.d} transform={`translate(${p.at[0]} ${p.at[1]})`} />)}
    </svg>
  )
}
