import type { Preview } from '@storybook/react-vite'
import '../src/tokens/tokens.css'
import '../src/tokens/typography.css'

/**
 * Plain on/off props where "not passed" means the same as `false`. These start at `false` in the Controls
 * panel, so they show a toggle instead of the "Set boolean" button, and the Default column says `false`
 * instead of a hyphen. Booleans that are not listed (for example `open`, `expanded`, `checked`) are
 * controlled: leaving them out means "the component decides", which is different from `false`.
 */
const plainFlags = new Set([
  'disabled', 'error', 'invalid', 'required', 'search', 'fullWidth', 'indeterminate', 'iconOnly', 'loading',
  'compact', 'divided', 'searchable', 'reorderable', 'customizeWidgets', 'hasCount', 'dismissible', 'showClose', 'portal',
])

type ArgTypeLike = { type?: { name?: string; value?: unknown }; control?: unknown; table?: { disable?: boolean; defaultValue?: { summary?: string } } }

/** Props that cannot be set from a panel: handlers, class names, styles, refs, children, the Storybook-only `force…` props, and anything a story marks `control: false`. They are hidden from the Controls panel instead of showing a hyphen. */
const notSettable = (key: string, a: ArgTypeLike) =>
  a.control === false || (typeof a.control === 'object' && a.control !== null && (a.control as { disable?: boolean }).disable === true) || /^(on[A-Z].*|className|style|ref|key|children|force[A-Z].*)$/.test(key) || a.type?.name === 'function'

const isBoolean = (a: ArgTypeLike) => a.type?.name === 'boolean' || (typeof a.control === 'object' && a.control !== null && (a.control as { type?: string }).type === 'boolean')

/** The default from the component's own code (read by Storybook), as true / false when it is one. */
const docDefault = (a: ArgTypeLike): boolean | undefined => {
  const s = a.table?.defaultValue?.summary
  return s === 'true' ? true : s === 'false' ? false : undefined
}

/**
 * The order of the rows in the Controls panel, the same for every component: what kind of thing it is, then its
 * content (label, text, helper), then its look and add-ons (size, prefix, suffix, action), then its state and
 * behaviour (selected, error, disabled, required, width). Props that are not listed go after the look group.
 */
const controlOrder = [
  // kind
  'kind', 'example', 'variant', 'type', 'display', 'channel', 'color',
  // content
  'showLabel', 'label', 'showTitle', 'title', 'titleIcon', 'icon', 'initial', 'text', 'content', 'showDescription', 'description',
  'showAction', 'actionLabel', 'placeholder', 'searchPlaceholder', 'showHelper', 'helperText', 'subtitle', 'inboxEmail',
  'removable', 'removeLabel', 'buttons', 'openInbox', 'inboxId', 'settingsItem', 'showCounts', 'show', 'tabs', 'tabCount',
  'counts', 'rowCount', 'actionCount', 'options', 'name',
  // look and add-ons
  'size', 'width', 'placement', 'status', 'time', 'iconLeft', 'iconRight', 'leading', 'rightElement', 'trailing', 'prefix',
  'suffix', 'search', 'action', 'showCount', 'compact', 'switcher', 'switchOptions', 'switchValue', 'showClose',
]
const lateOrder = [
  // state and behaviour
  'selected', 'hovered', 'hoverRow', 'checked', 'indeterminate', 'activeTab', 'visibleIds', 'open', 'portal', 'boundary', 'gap',
  'searchable', 'reorderable', 'customizeWidgets', 'helpMenu', 'subNav', 'error', 'invalid', 'disabled', 'required', 'fullWidth',
  'aria-label', 'removeLabel',
]
const rankOf = (key: string) => {
  const early = controlOrder.indexOf(key)
  if (early >= 0) return early
  const late = lateOrder.indexOf(key)
  return late >= 0 ? controlOrder.length + 1 + late : controlOrder.length
}

/** Runs after Storybook's own argTypes steps (`secondPass`), so its order and hiding are the ones that stay. */
const tidyArgTypes = Object.assign(
  ({ argTypes, initialArgs }: { argTypes: Record<string, unknown>; initialArgs?: Record<string, unknown> }) => {
    const next: Record<string, ArgTypeLike> = {}
    // Props that are only passed as starting values (for example `placeholder`) are added here too, so they can be placed in the order below
    const all: Record<string, ArgTypeLike> = { ...(argTypes as Record<string, ArgTypeLike>) }
    for (const [key, v] of Object.entries(initialArgs ?? {})) if (!(key in all) && ['string', 'boolean', 'number'].includes(typeof v)) all[key] = { name: key } as ArgTypeLike
    for (const [key, a0] of Object.entries(all)) {
      // Storybook lists props without a declared type first. Giving them the type of their starting value keeps them in the order set below.
      const valueType = typeof initialArgs?.[key]
      const a: ArgTypeLike = !a0.type && (valueType === 'string' || valueType === 'boolean' || valueType === 'number') ? { ...a0, type: { name: valueType } } : a0
      if (notSettable(key, a)) next[key] = { ...a, table: { ...a.table, disable: true } }
      else if (isBoolean(a) && plainFlags.has(key) && !a.table?.defaultValue) next[key] = { ...a, table: { ...a.table, defaultValue: { summary: 'false' } } }
      else next[key] = a
    }
    const sorted = Object.entries(next).map((e, i) => ({ e, i })).sort((a, b) => rankOf(a.e[0]) - rankOf(b.e[0]) || a.i - b.i).map((x) => x.e)
    return Object.fromEntries(sorted) as typeof argTypes
  },
  { secondPass: true },
)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    // No background or grid buttons in the toolbar
    backgrounds: { disable: true },

    options: {
      // The sections in a fixed order, and everything inside a section (components, patterns, pages) alphabetically.
      // The stories of one component keep the order they are written in, so Playground stays first.
      storySort: (a, b) => {
        const sections = ['Foundations', 'Components', 'Patterns', 'Pages', 'Admin panel']
        const fixed = { Foundations: ['Colors', 'Typography', 'Icons'], Pages: ['Home page', 'Admin panel'] }
        if (a.title === b.title) return 0
        const pa = a.title.split('/')
        const pb = b.title.split('/')
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
          const x = pa[i]
          const y = pb[i]
          if (x === y) continue
          if (x === undefined) return -1
          if (y === undefined) return 1
          const list = i === 0 ? sections : fixed[pa[0]]
          if (list) {
            const ix = list.indexOf(x)
            const iy = list.indexOf(y)
            if (ix !== iy) return (ix < 0 ? list.length : ix) - (iy < 0 ? list.length : iy)
          }
          return x.localeCompare(y, undefined, { sensitivity: 'base' })
        }
        return 0
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },

  argTypesEnhancers: [
    tidyArgTypes,
  ],
  argsEnhancers: [
    ({ argTypes, initialArgs }) => {
      const out: Record<string, boolean> = {}
      for (const [key, a] of Object.entries(argTypes as Record<string, ArgTypeLike>)) {
        if (!isBoolean(a) || (initialArgs as Record<string, unknown>)[key] !== undefined) continue
        const d = docDefault(a)
        if (d !== undefined) out[key] = d
        else if (plainFlags.has(key)) out[key] = false
      }
      return out
    },
  ],
};

export default preview;
