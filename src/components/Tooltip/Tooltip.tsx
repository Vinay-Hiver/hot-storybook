import { cloneElement, useEffect, useId, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import './Tooltip.css'

export type TooltipBubbleProps = {
  children: ReactNode
  className?: string
}

/** Just the dark bubble, with no positioning. */
export function TooltipBubble({ children, className }: TooltipBubbleProps) {
  return <span className={['hot-tooltip', className].filter(Boolean).join(' ')}>{children}</span>
}

export type TooltipProps = {
  /** The text shown in the bubble. */
  content: ReactNode
  /** The element the tooltip describes. It must accept `aria-describedby`. */
  children: ReactElement<{ 'aria-describedby'?: string }>
  /** Which side of the element the bubble appears on. */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Force it open or closed. Leave out to show on hover and keyboard focus. */
  open?: boolean
}

/** How long the pointer or focus must stay before the tooltip appears, in milliseconds. */
const SHOW_DELAY = 300

export function Tooltip({ content, children, placement = 'top', open }: TooltipProps) {
  const id = useId()
  const [hovered, setHovered] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const visible = open ?? hovered

  const show = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setHovered(true), SHOW_DELAY)
  }
  const hide = () => {
    clearTimeout(timer.current)
    setHovered(false)
  }
  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <span
      className="hot-tooltip-wrap"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {cloneElement(children, { 'aria-describedby': visible ? id : undefined })}
      {visible && (
        <span id={id} role="tooltip" className={`hot-tooltip hot-tooltip--floating hot-tooltip--${placement}`}>
          {content}
        </span>
      )}
    </span>
  )
}
