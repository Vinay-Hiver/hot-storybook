import type { HTMLAttributes } from 'react'
import './Pill.css'

export type PillStatus = 'upcoming' | 'due' | 'overdue' | 'done'
export type PillKind = 'frt' | 'rt'

export type PillProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Which time the pill is about: first response time (`frt`) or resolution time (`rt`). */
  kind: PillKind
  /** Where that time stands. Sets the colour. */
  status: PillStatus
}

const labels: Record<PillKind, string> = { frt: 'FRT', rt: 'RT' }
const names: Record<PillKind, string> = { frt: 'First response time', rt: 'Resolution time' }

export function Pill({ kind, status, className, ...rest }: PillProps) {
  return (
    <span className={['hot-pill', `hot-pill--${status}`, className].filter(Boolean).join(' ')} role="img" aria-label={`${names[kind]}: ${status}`} {...rest}>
      {/* The bolt is not in the HOT icon set, so it is drawn here exactly as in Figma. */}
      <svg className="hot-pill__icon" width={12} height={12} viewBox="0 0 12 12" fill="currentColor" stroke="currentColor" strokeWidth={0.942857} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6.5 1L2.04672 6.34395C1.87231 6.5532 1.78511 6.65785 1.78378 6.74625C1.78262 6.82305 1.81686 6.89615 1.87662 6.94445C1.94536 7 2.08158 7 2.35401 7H6L5.5 11L9.95325 5.65605C10.1276 5.4468 10.2148 5.34215 10.2162 5.25375C10.2173 5.17695 10.1831 5.10385 10.1233 5.05555C10.0546 5 9.9184 5 9.646 5H6L6.5 1Z" />
      </svg>
      <span aria-hidden="true">{labels[kind]}</span>
    </span>
  )
}
