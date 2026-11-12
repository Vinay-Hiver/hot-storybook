import type { Meta, StoryObj } from '@storybook/react-vite'
import tokens from '../tokens/tokens.json'

const meta: Meta = { title: 'Foundations/Spacing', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

const page: React.CSSProperties = { fontFamily: 'var(--fontFamily)', color: 'var(--slateTextBody)', padding: '32px 40px 64px', minHeight: '100vh', boxSizing: 'border-box', background: 'var(--slateSurfaceWhite)' }
const h1: React.CSSProperties = { font: 'var(--text-heading-lg)', margin: '0 0 8px', color: 'var(--slateTextTitle)' }
const note: React.CSSProperties = { font: 'var(--text-body-md-regular)', margin: '0 0 32px', color: 'var(--slateTextSubtle)' }
const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: '160px 80px 1fr', alignItems: 'center', gap: 16, minHeight: 32, borderBottom: '1px solid var(--slateBorderMild)' }
const mono: React.CSSProperties = { font: '400 12px/16px ui-monospace, SFMono-Regular, Menlo, monospace' }
const copy = (t: string) => navigator.clipboard?.writeText(t)

type Item = { key: string; name: string; value: number; alias?: string }

function Rows({ items, visual }: { items: Item[]; visual: (v: number) => React.ReactNode }) {
  return (
    <div>
      {items.map((t) => (
        <div key={t.name} style={{ ...row, cursor: 'pointer' }} title={`Click to copy var(${t.name})`} onClick={() => copy(`var(${t.name})`)}>
          <span style={mono}>{t.name}</span>
          <span style={{ font: 'var(--text-body-sm-medium)' }}>{t.value === 9999 ? 'full' : `${t.value}px`}</span>
          <div>{visual(t.value)}</div>
        </div>
      ))}
    </div>
  )
}

const bar = (v: number) => <div style={{ height: 16, width: Math.min(v, 384), background: 'var(--primarySurfaceLighter)', borderRadius: 2 }} />
const box = (v: number) => <div style={{ width: 48, height: 48, border: '2px solid var(--primaryBorderDefault)', background: 'var(--primarySurfaceSubtle)', borderRadius: v === 9999 ? 9999 : Math.min(v, 24) }} />
const icon = (v: number) => <div style={{ width: v, height: v, background: 'var(--slateSurfaceDarkest)', borderRadius: 2 }} />

const section = (title: string, text: string, items: Item[], visual: (v: number) => React.ReactNode): Story => ({
  render: () => (
    <div style={page}>
      <h1 style={h1}>{title}</h1>
      <p style={note}>{text} Click a row to copy the variable.</p>
      <Rows items={items} visual={visual} />
    </div>
  ),
})

export const Spacing: Story = section('Spacing', 'Gaps and padding. Each token aliases a value on the scale.', tokens.numeric.spacing, bar)
export const Radius: Story = section('Radius', 'Corner radius. Boxes above 24px are drawn at 24px so the row stays readable.', tokens.numeric.radius, box)
export const IconSize: Story = section('Icon size', 'Icon box sizes.', tokens.numeric.iconSize, icon)
export const Scale: Story = section('Scale', 'The raw numbers the other tokens point to.', tokens.numeric.scale, bar)
