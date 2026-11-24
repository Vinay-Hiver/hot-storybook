import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menu } from './Menu'

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: { layout: 'centered' },
  argTypes: { items: { table: { disable: true } }, onSelect: { table: { disable: true } }, className: { table: { disable: true } } },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

/** The Edit and Delete menu of a row. Point at a row to see its hover. */
export const Default: Story = {
  args: { items: [{ value: 'edit', label: 'Edit', icon: 'edit' }, { value: 'delete', label: 'Delete', icon: 'delete' }] },
}

/** Without icons. */
export const TextOnly: Story = {
  args: { items: [{ value: 'a', label: 'Rename' }, { value: 'b', label: 'Duplicate' }, { value: 'c', label: 'Archive' }] },
}
