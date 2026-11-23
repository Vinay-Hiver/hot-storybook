import type { AvatarColor } from '../../components/Avatar'
import { scheduleUserReplyText } from '../ChatConversation/simulatedReply'

/** One message in an email thread. */
export type EmailThreadMessage = { id: string; email: string; avatarColor?: AvatarColor; time: string; body: string }

/** The agent's address, shown on the messages they send. */
export const emailAgentAddress = 'michael.scott@acme.com'

/** The time on a message sent right now, for example `Feb 4, 02:45 PM`. */
export const emailNow = () => new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(' at', ',')

export const agentEmail = (body: string): EmailThreadMessage => ({ id: `agent-${Date.now()}`, email: emailAgentAddress, avatarColor: 'lightBlue', time: emailNow(), body })

/** Mimics the customer: a moment after the agent sends an email, a generic reply arrives from the customer's address. */
export const scheduleEmailReply = (customerEmail: string, customerColor: AvatarColor | undefined, add: (message: EmailThreadMessage) => void) =>
  scheduleUserReplyText((text) => add({ id: `reply-${Date.now()}`, email: customerEmail, avatarColor: customerColor, time: emailNow(), body: text }))
