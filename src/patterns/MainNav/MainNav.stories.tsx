import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MainNav } from './MainNav'
import type { MainNavItem } from './MainNav'

const items: MainNavItem[] = [
  { id: 'conversations', label: 'Conversations', icon: 'inbox' },
  { id: 'notifications', label: 'Notifications', icon: 'notification' },
  { id: 'templates', label: 'Templates', icon: 'movetofolder' },
  { id: 'customers', label: 'Customers', icon: 'contact' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics' },
  { id: 'admin', label: 'Admin panel', icon: 'setting' },
]
const footerItems: MainNavItem[] = [
  { id: 'help', label: 'Help', icon: 'helpchat' },
  { id: 'chat', label: 'Chat with us', icon: 'chatsupport' },
]
const ids = items.map((i) => i.id)

const meta = {
  title: 'Patterns/Main nav',
  component: MainNav,
  parameters: { layout: 'centered' },
  argTypes: { items: { control: false }, footerItems: { control: false }, value: { control: false }, onChange: { control: false }, onFooterClick: { control: false }, user: { control: false }, forceHoverId: { control: false } },
} satisfies Meta<typeof MainNav>

export default meta
type Story = StoryObj<typeof meta>

type PlaygroundArgs = { selected: string; hovered: string; showAvatar: boolean; status: 'online' | 'offline' }

/** A nav you can change from the Controls panel. Clicking an icon selects it. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { selected: 'conversations', hovered: 'none', showAvatar: true, status: 'online' },
  argTypes: {
    selected: { control: 'select', options: ids, name: 'selected item' },
    hovered: { control: 'select', options: ['none', ...ids], name: 'hover on', description: 'Pin the hover look on an icon' },
    showAvatar: { control: 'boolean', name: 'show avatar' },
    status: { control: 'inline-radio', options: ['online', 'offline'], name: 'avatar status', if: { arg: 'showAvatar' } },
  },
  render: function Render({ selected, hovered, showAvatar, status }) {
    const [value, setValue] = useState(selected)
    const [prev, setPrev] = useState(selected)
    if (prev !== selected) { setPrev(selected); setValue(selected) }
    return (
      <div style={{ height: 834 }}>
        <MainNav items={items} footerItems={footerItems} value={value} onChange={setValue} forceHoverId={hovered === 'none' ? undefined : hovered} user={showAvatar ? { initial: 'A', name: 'Alex', status } : undefined} />
      </div>
    )
  },
}

// The stories below feed the Docs page and are hidden from the sidebar.
export const Default: Story = {
  tags: ['!dev'],
  args: { items },
  parameters: { controls: { disable: true } },
  render: (args) => <div style={{ height: 834 }}><MainNav {...args} footerItems={footerItems} value="conversations" user={{ initial: 'A', name: 'Alex' }} /></div>,
}

export const Hover: Story = {
  tags: ['!dev'],
  args: { items },
  parameters: { controls: { disable: true } },
  render: (args) => <div style={{ height: 834 }}><MainNav {...args} footerItems={footerItems} value="conversations" forceHoverId="customers" user={{ initial: 'A', name: 'Alex' }} /></div>,
}

/** The nav as drawn in Figma: one variant for each selected icon. */
export const AllVariants: Story = {
  args: { items },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      {ids.map((id) => (
        <div key={id} style={{ height: 834 }}>
          <MainNav {...args} footerItems={footerItems} value={id} user={{ initial: 'A', name: 'Alex' }} />
        </div>
      ))}
    </div>
  ),
}
