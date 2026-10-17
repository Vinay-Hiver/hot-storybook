import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from './Dropdown'
import type { DropdownOption, DropdownVariant } from './Dropdown'

const options = [
  { value: 'important', label: 'Important', status: 'online' as const },
  { value: 'urgent', label: 'Urgent', status: 'online' as const },
  { value: 'vip', label: 'VIP', status: 'offline' as const },
  { value: 'active', label: 'Active', status: 'offline' as const },
]
// Each row of the icon style names its own icon. These are example icons for the story.
const rowIcons = ['flag', 'notification', 'tag', 'info'] as const
const optionsFor = (v: DropdownVariant): DropdownOption[] => (v === 'icon' ? options.map((o, i) => ({ ...o, icon: rowIcons[i] })) : options)
const variants: DropdownVariant[] = ['checkbox', 'avatar', 'icon', 'radio', 'default']
const selectedFor = (v: DropdownVariant) => (v === 'checkbox' ? ['important', 'urgent'] : 'important')

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'padded' },
  args: { options, title: 'Tag', searchPlaceholder: 'Search tags' },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    searchable: { control: 'boolean' },
    options: { control: false },
    actions: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onChange: { control: false },
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

type PlaygroundArgs = { variant: DropdownVariant; showTitle: boolean; title: string; searchable: boolean; reorderable: boolean; buttons: boolean }

/** One menu you can change from the Controls panel. */
export const Playground: StoryObj<PlaygroundArgs> = {
  parameters: { layout: 'centered' },
  args: { variant: 'checkbox', showTitle: true, title: 'Tag', searchable: true, reorderable: false, buttons: true },
  argTypes: {
    variant: { control: 'select', options: variants, description: 'How each row looks' },
    showTitle: { control: 'boolean', name: 'title', description: 'Show a heading at the top of the panel. Leave it off for a menu that opens from a field, such as Assignee or Status' },
    title: { control: 'text', name: 'title text', if: { arg: 'showTitle' } },
    searchable: { control: 'boolean', description: 'Search box above the options' },
    reorderable: { control: 'boolean', description: 'Drag handle on the right of each row, shown on hover' },
    buttons: { control: 'boolean', description: 'Cancel and Apply buttons below' },
  },
  render: function Render({ variant, showTitle, title, searchable, reorderable, buttons }) {
    const [order, setOrder] = useState<string[]>([])
    const base = optionsFor(variant)
    // Rows come back in the order they were dragged to
    const shown = order.length ? [...base].sort((a, b) => order.indexOf(a.value) - order.indexOf(b.value)) : base
    return (
      <Dropdown
        key={variant} variant={variant} title={showTitle ? title : undefined} options={shown} searchable={searchable} searchPlaceholder="Search tags"
        reorderable={reorderable} onReorder={setOrder} actions={buttons ? {} : undefined} defaultValue={selectedFor(variant)}
      />
    )
  },
}

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }

// The stories below feed the Docs page and are hidden from the sidebar.
export const Styles: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={row}>
      {variants.map((v) => (
        <Dropdown key={v} variant={v} title="Tag" options={optionsFor(v)} searchable searchPlaceholder="Search tags" actions={{}} defaultValue={selectedFor(v)} />
      ))}
    </div>
  ),
}

export const SearchAndButtons: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={row}>
      <Dropdown variant="checkbox" title="Tag" options={options} searchable searchPlaceholder="Search tags" actions={{}} defaultValue={selectedFor('checkbox')} />
      <Dropdown variant="checkbox" title="Tag" options={options} actions={{}} defaultValue={selectedFor('checkbox')} />
      <Dropdown variant="checkbox" title="Tag" options={options} searchable searchPlaceholder="Search tags" defaultValue={selectedFor('checkbox')} />
      <Dropdown variant="checkbox" title="Tag" options={options} defaultValue={selectedFor('checkbox')} />
    </div>
  ),
}

const label: React.CSSProperties = { font: '500 12px/16px var(--fontFamily)', color: 'var(--slateTextSubtle)', marginBottom: 12 }

/** Five row styles, each with and without search and buttons. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 56, fontFamily: 'var(--fontFamily)' }}>
      {variants.map((variant) => (
        <section key={variant}>
          <h3 style={{ font: '500 16px/24px var(--fontFamily)', margin: '0 0 20px', textTransform: 'capitalize' }}>{variant}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
            {[
              { name: 'Search + buttons', searchable: true, actions: {} },
              { name: 'Buttons only', searchable: false, actions: {} },
              { name: 'Search only', searchable: true, actions: undefined },
              { name: 'Neither', searchable: false, actions: undefined },
            ].map((c) => (
              <div key={c.name}>
                <div style={label}>{c.name}</div>
                <Dropdown variant={variant} title="Tag" options={optionsFor(variant)} searchable={c.searchable} searchPlaceholder="Search tags" actions={c.actions} defaultValue={selectedFor(variant)} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}

/** Rows are not tied to the list style: any row can bring its own `icon`, so one list can mix them. Here a "None" row with an icon sits above rows with coloured avatars. */
export const MixedRows: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <Dropdown
      variant="avatar" searchable searchPlaceholder="Search Assignee" defaultValue="me"
      options={[
        { value: 'none', label: 'None', icon: 'user', iconBackground: true },
        { value: 'me', label: 'Praveen Borawar (Me)', color: 'red' },
        { value: 'abhay', label: 'Abhay', color: 'yellow' },
        { value: 'aditya', label: 'Aditya S', color: 'grey', status: 'offline' },
        { value: 'akash', label: 'Akash Mishra', color: 'purple' },
      ]}
    />
  ),
}
