import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TagsSidebar } from './TagsSidebar'
import type { TagsSidebarTag } from './TagsSidebar'

export const sampleTags: TagsSidebarTag[] = [
  { id: 'first', label: 'first', color: 'purple', count: 1 },
  { id: 'second', label: 'second', color: 'red', count: 1 },
]

const meta = {
  title: 'Patterns/Tags sidebar',
  component: TagsSidebar,
  parameters: { layout: 'centered' },
  argTypes: { tags: { table: { disable: true } }, value: { table: { disable: true } }, onSelect: { table: { disable: true } }, onBack: { table: { disable: true } }, onCreate: { table: { disable: true } }, className: { table: { disable: true } } },
} satisfies Meta<typeof TagsSidebar>

export default meta
type Story = StoryObj<typeof meta>

/** Type in the search field to narrow the list, and click a tag to select it. */
export const Default: Story = {
  args: { title: 'Tags', subtitle: 'Website Chat', tags: sampleTags },
  render: function Render(args) {
    const [value, setValue] = useState<string | undefined>()
    return <div style={{ height: 480 }}><TagsSidebar {...args} value={value} onSelect={setValue} /></div>
  },
}

/** Every pastel colour a tag can have. */
export const Colours: Story = {
  args: { title: 'Tags', subtitle: 'Email', tags: (['default', 'yellow', 'lightBlue', 'green', 'purple', 'orange', 'red', 'violet'] as const).map((c, i) => ({ id: c, label: c, color: c, count: i + 1 })) },
  render: (args) => <div style={{ height: 480 }}><TagsSidebar {...args} /></div>,
}
