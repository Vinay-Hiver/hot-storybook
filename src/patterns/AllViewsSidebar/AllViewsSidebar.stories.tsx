import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AllViewsSidebar } from './AllViewsSidebar'

const favorites = [
  { id: 'mine', label: 'Mine', icon: 'user', count: 1 },
  { id: 'unassigned', label: 'Unassigned', icon: 'unassigned2', count: 85 },
  { id: 'team', label: 'Team', icon: 'team', count: 1 },
  { id: 'tickets', label: 'Tickets', icon: 'ticket', count: 0 },
] as const
const others = [
  { id: 'pending', label: 'Pending', icon: 'pendingstatus', count: 2 },
  { id: 'closed', label: 'Closed', icon: 'tick2', count: 1 },
  { id: 'overdue', label: 'Overdue', icon: 'timer', count: 0 },
  { id: 'dueSoon', label: 'Due Soon', icon: 'clock', count: 0 },
] as const

const meta = {
  title: 'Patterns/All Views sidebar',
  component: AllViewsSidebar,
  parameters: { layout: 'centered' },
  argTypes: { favorites: { table: { disable: true } }, others: { table: { disable: true } }, value: { table: { disable: true } }, onSelect: { table: { disable: true } }, onBack: { table: { disable: true } }, onCreate: { table: { disable: true } }, className: { table: { disable: true } } },
} satisfies Meta<typeof AllViewsSidebar>

export default meta
type Story = StoryObj<typeof meta>

/** Type in the search field to narrow both lists, and click a view to select it. */
export const Default: Story = {
  args: { title: 'All Views', subtitle: 'Customer Support', favorites: [...favorites], others: [...others] },
  render: function Render(args) {
    const [value, setValue] = useState<string | undefined>('mine')
    return <div style={{ height: 480 }}><AllViewsSidebar {...args} value={value} onSelect={setValue} /></div>
  },
}
