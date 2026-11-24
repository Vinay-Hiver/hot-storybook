import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmailEditor } from './EmailEditor'

const meta = {
  title: 'Components/Email editor',
  // Not shown in the sidebar: these are the parts of the Conversation Views, described on those pages.
  tags: ['!dev'],
  component: EmailEditor,
  parameters: { layout: 'centered' },
  args: { recipient: 'kavya.reddy@gmail.com' },
  argTypes: { onSend: { control: false }, onDiscard: { control: false } },
  decorators: [(Story) => <div style={{ width: 720 }}><Story /></div>],
} satisfies Meta<typeof EmailEditor>

export default meta
type Story = StoryObj<typeof meta>

/** An editor you can type in. Bold, italic, underline, strikethrough, align left and link work; Send turns on once there is text. */
export const Playground: Story = {}
