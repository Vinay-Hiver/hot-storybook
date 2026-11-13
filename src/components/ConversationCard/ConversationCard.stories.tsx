import { useEffect, useRef } from 'react'
import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConversationCard } from './ConversationCard'
import type { ConversationCardProps, ConversationChannel } from './ConversationCard'

const sla: ConversationCardProps['sla'] = [{ kind: 'frt', status: 'overdue' }]
const tags: ConversationCardProps['tags'] = [{ label: 'Low', color: 'green' }, { label: 'High', color: 'red' }, { label: '8239', color: 'red' }]

const channels: ConversationChannel[] = ['email', 'slack', 'chat', 'voice', 'sms', 'whatsapp']
/** What a conversation looks like on each channel, used as the default text when the channel changes. */
const samples: Record<ConversationChannel, { name: string; preview: string; replied: boolean }> = {
  email: { name: 'Michael Scott', preview: 'Question about my invoice', replied: false },
  slack: { name: 'Michael Scott', preview: 'Can someone look at this?', replied: false },
  chat: { name: 'Michael Scott', preview: 'Hello', replied: true },
  voice: { name: 'Michael Scott', preview: 'Incoming voice call started', replied: false },
  sms: { name: 'Michael Scott', preview: 'Hi', replied: true },
  whatsapp: { name: 'Michael Scott', preview: 'Hi', replied: true },
}

const meta = {
  title: 'Components/Conversation card',
  component: ConversationCard,
  parameters: { layout: 'centered' },
  args: { name: 'Michael Scott', date: 'Nov 12', preview: 'Hello' },
  argTypes: {
    channel: { control: 'select', options: channels, description: 'Each channel has its own icon. Changing it fills in a sample name and message.' },
    selected: { control: 'boolean' },
    replied: { control: 'boolean', description: 'The reply arrow before the message. Only chat, SMS and WhatsApp show it.' },
    moreCount: { control: 'number' },
    forceState: { control: 'inline-radio', options: [undefined, 'hover', 'icon-hover'] },
    date: { control: false },
    sla: { control: false },
    tags: { control: false },
    onCheckedChange: { control: false },
  },
  decorators: [(Story) => <div style={{ width: 299 }}><Story /></div>],
} satisfies Meta<typeof ConversationCard>

export default meta
type Story = StoryObj<typeof meta>

type PlaygroundArgs = ConversationCardProps & { showSla: boolean; showTags: boolean }

/** One card you can change from the Controls panel. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { channel: 'chat', selected: false, replied: true, callDirection: 'incoming', showSla: false, showTags: false, moreCount: 0 },
  argTypes: {
    callDirection: { control: 'inline-radio', options: ['incoming', 'outgoing'], name: 'call', description: 'Sets the second line of a voice card', if: { arg: 'channel', eq: 'voice' } },
    showSla: { control: 'boolean', name: 'SLA pills', description: 'Show the first response time pill' },
    showTags: { control: 'boolean', name: 'tags', description: 'Show a few tags' },
    moreCount: { control: 'number', name: 'more tags', description: 'The "+N" count after the tags', if: { arg: 'showTags' } },
  },
  render: function Render({ showSla, showTags, moreCount, ...args }) {
    const [, updateArgs] = useArgs()
    const last = useRef(args.channel)
    useEffect(() => {
      if (last.current !== args.channel) {
        last.current = args.channel
        updateArgs(samples[args.channel ?? 'chat'])
      }
    }, [args.channel, updateArgs])
    return <ConversationCard {...args} sla={showSla ? sla : undefined} tags={showTags ? tags : undefined} moreCount={showTags ? moreCount : undefined} />
  },
}

const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 299px)', gap: '24px 32px' }
const label: React.CSSProperties = { font: 'var(--text-body-sm-medium)', color: 'var(--slateTextSubtle)', margin: '0 0 8px' }
const Cell = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p style={label}>{title}</p>
    {children}
  </div>
)

// The stories below feed the Docs page and are hidden from the sidebar.
export const States: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded', controls: { disable: true } },
  decorators: [],
  render: () => (
    <div style={grid}>
      <Cell title="Unselected"><ConversationCard name="Michael Scott" date="Nov 12" preview="Hello" replied /></Cell>
      <Cell title="Unselected, hovering the card"><ConversationCard name="Michael Scott" date="Nov 12" preview="Hello" replied forceState="hover" /></Cell>
      <Cell title="Unselected, hovering the channel icon"><ConversationCard name="Michael Scott" date="Nov 12" preview="Hello" replied forceState="icon-hover" /></Cell>
      <Cell title="Unselected with SLA and tags"><ConversationCard channel="sms" name="Michael Scott" date="Nov 12" preview="Hi" sla={sla} tags={tags} moreCount={2} /></Cell>
      <Cell title="Selected"><ConversationCard name="Michael Scott" date="Nov 12" preview="Hello" replied selected /></Cell>
      <Cell title="Selected, hovering the channel icon"><ConversationCard name="Michael Scott" date="Nov 12" preview="Hello" replied selected forceState="icon-hover" /></Cell>
      <Cell title="Selected with SLA and tags"><ConversationCard channel="sms" name="Michael Scott" date="Nov 12" preview="Hi" selected sla={sla} tags={tags} moreCount={2} /></Cell>
      <Cell title="Selected, email"><ConversationCard channel="email" {...samples.email} date="Nov 12" selected sla={sla} tags={tags} moreCount={2} /></Cell>
    </div>
  ),
}

/** All six channels, each with its sample text. */
export const Channels: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded', controls: { disable: true } },
  decorators: [],
  render: () => (
    <div style={grid}>
      {channels.map((c) => (
        <Cell key={c} title={c}><ConversationCard channel={c} {...samples[c]} date="Nov 12" /></Cell>
      ))}
    </div>
  ),
}
