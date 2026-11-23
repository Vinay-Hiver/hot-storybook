# RadioGroup
`import { RadioGroup } from './components/Radio'`
- `label?`: ReactNode — Label above the options.
- `required?`: boolean — Shows the red asterisk after the label.
- `value?`: string — Selected value when you control it yourself.
- `defaultValue?`: string — Initially selected value when the group manages itself.
- `onChange?`: function
- `disabled?`: boolean
- `name?`: string

```tsx
<RadioGroup label="Priority" name="p" value={p} onChange={setP}><Radio value="low" label="Low" /><Radio value="high" label="High" /></RadioGroup>
```
