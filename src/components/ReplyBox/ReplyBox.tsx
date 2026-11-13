import { useState } from 'react'
import type { HTMLAttributes, KeyboardEvent } from 'react'
import { Button } from '../Button'
import { Icon } from '../../icons/Icon'
import './ReplyBox.css'

export type ReplyBoxProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  /** The text in the box. Leave out to let the box keep track of it. */
  value?: string
  /** Called as the text changes. */
  onChange?: (value: string) => void
  /** Called with the text when Send is pressed, or Enter without Shift. The box then clears itself. */
  onSend?: (value: string) => void
  /** Shown while the box is empty. */
  placeholder?: string
  /** Called when the emoji button is pressed. */
  onEmojiClick?: () => void
  /** Called when the attachment button is pressed. */
  onAttachClick?: () => void
}

/** The box an agent types a reply in: a text area, an emoji and an attachment button, and Send (Figma "reply-box" 3278:5249). */
export function ReplyBox({ value, onChange, onSend, placeholder = 'Shift + Enter for new line', onEmojiClick, onAttachClick, className, ...rest }: ReplyBoxProps) {
  const [own, setOwn] = useState('')
  const text = value ?? own
  const set = (v: string) => { setOwn(v); onChange?.(v) }
  const canSend = text.trim().length > 0
  const send = () => {
    if (!canSend) return
    onSend?.(text.trim())
    set('')
  }
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }
  return (
    <div className={['hot-reply-box', className].filter(Boolean).join(' ')} {...rest}>
      <textarea className="hot-reply-box__input" aria-label="Reply" placeholder={placeholder} value={text} onChange={(e) => set(e.target.value)} onKeyDown={onKey} />
      <div className="hot-reply-box__toolbar">
        <div className="hot-reply-box__tools">
          <Button iconOnly variant="ghost" size="xs" aria-label="Emoji" onClick={onEmojiClick}><Icon name="emoji" size={16} /></Button>
          <Button iconOnly variant="ghost" size="xs" aria-label="Attach a file" onClick={onAttachClick}><Icon name="attachment" size={16} /></Button>
        </div>
        <Button size="xs" disabled={!canSend} onClick={send}>Send</Button>
      </div>
    </div>
  )
}
