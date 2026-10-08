import type { Meta, StoryObj } from '@storybook/react-vite'
import { RightPanel } from './RightPanel'
import { ExampleRightPanel } from './sampleData'

const meta = {
  title: 'Patterns/Right panel',
  component: RightPanel,
  parameters: { layout: 'centered' },
  argTypes: { children: { table: { disable: true } }, className: { table: { disable: true } }, 'aria-label': { table: { disable: true } } },
} satisfies Meta<typeof RightPanel>

export default meta
type Story = StoryObj<typeof meta>

type PlaygroundArgs = { open: ('contact' | 'account' | 'related' | 'custom')[] }

/** The panel with four sub-sections. Choose which ones start open, and click a header to open or close it. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { open: ['contact'] },
  argTypes: { open: { control: 'check', options: ['contact', 'account', 'related', 'custom'], name: 'open sections' } },
  render: ({ open }) => (
    <div style={{ height: 760 }}>
      <ExampleRightPanel key={open.join(',')} open={open} />
    </div>
  ),
}

// The stories below feed the Docs page and are hidden from the sidebar.
export const Anatomy: Story = {
  tags: ['!dev'],
  args: { children: null },
  parameters: { controls: { disable: true } },
  render: () => <div style={{ height: 640 }}><ExampleRightPanel open={['contact']} /></div>,
}

export const OpenAndClosed: Story = {
  tags: ['!dev'],
  args: { children: null },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <div style={{ height: 460 }}><ExampleRightPanel open={[]} /></div>
      <div style={{ height: 780 }}><ExampleRightPanel open={['contact', 'account', 'related', 'custom']} /></div>
    </div>
  ),
}

export const HoverState: Story = {
  tags: ['!dev'],
  args: { children: null },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <div style={{ height: 460 }}><ExampleRightPanel open={[]} hoverSection="account" /></div>
      <div style={{ height: 460 }}><ExampleRightPanel open={['contact']} hoverSection="contact" /></div>
    </div>
  ),
}
