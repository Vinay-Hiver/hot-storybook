import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Avatar } from '../../components/Avatar'
import { Tag } from '../../components/Tag'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import { RightPanel, RightPanelSection, RightPanelTop } from './RightPanel'
import { ActivityNotes } from './ActivityNotes'
import { CustomFieldsList } from './CustomFields'
import type { CustomFieldValue } from './CustomFields'
import { AssigneeField, CoAssigneeField, StatusField, TagsField } from './FieldSelects'
import type { TagOption } from './FieldSelects'
import { customFieldKinds, fields, samples, sections } from './data'
import type { FieldDef, SectionDef } from './data'

/** A row: [icon] [label] ...space... [value]. Built from the Icon atom and plain text, with colour tokens (see RightPanel.css). */
function Row({ icon, label, children, link }: { icon: IconName; label: string; children?: React.ReactNode; link?: boolean }) {
  return (
    <div className="hot-rp-field">
      <div className="hot-rp-field__label"><Icon name={icon} size={14} /><span>{label}</span></div>
      <div className={`hot-rp-field__value${link ? ' hot-rp-field__value--link' : ''}`}>{typeof children === 'string' || typeof children === 'number' || (Array.isArray(children) && children.every((c) => typeof c === 'string' || typeof c === 'number')) ? <span className="hot-rp-field__text" title={[children].flat().join('')}>{children}</span> : children}</div>
    </div>
  )
}

/** The custom fields of the example panel: a number, a text and a date, all editable. */
const sampleCustomFields: CustomFieldValue[] = [
  { id: 'mrr', label: 'MRR', kind: 'number', value: '1200' },
  { id: 'plan', label: 'Plan', kind: 'text', value: 'Enterprise' },
  { id: 'date', label: 'Date', kind: 'date' },
]

/** The tags of the example panel, and which are on the example conversation to begin with. */
export const sampleTagOptions: TagOption[] = [
  { value: 'finance', label: 'Finance', color: 'violet' },
  { value: 'billing', label: 'Billing', color: 'lightBlue' },
  { value: 'high', label: 'High', color: 'red' },
  { value: 'low', label: 'Low', color: 'green' },
]

const redAvatar = { '--avatar-bg': 'var(--pastelRedSurfaceDefault)' } as CSSProperties

/**
 * An example right panel, shared by the Right panel and Page layout stories so both show the same thing.
 * `open` lists which sub-sections start open; `hoverSection` pins the hover look on one section's header; `coAssignee` adds the Co-assignee field, which only the Email channel has. `customFields` and `contact` replace the example custom fields and the contact's name and email.
 */
export function ExampleRightPanel({ open = ['contact'], hoverSection, coAssignee = false, customFields = sampleCustomFields, contact, tagOptions = sampleTagOptions, tags, onTagsChange }: { open?: string[]; hoverSection?: string; coAssignee?: boolean; customFields?: CustomFieldValue[]; contact?: { name: string; email?: string }; /** Every tag that can be added. */ tagOptions?: TagOption[]; /** The values of the tags on the conversation. Leave out to let the panel keep its own. */ tags?: string[]; onTagsChange?: (tags: string[]) => void }) {
  const [ownTags, setOwnTags] = useState<string[]>(['finance'])
  const shownTags = tags ?? ownTags
  return (
    <RightPanel aria-label="Details" tabs={[{ id: 'shared-inbox', label: 'Shared Inbox', icon: 'sminbox' }]} customizeWidgets>
      <RightPanelTop title="Inbox name">
        <AssigneeField />
        {coAssignee && <CoAssigneeField />}
        <StatusField />
        <TagsField options={tagOptions} value={shownTags} onChange={(next) => { setOwnTags(next); onTagsChange?.(next) }} />
      </RightPanelTop>

      <RightPanelSection id="contact" title="Contact" icon="contact" defaultExpanded={open.includes('contact')} forceHover={hoverSection === 'contact'}>
        <Row icon="user" label="Name">{contact?.name ?? 'Kavya Reddy'}</Row>
        <Row icon="mailbox" label="Email">{contact ? (contact.email ?? '') : 'kavya.reddy@lumon.com'}</Row>
        <Row icon="building" label="Account">Google</Row>
        <Row icon="previousconversations" label="Conversations" link>60</Row>
      </RightPanelSection>

      <RightPanelSection id="account" title="Account" icon="building" defaultExpanded={open.includes('account')} forceHover={hoverSection === 'account'}>
        <Row icon="building" label="Name">Lumon Industries</Row>
        <Row icon="user" label="Owner">Priya Nair</Row>
        <Row icon="previousconversations" label="Conversations" link>112</Row>
      </RightPanelSection>

      <RightPanelSection id="related" title="Related conversations" icon="previousconversations" defaultExpanded={open.includes('related')} forceHover={hoverSection === 'related'}>
        <Row icon="mailbox" label="Last email">Yesterday</Row>
        <Row icon="flag" label="Open">3</Row>
      </RightPanelSection>

      <RightPanelSection id="custom" title="Custom fields" icon="text" defaultExpanded={open.includes('custom')} forceHover={hoverSection === 'custom'}>
        <CustomFieldsList fields={customFields} />
      </RightPanelSection>
    </RightPanel>
  )
}

/** Every section id in the database, in the order they are listed there. */
export const allSectionIds = Object.keys(sections)

// One set of example values for the whole database: the first channel that has a value for a field supplies it.
const sampleValues: Record<string, string | number> = Object.assign({}, ...Object.values(samples).map((c) => c.values).reverse())

/** One field's value, drawn by its kind. */
function FieldValue({ def }: { def: FieldDef }) {
  const value = sampleValues[def.id]
  if (def.kind === 'avatarText') return <><Avatar initial={String(value ?? '?').charAt(0).toUpperCase()} size="small" style={redAvatar} /><span className="hot-rp-field__text" style={{ marginLeft: 4 }}>{value}</span></>
  if (value === undefined) return <>Empty</>
  return <>{value}</>
}

function SectionRows({ section }: { section: SectionDef }) {
  if (section.type === 'customFields') {
    const rows = samples.slack.customFields ?? []
    return <>{rows.map((r) => <Row key={r.label} icon={customFieldKinds.text.icon} label={r.label}>{r.value ?? r.placeholder ?? 'Empty'}</Row>)}</>
  }
  if (section.type === 'list') {
    const items = samples.slack.previousConversations ?? []
    return <>{items.map((c, i) => <Row key={i} icon="conversation" label={c.from}>{c.preview} · {c.date}</Row>)}</>
  }
  if (section.type === 'notes') return <Row icon="note" label="Notes">Add a note</Row>
  if (section.type === 'activity') {
    const day = samples.email.activity?.[0]
    // The icon is chosen by meaning for now ("self-assigned" is a person, "ticket" is the ticket icon).
    return <ActivityNotes days={day ? [{ day: day.day, events: day.items.map((a) => ({ icon: /ticket/i.test(a.text) ? 'ticket' : 'user', text: a.text, time: a.time })) }] : []} />
  }
  const defs = (section.fields ?? []).map((id) => fields[id])
  return <>{defs.map((f) => <Row key={f.id} icon={f.icon} label={f.label} link={f.kind === 'countLink'}><FieldValue def={f} /></Row>)}</>
}

/**
 * A right panel with every section in the database, for the Playground. `show` lists which sections are in the panel.
 * Temporary: the sections of type list, notes, insights and activity are drawn as plain rows, because their own layouts
 * (conversation items, note box, AI summary card, timeline) are not built yet.
 */
export function AllSectionsRightPanel({ show = allSectionIds }: { show?: string[] }) {
  return (
    <RightPanel aria-label="Details" tabs={[{ id: 'shared-inbox', label: 'Shared Inbox', icon: 'sminbox' }]} customizeWidgets>
      <RightPanelTop title="Inbox name">
        <AssigneeField />
        <StatusField />
        <Row icon="tag" label="Tags"><Tag color="violet" onRemove={() => {}} removeLabel="Remove Finance">Finance</Tag></Row>
      </RightPanelTop>
      {allSectionIds.filter((id) => show.includes(id)).map((id) => (
        <RightPanelSection key={id} id={id} title={sections[id].title} icon={sections[id].icon} defaultExpanded>
          <SectionRows section={sections[id]} />
        </RightPanelSection>
      ))}
    </RightPanel>
  )
}
