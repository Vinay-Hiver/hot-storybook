import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pill } from './Pill'
import type { PillStatus } from './Pill'

const meta = {
  title: 'Components/RT∕FRT Pill',
  component: Pill,
  parameters: { layout: 'padded' },
  args: { kind: 'frt', status: 'upcoming' },
  argTypes: {
    kind: { control: 'inline-radio', options: ['frt', 'rt'] },
    status: { control: 'inline-radio', options: ['upcoming', 'due', 'overdue', 'done'] },
  },
} satisfies Meta<typeof Pill>

export default meta
type Story = StoryObj<typeof meta>

/** One pill you can change from the Controls panel. */
export const Playground: Story = { parameters: { layout: 'centered' } }

const statuses: PillStatus[] = ['upcoming', 'due', 'overdue', 'done']
const label: React.CSSProperties = { font: '500 12px/18px var(--fontFamily)', color: 'var(--slateTextSubtle)', textTransform: 'capitalize' }
const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: '100px 60px 60px', gap: '16px 16px', alignItems: 'center', justifyItems: 'start', fontFamily: 'var(--fontFamily)' }

// The stories below feed the Docs page and are hidden from the sidebar.
export const Statuses: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={grid}>
      {statuses.map((s) => (
        <>
          <span key={`${s}-l`} style={label}>{s}</span>
          <Pill key={`${s}-f`} kind="frt" status={s} />
          <Pill key={`${s}-r`} kind="rt" status={s} />
        </>
      ))}
    </div>
  ),
}

/** The pills as drawn in Figma: first response time and resolution time in each of the four states. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={grid}>
      {statuses.map((s) => (
        <>
          <span key={`${s}-l`} style={label}>{s}</span>
          <Pill key={`${s}-f`} kind="frt" status={s} />
          <Pill key={`${s}-r`} kind="rt" status={s} />
        </>
      ))}
    </div>
  ),
}
