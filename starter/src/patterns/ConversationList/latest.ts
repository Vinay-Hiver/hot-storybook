import type { ConversationListItem } from './sampleData'

/** The latest message of a conversation, whoever wrote it. */
export type LatestMessage = { text: string; sent: boolean }

/** The first line of a message that has a text. */
export const firstLine = (text: string) => text.split('\n').find((l) => l.trim())?.trim() ?? ''

/**
 * The second line of a card always shows the latest message that was received or sent, never an activity such as "chat was reopened".
 * A message that was sent shows with the reply arrow; a message that was received shows its first line. Voice cards are left as they are.
 */
export function withLatest(items: ConversationListItem[], latest: (id: string) => LatestMessage | undefined): ConversationListItem[] {
  return items.map((item) => {
    const m = latest(item.id)
    return m ? { ...item, preview: firstLine(m.text), replied: m.sent } : item
  })
}
