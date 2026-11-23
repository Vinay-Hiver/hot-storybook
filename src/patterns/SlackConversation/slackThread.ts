import { scheduleUserReplyText } from '../ChatConversation/simulatedReply'

/** One message in a Slack thread. */
export type SlackThreadItem = { id: string; from: 'user' | 'agent'; text: string; time: string; reactions?: Record<string, number> }

/** The agent's name in Slack, followed by "(You)". */
export const slackAgentName = 'Mark Scout (You)'

/** The time on a message sent right now, the way Slack shows it, for example `Nov 10, 04:11 PM`. */
export const slackNow = () => new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(' at', ',')

export const agentMessage = (text: string): SlackThreadItem => ({ id: `agent-${Date.now()}`, from: 'agent', text, time: slackNow() })
export const addReaction = (items: SlackThreadItem[], id: string, emoji: string) =>
  items.map((m) => (m.id === id ? { ...m, reactions: { ...m.reactions, [emoji]: (m.reactions?.[emoji] ?? 0) + 1 } } : m))
/** Pressing a reaction removes it completely. */
export const removeReaction = (items: SlackThreadItem[], id: string, emoji: string) =>
  items.map((m) => {
    if (m.id !== id) return m
    const { [emoji]: _removed, ...rest } = m.reactions ?? {}
    return { ...m, reactions: rest }
  })
export const deleteMessage = (items: SlackThreadItem[], id: string) => items.filter((m) => m.id !== id)

/** Mimics the customer: a moment after the agent sends a message, a generic reply arrives. */
export const scheduleSlackReply = (add: (item: SlackThreadItem) => void) =>
  scheduleUserReplyText((text) => add({ id: `reply-${Date.now()}`, from: 'user', text, time: slackNow() }))
