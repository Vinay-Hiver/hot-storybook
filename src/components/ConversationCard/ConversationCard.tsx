import { useState } from 'react'
import type { HTMLAttributes, KeyboardEvent } from 'react'
import { Checkbox } from '../Checkbox'
import { SlaPill } from '../Sla'
import type { SlaKind, SlaStatus } from '../Sla'
import { Tag } from '../Tag'
import type { ChipColor } from '../Tag'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import './ConversationCard.css'

/** The channels a conversation can come from. The same ids as the Sub-nav channels. */
export type ConversationChannel = 'email' | 'slack' | 'chat' | 'voice' | 'sms' | 'whatsapp'

const channelIcons: Record<ConversationChannel, IconName> = { email: 'mailbox', slack: 'slack', chat: 'chatinbox', voice: 'voice', sms: 'sms', whatsapp: 'whatsapp' }
/** Only these channels show the reply arrow. */
const repliesShown: ConversationChannel[] = ['chat', 'sms', 'whatsapp']

export type ConversationCardTag = { label: string; color?: ChipColor }
export type ConversationCardSla = { kind: SlaKind; status: SlaStatus }

export type ConversationCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> & {
  /** Who the conversation is with: a name, an email or a phone number. */
  name: string
  /** The date or time of the latest message, for example `Nov 12`. */
  date: string
  /** The latest message or the email subject. One line, cut with an ellipsis. Voice cards ignore it and show the call line instead. */
  preview?: string
  /** Voice only: the second line reads "Incoming voice call started" or "Outgoing voice call started". */
  callDirection?: 'incoming' | 'outgoing'
  /** The channel the conversation came from. Sets the icon before the name. */
  channel?: ConversationChannel
  /** Shows a small reply arrow before the message: the latest message was a reply sent from here. Only used for chat, SMS and WhatsApp. */
  replied?: boolean
  /** The card of the conversation that is open: pale blue with a blue bar on the left. It has no hover state. */
  selected?: boolean
  /** SLA pills (first response time, resolution time) shown on the chips row. */
  sla?: ConversationCardSla[]
  /** Tags shown on the chips row after the SLA pills, for example a priority or a ticket number. */
  tags?: ConversationCardTag[]
  /** How many more tags there are than shown. Shown as "+N" at the end of the chips row. Only a count, it opens nothing. */
  moreCount?: number
  /** Whether the checkbox that replaces the channel icon is checked. Leave out to let the card keep track of it. */
  checked?: boolean
  /** Called when the checkbox is clicked. */
  onCheckedChange?: (checked: boolean) => void
  /** Storybook only: pins the hover state so it can be shown without interaction. */
  forceState?: 'hover' | 'icon-hover'
}

export function ConversationCard({
  name, date, preview, callDirection = 'incoming', channel = 'chat', replied, selected, sla, tags, moreCount, checked, onCheckedChange,
  forceState, className, onClick, onKeyDown, ...rest
}: ConversationCardProps) {
  const [ownChecked, setOwnChecked] = useState(false)
  const [overIcon, setOverIcon] = useState(false)
  const isChecked = checked ?? ownChecked
  // Hovering the channel icon swaps it for a checkbox. A checked box stays visible.
  const showBox = overIcon || isChecked || forceState === 'icon-hover'
  const line = channel === 'voice' ? (callDirection === 'outgoing' ? 'Outgoing voice call started' : 'Incoming voice call started') : preview
  const hasChips = !!sla?.length || !!tags?.length || !!moreCount

  const classes = ['hot-conv-card', selected && 'hot-conv-card--selected', className].filter(Boolean).join(' ')
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e)
    if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      e.currentTarget.click()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      data-force-state={forceState === 'hover' ? 'hover' : undefined}
      className={classes}
      onClick={onClick}
      onKeyDown={onKey}
      {...rest}
    >
      <div className="hot-conv-card__main">
      <div className="hot-conv-card__title-row">
        <div className="hot-conv-card__who">
          <span
            className="hot-conv-card__lead"
            onMouseEnter={() => setOverIcon(true)}
            onMouseLeave={() => setOverIcon(false)}
            onClick={showBox ? (e) => e.stopPropagation() : undefined}
          >
            {showBox ? (
              <Checkbox
                aria-label="Select conversation"
                checked={isChecked}
                onChange={(e) => {
                  setOwnChecked(e.target.checked)
                  onCheckedChange?.(e.target.checked)
                }}
              />
            ) : (
              <Icon name={channelIcons[channel]} size={16} />
            )}
          </span>
          <span className="hot-conv-card__name">{name}</span>
        </div>
        <span className="hot-conv-card__date">{date}</span>
      </div>
      <div className="hot-conv-card__preview-row">
        {replied && repliesShown.includes(channel) && (
          <span className="hot-conv-card__reply" aria-label="You replied">
            <Icon name="reply" size={14} />
          </span>
        )}
        <span className="hot-conv-card__preview">{line}</span>
      </div>
      </div>
      {hasChips && (
        <div className="hot-conv-card__chips">
          {sla?.map((s) => <SlaPill key={s.kind} kind={s.kind} status={s.status} />)}
          {tags?.map((t) => <Tag key={t.label} color={t.color}>{t.label}</Tag>)}
          {!!moreCount && <span className="hot-conv-card__more">+{moreCount}</span>}
        </div>
      )}
    </div>
  )
}
