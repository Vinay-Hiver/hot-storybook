import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import { startRipple } from '../../components/ripple'
import bulkSelectIllustration from '../../assets/bulk-select.png'
import './BulkActionsPanel.css'

export type BulkAction = { id: string; label: string; icon: IconName }

/** The actions of the panel, in order. */
export const bulkActions: BulkAction[] = [
  { id: 'unread', label: 'Mark as unread', icon: 'markasunread' },
  { id: 'assign', label: 'Assign to', icon: 'assigned' },
  { id: 'status', label: 'Change status', icon: 'flag' },
  { id: 'tags', label: 'Manage tags', icon: 'tag' },
]

export type BulkActionsPanelProps = {
  /** How many conversations are ticked in the list. */
  count: number
  /** Called with the id of the action that was pressed (`unread`, `assign`, `status` or `tags`). */
  onAction?: (id: string) => void
  /** Called when Cancel is pressed, to clear the selection. */
  onCancel?: () => void
  className?: string
}

/** Takes the place of the conversation and the right panel while conversations are ticked in the list: what you can do with all of them at once. */
export function BulkActionsPanel({ count, onAction, onCancel, className }: BulkActionsPanelProps) {
  return (
    <div className={['hot-bulk-panel', className].filter(Boolean).join(' ')}>
      <img src={bulkSelectIllustration} alt="" width={68} height={68} />
      <p className="hot-bulk-panel__count">{count} {count === 1 ? 'item' : 'items'} selected</p>
      <div className="hot-bulk-panel__list">
        {bulkActions.map((a) => (
          <button key={a.id} type="button" className="hot-bulk-panel__action" onMouseDown={startRipple} onClick={() => onAction?.(a.id)}>
            <Icon name={a.icon} size={16} />
            <span>{a.label}</span>
          </button>
        ))}
        <div className="hot-bulk-panel__divider" />
        <button type="button" className="hot-bulk-panel__action" onMouseDown={startRipple} onClick={onCancel}>
          <Icon name="close" size={16} />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  )
}
