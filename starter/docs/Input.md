# Input
`import { Input } from './components/Input'`
- `label?`: ReactNode — Label shown above the field.
- `helperText?`: ReactNode — Small text below the field.
- `error?`: boolean — Shows the error border and red helper text.
- `success?`: boolean — Turns the helper text green with a tick before it.
- `helperIcon?`: "search" | "send" | "document" | "link" | "note" | "status" | "switch" | "timer" | "text" | "account" | "add"… — A 16px icon before the helper text, by name from the HOT icon set (for example info).
- `size?`: "sm" | "md" (default md) — sm = 32px, md = 40px tall.
- `prefix?`: ReactNode — Content before the text, such as a 14px <Icon> or a fixed string like "https://".
- `search?`: boolean — Makes it a search field: a 16px search icon before the text and type="search".
- `suffix?`: ReactNode | { count: true; } — Content after the text: a 14px or 16px <Icon> (for example a chevron on a dropdown f…
- `action?`: { label: string; onClick?: (() => void) | undefined; } — A divided action on the right edge (Figma "With CTA"), for example "Copy".
- `fullWidth?`: boolean — Stretch to the width of the parent instead of 320px.
- `tags?`: string[] — Turns the field into a tags input.
- `defaultTags?`: string[] — Initial tags when the field manages them itself.
- `onTagsChange?`: function
- `country?`: Country — Turns the field into a phone input, with a country button before the number.
- `onCountryClick?`: function
- `countries?`: ListedCountry[] — A list of countries.
- `countryId?`: string — Which country in countries starts ticked in the list, for example "US".
- `onCountryChange?`: function
- `countryListOpen?`: boolean — Shows the country list open.

```tsx
<Input label="Email" placeholder="name@company.com" prefix={<Icon name="mailbox" size={14} />} helperText="We never share it" />
```
