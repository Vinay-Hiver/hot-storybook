import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReplyBox } from './ReplyBox'

const meta = {
  title: 'Components/Reply box',
  component: ReplyBox,
  parameters: { layout: 'centered' },
  argTypes: { value: { control: false }, onChange: { control: false }, onSend: { control: false }, onEmojiClick: { control: false }, onAttachClick: { control: false } },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
} satisfies Meta<typeof ReplyBox>

export default meta
type Story = StoryObj<typeof meta>

/** A reply box you can type in. Send turns on as soon as there is text; Enter sends and Shift + Enter starts a new line. */
export const Playground: Story = {}

// The stories below feed the Docs page and are hidden from the sidebar.
export const WithTemplates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  decorators: [],
  render: () => (
    <div style={{ width: 560 }}>
      <ReplyBox showTemplates placeholder="Shift + Enter for new line. Type ‘/’ to search for WhatsApp templates and send quick replies" />
    </div>
  ),
}

export const States: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  decorators: [],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 560 }}>
      <ReplyBox />
      <ReplyBox value="Sure, happy to help with that!" />
    </div>
  ),
}
