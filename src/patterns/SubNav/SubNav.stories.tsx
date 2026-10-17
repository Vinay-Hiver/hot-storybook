import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SubNav } from './SubNav'
import { getSubNav, subNavChannelIds, subNavLibrary } from './data'
import type { SubNavChannelId } from './data'
import { subNavSampleHeader as header, subNavSampleItems as items, subNavSwitchSample as switchSample } from './sampleData'

const meta = {
  title: 'Patterns/Sub-nav',
  component: SubNav,
  parameters: { layout: 'centered' },
  argTypes: { items: { control: false }, value: { control: false }, onChange: { control: false }, onBack: { control: false }, onTitleClick: { control: false }, forceHoverId: { control: false } },
} satisfies Meta<typeof SubNav>

export default meta
type Story = StoryObj<typeof meta>

type PlaygroundArgs = { channel: SubNavChannelId; inboxEmail: string; selected: string; hovered: string }
const allItemIds = Object.keys(subNavLibrary)

/** A sub-nav you can change from the Controls panel. Pick a channel to see its list, and click an item to select it. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { channel: 'email', inboxEmail: 'hariniosm01@hiverhq.co.in', selected: 'default', hovered: 'none' },
  argTypes: {
    channel: { control: 'select', options: subNavChannelIds, description: 'Each channel has its own list' },
    inboxEmail: { control: 'text', name: 'email line', description: 'The small line under the heading (Email only)', if: { arg: 'channel', eq: 'email' } },
    selected: { control: 'select', options: ['default', ...allItemIds], name: 'selected item', description: '"default" selects the channel\'s first page' },
    hovered: { control: 'select', options: ['none', ...allItemIds], name: 'hover on', description: 'Pin the hover look on an item' },
  },
  render: function Render({ channel, inboxEmail, selected, hovered }) {
    const nav = getSubNav(channel)
    const start = selected !== 'default' && nav.items.some((i) => i.id === selected) ? selected : nav.defaultSelected
    const [value, setValue] = useState(start)
    const [prev, setPrev] = useState(`${channel}|${start}`)
    if (prev !== `${channel}|${start}`) { setPrev(`${channel}|${start}`); setValue(start) }
    return (
      <div style={{ height: 748 }}>
        <SubNav
          title={nav.label} subtitle={nav.subtitle ? inboxEmail : undefined} items={nav.items} value={value} onChange={setValue}
          onBack={() => {}} onTitleClick={nav.switcher === 'none' ? undefined : () => {}} switcher={nav.switcher === 'plain' ? 'plain' : 'box'}
          forceHoverId={hovered === 'none' ? undefined : hovered}
        />
      </div>
    )
  },
}

// The stories below feed the Docs page and are hidden from the sidebar.
export const Default: Story = {
  tags: ['!dev'],
  args: { ...header, items },
  parameters: { controls: { disable: true } },
  render: (args) => <div style={{ height: 480 }}><SubNav {...args} value="members" onBack={() => {}} onTitleClick={() => {}} /></div>,
}

export const SwitchMenu: Story = {
  tags: ['!dev'],
  args: { ...header, items },
  parameters: { controls: { disable: true } },
  render: (args) => <div style={{ height: 480 }}><SubNav {...args} value="members" onBack={() => {}} switchOptions={switchSample} switchValue="a" forceSwitchOpen /></div>,
}

export const Hover: Story = {
  tags: ['!dev'],
  args: { ...header, items },
  parameters: { controls: { disable: true } },
  render: (args) => <div style={{ height: 480 }}><SubNav {...args} value="members" forceHoverId="aliases" onBack={() => {}} onTitleClick={() => {}} /></div>,
}

/** The sub-nav as drawn in Figma, with Members selected. */
export const AllVariants: Story = {
  args: { ...header, items },
  parameters: { controls: { disable: true } },
  render: (args) => <div style={{ height: 480 }}><SubNav {...args} value="members" onBack={() => {}} onTitleClick={() => {}} /></div>,
}
