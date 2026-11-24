# AllViewsSidebar
`import { AllViewsSidebar } from './patterns/AllViewsSidebar'` — Every view of an inbox, favourites first.
- `title?`: string (default All Views) — The heading at the top.
- `subtitle?`: string — The line under the heading: the inbox the views belong to.
- `favorites`: AllViewsSidebarItem[] — The views under "My favorites" to begin with, at the top.
- `others`: AllViewsSidebarItem[] — The other views, under a line.
- `maxFavorites?`: number (default 5) — The most views that can be favourites at once.
- `onFavoritesChange?`: function
- `value?`: string — The id of the selected view.
- `onSelect?`: function
- `onBack?`: function
- `onCreate?`: function
