import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlackMessage } from './SlackMessage'

const meta = {
  title: 'Components/Slack message',
  // Not shown in the sidebar: these are the parts of the Conversation Views, described on those pages.
  tags: ['!dev'],
  component: SlackMessage,
  parameters: { layout: 'centered' },
  args: { name: 'Kavya Reddy', time: 'Nov 10, 04:11 PM', text: 'Hey, my order #404 is missing! Please help me out!', avatarColor: 'violet', canDelete: false },
  argTypes: {
    avatarColor: { control: 'select', options: ['lightBlue', 'red', 'orange', 'yellow', 'green', 'purple', 'violet', 'grey'] },
    reactions: { control: false },
    onAddReaction: { control: false },
    onRemoveReaction: { control: false },
    onDelete: { control: false },
  },
  decorators: [(Story) => <div style={{ width: 520, paddingTop: 24 }}><Story /></div>],
} satisfies Meta<typeof SlackMessage>

export default meta
type Story = StoryObj<typeof meta>

/** One message you can change from the Controls panel. Point at it to see the toolbar. */
export const Playground: Story = {}

// The stories below feed the Docs page and are hidden from the sidebar.
export const Variants: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  decorators: [],
  render: () => (
    <div style={{ width: 520, paddingTop: 24 }}>
      <SlackMessage name="Kavya Reddy" avatarColor="violet" time="Nov 10, 04:11 PM" text="Hey, my order #404 is missing! Please help me out!" />
      <SlackMessage name="Aarav Mehta (You)" avatarColor="red" time="Nov 10, 04:11 PM" text="Checking on that for you!" canDelete reactions={{ '😀': 1, '✅': 1 }} />
    </div>
  ),
}
