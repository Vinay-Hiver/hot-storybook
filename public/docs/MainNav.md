# MainNav
`import { MainNav } from './patterns/MainNav'`
- `items`: MainNavItem[] — The icons under the logo.
- `value?`: string — The id of the selected item.
- `onChange?`: function
- `footerItems?`: MainNavItem[] (default []) — The small icons above the avatar, such as help and chat.
- `onFooterClick?`: function
- `user?`: { initial: string; name?: string | undefined; showStatus?:… — The person's letter, shown at the bottom.
- `userMenu?`: Omit<UserMenuProps, "onSelect"> — Fills the menu that opens from the avatar.
- `helpMenu?`: boolean (default true) — Opens the Help Center menu when the footer item with the id help is clicked.
- `onMenuSelect?`: function
