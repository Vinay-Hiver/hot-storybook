export type Country = {
  /** Shown to screen readers, for example "United States". */
  name: string
  /** For example "+1". */
  dialCode: string
  /** The flag: an emoji, for example "🇺🇸". */
  flag: React.ReactNode
}

/** The default country of the phone input stories: the United States, with an emoji flag like every country in the list. Pass your own `country` for others. */
export const unitedStates: Country = { name: 'United States', dialCode: '+1', flag: '🇺🇸' }

/** A country in the list, as in the product: an emoji flag, a name and a dial code. */
export type ListedCountry = {
  id: string
  name: string
  dialCode: string
  /** An emoji flag, as in the product. */
  flag: string
}

export const toCountry = (c: ListedCountry): Country => ({ name: c.name, dialCode: c.dialCode, flag: c.flag })
