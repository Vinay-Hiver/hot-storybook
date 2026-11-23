import { useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { Input } from '../../components/Input'
import { Popover } from '../../components/Popover'
import { Icon } from '../../icons/Icon'
import { customFieldKinds } from './data'

/** A custom field on a conversation. `value` is empty when nothing is set. A date is kept as `YYYY-MM-DD`. */
export type CustomFieldValue = { id: string; label: string; kind: 'text' | 'number' | 'date'; value?: string }

const icons = { text: customFieldKinds.text.icon, number: customFieldKinds.number.icon, date: customFieldKinds.date.icon } as const

const toDate = (value?: string) => { if (!value) return undefined; const [y, m, d] = value.split('-').map(Number); return new Date(y, m - 1, d) }
const toValue = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
const show = (value?: string) => toDate(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

/**
 * A text or number custom field's value. Hovering shows the grey hover fill; pressing it turns it into a text box.
 * Enter or leaving the box saves, Escape drops the change. Number fields only take digits and one decimal point.
 */
function EditableText({ field, empty, onChange }: { field: CustomFieldValue; empty: string; onChange: (value: string | undefined) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const cancelled = useRef(false)
  const start = () => { cancelled.current = false; setDraft(field.value ?? ''); setEditing(true) }
  const commit = () => {
    setEditing(false)
    if (cancelled.current) return
    const next = draft.trim()
    if (next !== (field.value ?? '')) onChange(next || undefined)
  }
  const clean = (text: string) => (field.kind === 'number' ? text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1') : text)
  if (editing) {
    return (
      <div className="hot-rp-cf-edit">
        <Input
          size="sm" fullWidth autoFocus value={draft} aria-label={field.label}
          inputMode={field.kind === 'number' ? 'decimal' : undefined}
          placeholder={field.kind === 'number' ? 'Enter a number' : 'Enter text'}
          onChange={(e) => setDraft(clean(e.target.value))}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
            if (e.key === 'Escape') { cancelled.current = true; e.currentTarget.blur() }
          }}
        />
      </div>
    )
  }
  return (
    <button type="button" className="hot-rp-field__value hot-rp-cf-value" aria-label={`Edit ${field.label}`} onClick={start}>
      {field.value ? <span className="hot-rp-cf-value__text">{field.value}</span> : <span className="hot-rp-cf-value__empty">{empty}</span>}
    </button>
  )
}

/** A date custom field's value. Pressing it opens a calendar under it; picking a day saves it, and picking the same day again clears it. */
function EditableDate({ field, empty, onChange }: { field: CustomFieldValue; empty: string; onChange: (value: string | undefined) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const selected = toDate(field.value)
  return (
    <>
      <button ref={ref} type="button" className="hot-rp-field__value hot-rp-cf-value" aria-haspopup="dialog" aria-expanded={open} aria-label={`Edit ${field.label}`} onClick={() => setOpen((o) => !o)}>
        {field.value ? <span className="hot-rp-cf-value__text">{show(field.value)}</span> : <span className="hot-rp-cf-value__empty">{empty}</span>}
      </button>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={ref} placement="bottom-end">
        <div className="hot-rp-cf-calendar">
          <DayPicker
            mode="single" selected={selected} defaultMonth={selected}
            onSelect={(day) => { onChange(day ? toValue(day) : undefined); setOpen(false) }}
          />
        </div>
      </Popover>
    </>
  )
}

/**
 * One editable custom field row: the kind's icon, the name, and the value (text and number open a text box, a date opens a calendar).
 * Pass `empty` for the words shown when there is no value.
 */
export function CustomField({ field, empty = 'Empty', onChange }: { field: CustomFieldValue; empty?: string; onChange?: (value: string | undefined) => void }) {
  const change = onChange ?? (() => {})
  return (
    <div className="hot-rp-field">
      <div className="hot-rp-field__label"><Icon name={icons[field.kind]} size={14} /><span className="hot-rp-cf-label">{field.label}</span></div>
      {field.kind === 'date' ? <EditableDate field={field} empty={empty} onChange={change} /> : <EditableText field={field} empty={empty} onChange={change} />}
    </div>
  )
}

/** A list of editable custom fields that keeps its own values. Put it inside a `RightPanelSection`. */
export function CustomFieldsList({ fields: initial, empty = 'Empty' }: { fields: CustomFieldValue[]; empty?: string }) {
  const [fields, setFields] = useState(initial)
  return (
    <>
      {fields.map((f) => (
        <CustomField key={f.id} field={f} empty={empty} onChange={(value) => setFields((prev) => prev.map((x) => (x.id === f.id ? { ...x, value } : x)))} />
      ))}
    </>
  )
}
