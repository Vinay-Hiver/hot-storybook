import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = { title: 'Foundations/Typography', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

const groups = [
  { title: 'Body', weight: 'Regular 400', items: [['xs', 'body-xs-regular', 12, 18], ['sm', 'body-sm-regular', 13, 19], ['md', 'body-md-regular', 14, 20], ['lg', 'body-lg-regular', 16, 24]] },
  { title: 'Body', weight: 'Medium 500', items: [['xs', 'body-xs-medium', 12, 18], ['sm', 'body-sm-medium', 13, 19], ['md', 'body-md-medium', 14, 20], ['lg', 'body-lg-medium', 16, 24], ['xl', 'body-xl-medium', 18, 28], ['2xl', 'body-2xl-medium', 20, 30]] },
  { title: 'Body', weight: 'Semi Bold 600', items: [['xs', 'body-xs-semibold', 12, 18], ['sm', 'body-sm-semibold', 13, 19], ['md', 'body-md-semibold', 14, 20], ['lg', 'body-lg-semibold', 16, 24]] },
  { title: 'Heading', weight: 'Semi Bold 600', items: [['sm', 'heading-sm', 16, 22], ['md', 'heading-md', 18, 28], ['lg', 'heading-lg', 20, 28]] },
  { title: 'Display', weight: 'Semi Bold 600', items: [['md', 'display-md', 24, 32], ['lg', 'display-lg', 28, 36]] },
  { title: 'Caption and overline', weight: 'Regular 400 / Medium 500', items: [['caption/regular', 'caption-regular', 12, 14], ['caption/medium', 'caption-medium', 12, 14], ['overline', 'overline', 12, 14]] },
] as const

export const TypeScale: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--fontFamily)', color: 'var(--slateTextBody)', padding: '32px 40px 64px', minHeight: '100vh', boxSizing: 'border-box', background: 'var(--slateSurfaceWhite)' }}>
      <h1 className="text-display-lg" style={{ margin: '0 0 32px', color: 'var(--slateTextTitle)' }}>Typography</h1>
      {groups.map((g) => (
        <section key={g.title + g.weight} style={{ marginBottom: 32 }}>
          <h2 className="text-body-lg-medium" style={{ margin: '0 0 8px', color: 'var(--slateTextTitle)' }}>
            {g.title} <span className="text-body-xs-regular" style={{ color: 'var(--slateTextSubtle)' }}>· {g.weight}</span>
          </h2>
          {g.items.map(([name, cls, size, lh]) => (
            <div key={cls} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', alignItems: 'baseline', gap: 16, padding: '10px 0', borderTop: '1px solid var(--slateBorderLight)' }}>
              <div>
                <div className="text-body-md-medium">{g.title}/{name}</div>
                <div className="text-body-xs-regular" style={{ color: 'var(--slateTextSubtle)' }}>{size}px / {lh}px · <code>.text-{cls}</code></div>
              </div>
              <div className={`text-${cls}`}>The quick brown fox jumps over the lazy dog</div>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
}
