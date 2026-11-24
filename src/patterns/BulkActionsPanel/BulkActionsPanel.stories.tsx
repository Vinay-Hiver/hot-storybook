import type { Meta, StoryObj } from '@storybook/react-vite'
import { BulkActionsPanel } from './BulkActionsPanel'

const meta = {
  title: 'Patterns/Bulk actions panel',
  component: BulkActionsPanel,
  parameters: { layout: 'fullscreen' },
  argTypes: { onAction: { table: { disable: true } }, onCancel: { table: { disable: true } }, className: { table: { disable: true } } },
} satisfies Meta<typeof BulkActionsPanel>

export default meta
type Story = StoryObj<typeof meta>

/** Change the number of selected items from the Controls panel. One reads "1 item selected". */
export const Default: Story = {
  args: { count: 2 },
  render: (args) => <div style={{ height: 480, display: 'flex' }}><BulkActionsPanel {...args} /></div>,
}
