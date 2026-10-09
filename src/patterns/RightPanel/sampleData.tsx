import type { CSSProperties } from 'react'
import { Avatar } from '../../components/Avatar'
import { Tag } from '../../components/Tag'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import { RightPanel, RightPanelSection, RightPanelTop } from './RightPanel'

/** A row: [icon] [label] ...space... [value]. Built from the Icon atom and plain text, with colour tokens (see RightPanel.css). */
function Row({ icon, label, children, link }: { icon: IconName; label: string; children?: React.ReactNode; link?: boolean }) {
  return (
    <div className="hot-rp-field">
      <div className="hot-rp-field__label"><Icon name={icon} size={14} /><span>{label}</span></div>
      <div className={`hot-rp-field__value${link ? ' hot-rp-field__value--link' : ''}`}>{children}</div>
    </div>
  )
}

/** The Figma "Open" status ring: a red outline circle. */
function OpenStatus() {
  return <span style={{ display: 'inline-flex', color: 'var(--pastelRedSurfaceDefault)' }}><Icon name="status" size={16} /></span>
}

const redAvatar = { '--avatar-bg': 'var(--pastelRedSurfaceDefault)' } as CSSProperties

/**
 * An example right panel, shared by the Right panel and Page layout stories so both show the same thing.
 * `open` lists which sub-sections start open; `hoverSection` pins the hover look on one section's header.
 */
export function ExampleRightPanel({ open = ['contact'], hoverSection }: { open?: string[]; hoverSection?: string }) {
  return (
    <RightPanel aria-label="Details" tabs={[{ id: 'shared-inbox', label: 'Shared Inbox', icon: 'sminbox' }]} customizeWidgets>
      <RightPanelTop title="Inbox name">
        <Row icon="assigned" label="Assignee">
          <Avatar initial="M" size="small" status="online" style={redAvatar} />
          <span style={{ marginLeft: 4 }}>Mark Scout</span>
        </Row>
        <Row icon="flag" label="Status">
          <OpenStatus />
          <span style={{ marginLeft: 4 }}>Open</span>
        </Row>
        <Row icon="tag" label="Tags">
          <Tag color="violet" onRemove={() => {}} removeLabel="Remove Finance">Finance</Tag>
          {/* Temporary: a clickable "Add" chip is not built, so a Tag sits inside a plain button. */}
          <button type="button" aria-label="Add tag" style={{ padding: 0, border: 0, background: 'transparent', cursor: 'pointer' }}>
            <Tag iconLeft={<Icon name="add" size={14} />}>Add</Tag>
          </button>
        </Row>
      </RightPanelTop>

      <RightPanelSection id="contact" title="Contact" icon="contact" defaultExpanded={open.includes('contact')} forceHover={hoverSection === 'contact'}>
        <Row icon="user" label="Name">Helly R</Row>
        <Row icon="mailbox" label="Email">helly.r@lumon.com</Row>
        <Row icon="building" label="Account">Google</Row>
        <Row icon="previousconversations" label="Conversations" link>60</Row>
      </RightPanelSection>

      <RightPanelSection id="account" title="Account" icon="building" defaultExpanded={open.includes('account')} forceHover={hoverSection === 'account'}>
        <Row icon="building" label="Name">Lumon Industries</Row>
        <Row icon="user" label="Owner">Mark Scout</Row>
        <Row icon="previousconversations" label="Conversations" link>112</Row>
      </RightPanelSection>

      <RightPanelSection id="related" title="Related conversations" icon="previousconversations" defaultExpanded={open.includes('related')} forceHover={hoverSection === 'related'}>
        <Row icon="mailbox" label="Last email">Yesterday</Row>
        <Row icon="flag" label="Open">3</Row>
      </RightPanelSection>

      <RightPanelSection id="custom" title="Custom fields" icon="tag" defaultExpanded={open.includes('custom')} forceHover={hoverSection === 'custom'}>
        <Row icon="tag" label="Plan">Enterprise</Row>
        <Row icon="flag" label="Region">North America</Row>
      </RightPanelSection>
    </RightPanel>
  )
}
