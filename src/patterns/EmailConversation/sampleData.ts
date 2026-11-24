import type { AvatarColor } from '../../components/Avatar'
import { emailAgentAddress } from './emailThread'
import type { EmailThreadMessage } from './emailThread'

export type SampleEmail = { subject: string; messages: EmailThreadMessage[]; customerEmail: string; customerColor: AvatarColor }

const make = (n: number, subject: string, customerEmail: string, customerColor: AvatarColor, lines: Array<[boolean, string, string]>): [string, SampleEmail] => [
  `email-${n}`,
  {
    subject, customerEmail, customerColor,
    messages: lines.map(([agent, time, body], i) => ({ id: `${n}-${i + 1}`, email: agent ? emailAgentAddress : customerEmail, avatarColor: agent ? 'lightBlue' : customerColor, time, body })),
  },
]

/** Dummy email threads, keyed by the id of the Email conversation in the Conversation list (`email-1` to `email-8`). */
export const sampleEmails: Record<string, SampleEmail> = Object.fromEntries([
  make(1, 'Question about my invoice', 'kavya.reddy@example.com', 'violet', [
    [false, 'Nov 12, 09:20 AM', 'Hi Support,\n\nI was charged twice for my annual renewal. Could you check invoice #4821 and let me know what happened?'],
    [true, 'Nov 12, 09:45 AM', 'Hello Kavya,\n\nThanks for flagging this. I can see two charges on the same day. I have started a refund for the second one.'],
    [false, 'Nov 12, 10:02 AM', 'Thank you. How long will the refund take to show on my card?'],
  ]),
  make(2, 'Re: Beet farm onboarding', 'arjun.menon@example.com', 'orange', [
    [false, 'Nov 12, 08:10 AM', 'Hello,\n\nWe are setting up the team for the new farm account. Where can I find the onboarding checklist?'],
    [true, 'Nov 12, 08:40 AM', 'Hi Arjun,\n\nThe checklist is under Settings, then Onboarding. I have also attached a short guide.'],
  ]),
  make(3, 'Art class refund request', 'olivia.hayes@example.com', 'green', [
    [false, 'Nov 12, 09:00 AM', 'Hi,\n\nI would like a refund for the art class I booked for next week, as I can no longer attend.'],
  ]),
  make(4, 'Prank insurance renewal', 'noah.bennett@example.com', 'lightBlue', [
    [false, 'Nov 11, 03:30 PM', 'Hi team,\n\nMy prank insurance renews next month. Can you send me the updated terms?'],
    [true, 'Nov 11, 04:05 PM', 'Hi Noah,\n\nThe updated terms are attached. Let me know if you have any questions.'],
    [false, 'Nov 11, 04:20 PM', 'Great, thanks.'],
  ]),
  make(5, 'Cat allergy accommodation', 'chloe.parker@example.com', 'purple', [
    [false, 'Nov 11, 11:10 AM', 'Hello,\n\nI need to update my profile with an accommodation request. Which form should I use?'],
  ]),
  make(6, 'Chili order is missing', 'ethan.cole@example.com', 'red', [
    [false, 'Nov 10, 02:15 PM', 'Hi,\n\nMy chili order from Tuesday has not arrived and the tracking has not changed for three days.'],
    [true, 'Nov 10, 02:50 PM', 'Hi Ethan,\n\nI am sorry about that. I have contacted the carrier and will update you today.'],
  ]),
  make(7, 'Quarterly tax summary', 'grace.miller@example.com', 'yellow', [
    [false, 'Nov 10, 10:00 AM', 'Hello,\n\nCould you send me the quarterly tax summary for the last three quarters?'],
  ]),
  make(8, 'Crossword subscription', 'lucas.reed@example.com', 'grey', [
    [false, 'Nov 9, 01:30 PM', 'Hi,\n\nI would like to pause my crossword subscription until the new year.'],
    [true, 'Nov 9, 02:00 PM', 'Hi Lucas,\n\nDone. Your subscription is paused until January 2.'],
  ]),
])
