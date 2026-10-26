import { addons } from 'storybook/manager-api'
import hotTheme from './hotTheme'

addons.setConfig({ theme: hotTheme })

// Storybook titles the tab "Page ⋅ Storybook"; flip it to "Storybook • Page".
const flipTitle = () => {
  const match = document.title.match(/^(.+?)\s*⋅\s*Storybook$/)
  if (match) document.title = `Storybook • ${match[1]}`
}
new MutationObserver(flipTitle).observe(document.querySelector('head > title') ?? document.head, {
  childList: true,
  subtree: true,
  characterData: true,
})
flipTitle()
