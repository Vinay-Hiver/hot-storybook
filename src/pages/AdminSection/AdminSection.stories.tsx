import type { Meta, StoryObj } from '@storybook/react-vite'
import { AdminSectionPage } from './AdminSectionPage'

const meta = {
  title: 'Admin panel/Schedule and Settings',
  component: AdminSectionPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AdminSectionPage>

export default meta
type Story = StoryObj<typeof meta>

/** Admin panel > Schedule or Settings. Pick a section; the Sub-nav lists its pages. */
export const Playground: Story = {
  args: { section: 'schedule' },
  argTypes: { section: { control: 'inline-radio', options: ['schedule', 'settings'], description: 'Which admin section' }, item: { control: false } },
  render: (args) => <div style={{ height: '100vh' }}><AdminSectionPage key={args.section} {...args} /></div>,
}
