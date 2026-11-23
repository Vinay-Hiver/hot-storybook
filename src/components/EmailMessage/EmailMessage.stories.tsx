import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmailMessage } from './EmailMessage'

const meta = {
  title: 'Components/Email message',
  // Not shown in the sidebar: these are the parts of the Conversation Views, described on those pages.
  tags: ['!dev'],
  component: EmailMessage,
  parameters: { layout: 'centered' },
  args: { sender: 'john.smith@gmail.com', time: 'Feb 4, 01:20 PM', body: 'Hi Support,\n\nI am experiencing a blank screen after logging in to the mobile app. Can you please help?', expanded: true, avatarColor: 'red' },
  argTypes: { avatarColor: { control: 'select', options: ['lightBlue', 'red', 'orange', 'yellow', 'green', 'purple', 'violet', 'grey'] }, onToggle: { control: false }, onReply: { control: false }, onForward: { control: false } },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
} satisfies Meta<typeof EmailMessage>

export default meta
type Story = StoryObj<typeof meta>

/** One message you can change from the Controls panel. Turn `expanded` off to see it closed. */
export const Playground: Story = {}

// The stories below feed the Docs page and are hidden from the sidebar.
export const States: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  decorators: [],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 560 }}>
      <EmailMessage sender="john.smith@gmail.com" avatarColor="red" time="Feb 4, 01:20 PM" body={'Hi Support,\n\nI am experiencing a blank screen after logging in to the mobile app. Can you please help?'} expanded />
      <EmailMessage sender="ruben@acme.com" avatarColor="lightBlue" time="Feb 4, 02:00 PM" body="Hello John, I am looking into this. Could you let me know which device you are using?" />
    </div>
  ),
}
