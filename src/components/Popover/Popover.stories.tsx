import { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'
import { Popover } from './Popover'
import type { PopoverPlacement } from './Popover'

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>

export default meta

type PlaygroundArgs = { placement: PopoverPlacement; matchAnchorWidth: boolean }

/** Places any panel under a button. Click the button, then click outside or press Escape to close it. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { placement: 'bottom-start', matchAnchorWidth: false },
  argTypes: {
    placement: { control: 'inline-radio', options: ['bottom-start', 'bottom-end'], description: 'Which edge of the button the panel lines up with' },
    matchAnchorWidth: { control: 'boolean', description: 'Make the panel at least as wide as the button' },
  },
  render: function Render({ placement, matchAnchorWidth }) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)
    return (
      <>
        <span ref={ref} style={{ display: 'inline-block' }}>
          <Button variant="secondary" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)}>Open popover</Button>
        </span>
        <Popover open={open} onClose={() => setOpen(false)} anchorRef={ref} placement={placement} matchAnchorWidth={matchAnchorWidth}>
          <Dropdown options={[{ value: 'a', label: 'First option' }, { value: 'b', label: 'Second option' }, { value: 'c', label: 'Third option' }]} defaultValue="a" onChange={() => setOpen(false)} />
        </Popover>
      </>
    )
  },
}
