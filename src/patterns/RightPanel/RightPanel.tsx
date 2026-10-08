import { Children, createContext, isValidElement, useContext, useId, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import './RightPanel.css'

/* ---------- Panel ---------- */

export type RightPanelProps = {
  /** The top section (see `RightPanelTop`), followed by the sub-sections (see `RightPanelSection`). Each sub-section needs an `id`. */
  children: ReactNode
  /** Called with the sub-section ids in their new order when one is dragged to a new place. */
  onReorder?: (ids: string[]) => void
  /** Accessible name for the panel. */
  'aria-label'?: string
  className?: string
}

/** What a sortable wrapper hands to the section inside it: the props that make the drag handle start a drag. */
type SortableHandle = { handleProps: Record<string, unknown>; isDragging: boolean }
const SortableContextHandle = createContext<SortableHandle | null>(null)

/**
 * One sub-section in the list. While it is dragged the section itself follows the pointer, folded up, and the other sections
 * slide out of the way (translate only, never scaled). This is the same logic as the omni-boilerplate right panel.
 */
function SortableSection({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      className={`hot-rp-sortable${isDragging ? ' hot-rp-sortable--dragging' : ''}`}
      style={{ transform: CSS.Translate.toString(transform), transition, zIndex: isDragging ? 2 : undefined }}
    >
      <SortableContextHandle.Provider value={{ handleProps: { ...attributes, ...listeners }, isDragging }}>{children}</SortableContextHandle.Provider>
    </div>
  )
}

/**
 * The panel on the right of a page. Always 320px wide. Every channel uses the same anatomy: a top section, then sub-sections
 * that open and close and that can be dragged by their handle to a new order (up and down only).
 */
export function RightPanel({ children, onReorder, className, ...rest }: RightPanelProps) {
  const nodes = Children.toArray(children)
  const isSection = (n: ReactNode): n is ReactElement<RightPanelSectionProps> => isValidElement(n) && n.type === RightPanelSection
  const sections = nodes.filter(isSection)
  const others = nodes.filter((n) => !isSection(n))
  const ids = sections.map((n) => String(n.props.id))

  // Keep the order the person dragged to, and add or drop sections that were added or removed.
  const [order, setOrder] = useState(ids)
  const current = [...order.filter((id) => ids.includes(id)), ...ids.filter((id) => !order.includes(id))]
  const byId = new Map(sections.map((n) => [String(n.props.id), n]))

  // Dragging starts after 5px of movement on the handle.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    const next = arrayMove(current, current.indexOf(String(active.id)), current.indexOf(String(over.id)))
    setOrder(next)
    onReorder?.(next)
  }

  return (
    <aside className={['hot-right-panel', className].filter(Boolean).join(' ')} {...rest}>
      {others}
      <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis, restrictToParentElement]} onDragEnd={onDragEnd}>
        <SortableContext items={current} strategy={verticalListSortingStrategy}>
          <div className="hot-rp-sections">
            {current.map((id) => <SortableSection key={id} id={id}>{byId.get(id)}</SortableSection>)}
          </div>
        </SortableContext>
      </DndContext>
    </aside>
  )
}

/* ---------- Top section ---------- */

export type RightPanelTopProps = {
  /** The heading, for example the inbox name. */
  title: string
  /** The rows under the heading. Each row is `<div className="hot-rp-field">` with an icon and label on the left and the value on the right (see the Docs page). */
  children?: ReactNode
}

export function RightPanelTop({ title, children }: RightPanelTopProps) {
  return (
    <section className="hot-rp-top">
      <h2 className="hot-rp-top__title">{title}</h2>
      <div className="hot-rp-fields">{children}</div>
    </section>
  )
}

/* ---------- Sub-section ---------- */

export type RightPanelSectionProps = {
  /** A unique id. It is how the section is told apart when the sections are reordered. */
  id: string
  /** The section name, for example "Contact". */
  title: string
  /** The icon before the name. */
  icon: IconName
  /** The section's rows. Shown when the section is open. */
  children?: ReactNode
  /** Starts open when set. Used when the section manages itself. */
  defaultExpanded?: boolean
  /** Open or closed, when you control it yourself. */
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  /** Storybook only: pins the hover look on the header. */
  forceHover?: boolean
}

export function RightPanelSection({ title, icon, children, defaultExpanded = false, expanded, onExpandedChange, forceHover }: RightPanelSectionProps) {
  const handle = useContext(SortableContextHandle)
  const [inner, setInner] = useState(defaultExpanded)
  // A section that is being dragged folds up, and opens again where it lands.
  const open = (expanded ?? inner) && !handle?.isDragging
  const bodyId = useId()
  const toggle = () => {
    setInner(!open)
    onExpandedChange?.(!open)
  }
  return (
    <section className="hot-rp-section" data-open={open}>
      <div className="hot-rp-section__header" data-force-state={forceHover ? 'hover' : undefined}>
        {/* The drag handle sits in the left gutter and shows on hover, open or closed. Only the handle starts a drag. */}
        {handle && (
          <button type="button" className="hot-rp-section__grip" aria-label="Drag to reorder" {...(handle.handleProps as object)}>
            <Icon name="drag" size={14} />
          </button>
        )}
        <button type="button" className="hot-rp-section__toggle" aria-expanded={open} aria-controls={bodyId} onClick={toggle}>
          <span className="hot-rp-section__icon"><Icon name={icon} size={16} /></span>
          <span className="hot-rp-section__title">{title}</span>
          <span className="hot-rp-section__chevron" aria-hidden="true"><Icon name="chevronright" size={16} /></span>
        </button>
      </div>
      {/* Opening and closing slides over 250ms, like the Conversations sidebar inboxes. */}
      <div className="hot-rp-section__wrap" data-open={open} id={bodyId}>
        <div className="hot-rp-section__body">
          <div className="hot-rp-section__inner">
            <div className="hot-rp-fields">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
