import { useState } from 'react'
import type { HTMLAttributes } from 'react'
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { Button } from '../Button'
import { Tag } from '../Tag'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import './EmailEditor.css'

export type EmailEditorProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> & {
  /** The address the reply goes to, shown as a chip after "To". */
  recipient?: string
  /** Called with the text when Send is pressed. */
  onSend?: (text: string) => void
  /** Called when the discard (bin) button is pressed. */
  onDiscard?: () => void
  /** Shown while the editor is empty. */
  placeholder?: string
}

type FormatButton = { label: string; icon: IconName; command: 'bold' | 'italic' | 'underline' | 'strike' | 'align' | 'link' }

const formats: FormatButton[] = [
  { label: 'Bold', icon: 'bold', command: 'bold' },
  { label: 'Italic', icon: 'italics', command: 'italic' },
  { label: 'Underline', icon: 'underline', command: 'underline' },
  { label: 'Strikethrough', icon: 'strikethrough', command: 'strike' },
]

/** The editor an agent writes an email reply in: a "Reply" header, the recipient, a rich-text area (Tiptap), a formatting bar and the actions with Send. */
export function EmailEditor({ recipient, onSend, onDiscard, placeholder = 'Start with ‘/’ to select a email template', className, ...rest }: EmailEditorProps) {
  const [showFormatting, setShowFormatting] = useState(true)
  const [to, setTo] = useState<string | undefined>(recipient)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content: '',
  })
  // Which formats are on at the cursor, and whether there is any text to send.
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: !!e?.isActive('bold'), italic: !!e?.isActive('italic'), underline: !!e?.isActive('underline'), strike: !!e?.isActive('strike'),
      align: !!e?.isActive({ textAlign: 'left' }), link: !!e?.isActive('link'), hasText: !!e && e.getText().trim().length > 0,
    }),
  })
  if (!editor) return null

  const run = (c: FormatButton['command']) => {
    const chain = editor.chain().focus()
    if (c === 'bold') chain.toggleBold().run()
    else if (c === 'italic') chain.toggleItalic().run()
    else if (c === 'underline') chain.toggleUnderline().run()
    else if (c === 'strike') chain.toggleStrike().run()
    else if (c === 'align') chain.setTextAlign('left').run()
    else {
      const url = window.prompt('URL')
      if (url) chain.setLink({ href: url }).run()
    }
  }
  const send = () => {
    const text = editor.getText().trim()
    if (!text) return
    onSend?.(text)
    editor.commands.clearContent()
  }

  return (
    <div className={['hot-email-editor', className].filter(Boolean).join(' ')} {...rest}>
      <div className="hot-email-editor__type">
        <Icon name="reply" size={14} />
        <span>Reply</span>
      </div>
      <div className="hot-email-editor__recipients">
        <div className="hot-email-editor__to">
          <span className="hot-email-editor__label">To</span>
          {to && <Tag onRemove={() => setTo(undefined)} removeLabel={`Remove ${to}`}>{to}</Tag>}
        </div>
        <div className="hot-email-editor__links">
          <button type="button">Cc</button>
          <button type="button">Bcc</button>
          <button type="button">Edit Subject</button>
        </div>
      </div>
      <div className="hot-email-editor__content">
        <EditorContent editor={editor} />
      </div>
      <div className="hot-email-editor__bars">
        <div className={['hot-email-editor__format', !showFormatting && 'hot-email-editor__format--hidden'].filter(Boolean).join(' ')}>
          <span className="hot-email-editor__pill hot-email-editor__pill--font">Serif<Icon name="chevrondown" size={14} /></span>
          <span className="hot-email-editor__pill hot-email-editor__pill--small">N<Icon name="chevrondown" size={14} /></span>
          <span className="hot-email-editor__pill hot-email-editor__pill--small">A<Icon name="chevrondown" size={14} /></span>
          <span className="hot-email-editor__divider" />
          {formats.map((f) => (
            <Button key={f.command} iconOnly variant="ghost" size="xs" aria-label={f.label} aria-pressed={state?.[f.command as 'bold']} className={state?.[f.command as 'bold'] ? 'hot-email-editor__on' : undefined} onClick={() => run(f.command)}>
              <Icon name={f.icon} size={16} />
            </Button>
          ))}
          <span className="hot-email-editor__divider" />
          <Button iconOnly variant="ghost" size="xs" aria-label="Align left" aria-pressed={state?.align} className={state?.align ? 'hot-email-editor__on' : undefined} onClick={() => run('align')}><Icon name="alignment1" size={16} /></Button>
          <Button iconOnly variant="ghost" size="xs" aria-label="Link" aria-pressed={state?.link} className={state?.link ? 'hot-email-editor__on' : undefined} onClick={() => run('link')}><Icon name="link" size={16} /></Button>
          <Button iconOnly variant="ghost" size="xs" aria-label="More formatting"><Icon name="hmore" size={16} /></Button>
        </div>
        <div className="hot-email-editor__actions">
          <div className="hot-email-editor__group">
            <Button iconOnly variant="ghost" size="sm" aria-label="Formatting" aria-pressed={showFormatting} className={showFormatting ? 'hot-email-editor__on' : undefined} onClick={() => setShowFormatting((s) => !s)}><Icon name="text" size={16} /></Button>
            <Button iconOnly variant="ghost" size="sm" aria-label="Emoji"><Icon name="emoji" size={16} /></Button>
            <Button iconOnly variant="ghost" size="sm" aria-label="Attach a file"><Icon name="attachment" size={16} /></Button>
            <Button iconOnly variant="ghost" size="sm" aria-label="Signature"><Icon name="signature" size={16} /></Button>
            <Button iconOnly variant="ghost" size="sm" aria-label="Templates"><Icon name="emailtemplates" size={16} /></Button>
          </div>
          <div className="hot-email-editor__group hot-email-editor__group--end">
            <div className="hot-email-editor__group">
              <Button iconOnly variant="ghost" size="sm" aria-label="Share"><Icon name="share" size={16} /></Button>
              <Button iconOnly variant="ghost" size="sm" aria-label="Save draft"><Icon name="save" size={16} /></Button>
              <Button iconOnly variant="ghost" size="sm" aria-label="Discard" onClick={onDiscard}><Icon name="delete" size={16} /></Button>
            </div>
            <Button size="sm" disabled={!state?.hasText} onClick={send}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
