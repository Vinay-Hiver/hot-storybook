import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConversationsSidebar } from './ConversationsSidebar'
import type { ConversationsSidebarSection } from './ConversationsSidebar'

const sections = (counts: boolean): ConversationsSidebarSection[] => [
  { items: [{ id: 'my-work', label: 'My Work', icon: 'sminbox', count: counts ? '99+' : undefined }, { id: 'personal', label: 'Personal', icon: 'personal' }] },
  {
    title: 'Shared Inbox',
    items: [
      { id: 'chat', label: 'Chat', icon: 'chatinbox', count: counts ? '99+' : undefined },
      { id: 'slack', label: 'Slack', icon: 'slack', count: counts ? '99+' : undefined },
      { id: 'voice', label: 'Voice', icon: 'voice', count: counts ? '99+' : undefined },
      { id: 'email', label: 'Email', icon: 'mailbox', count: counts ? '99+' : undefined },
    ],
  },
  {
    title: 'More',
    items: [{ id: 'sent', label: 'Sent', icon: 'send' }, { id: 'drafts', label: 'Drafts', icon: 'document' }, { id: 'spam', label: 'Spam', icon: 'spam' }, { id: 'all-mail', label: 'All mail', icon: 'allmails' }],
  },
]
const ids = sections(true).flatMap((s) => s.items.map((i) => i.id))

const meta = {
  title: 'Patterns/Conversations sidebar',
  component: ConversationsSidebar,
  parameters: { layout: 'centered' },
  argTypes: { sections: { table: { disable: true } }, value: { table: { disable: true } }, onChange: { table: { disable: true } }, onSearch: { table: { disable: true } }, onCreate: { table: { disable: true } }, onCreateMenu: { table: { disable: true } }, forceHoverId: { table: { disable: true } }, className: { table: { disable: true } } },
} satisfies Meta<typeof ConversationsSidebar>

export default meta
type Story = StoryObj<typeof meta>

type PlaygroundArgs = { title: string; selected: string; showCounts: boolean; hovered: string }

/** A sidebar you can change from the Controls panel. Clicking an item selects it. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { title: 'Conversations', selected: 'none', showCounts: true, hovered: 'none' },
  argTypes: {
    title: { control: 'text' },
    selected: { control: 'select', options: ['none', ...ids], name: 'selected item' },
    showCounts: { control: 'boolean', name: 'unread counts' },
    hovered: { control: 'select', options: ['none', ...ids], name: 'hover on', description: 'Pin the hover look on an item' },
  },
  render: function Render({ title, selected, showCounts, hovered }) {
    const [value, setValue] = useState(selected)
    const [prev, setPrev] = useState(selected)
    if (prev !== selected) { setPrev(selected); setValue(selected) }
    return (
      <div style={{ height: 600 }}>
        <ConversationsSidebar title={title} sections={sections(showCounts)} value={value === 'none' ? undefined : value} onChange={setValue} forceHoverId={hovered === 'none' ? undefined : hovered} />
      </div>
    )
  },
}

// The stories below feed the Docs page and are hidden from the sidebar.
export const Default: Story = {
  tags: ['!dev'],
  args: { sections: sections(true) },
  parameters: { controls: { disable: true } },
  render: (args) => <div style={{ height: 520 }}><ConversationsSidebar {...args} /></div>,
}

export const SelectedAndHover: Story = {
  tags: ['!dev'],
  args: { sections: sections(true) },
  parameters: { controls: { disable: true } },
  render: (args) => <div style={{ height: 520 }}><ConversationsSidebar {...args} value="slack" forceHoverId="email" /></div>,
}
