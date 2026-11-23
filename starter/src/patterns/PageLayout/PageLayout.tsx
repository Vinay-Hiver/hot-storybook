import type { ReactNode } from 'react'
import './PageLayout.css'

export type PageLayoutProps = {
  /**
   * Which page anatomy to use.
   * `home`: Main nav, a sidebar, the content and the right panel.
   * `admin`: Main nav, the Admin sidebar, a sub-nav and the content (no right panel).
   * More layouts will be added here as they are built.
   */
  variant?: 'home' | 'admin'
  /** The Main nav. Always 50px wide. */
  nav: ReactNode
  /** The Conversations sidebar or the Admin sidebar. Both are 240px wide. The `admin` variant uses the Admin sidebar. */
  sidebar: ReactNode
  /** The page content. It takes all the space that is left, so its width follows the browser. */
  children: ReactNode
  /** Hides the sidebar so the content moves up next to the Main nav. The Main nav stays. */
  sidebarCollapsed?: boolean
  /** A second 240px column next to the sidebar, used by the `admin` variant. */
  subNav?: ReactNode
  /** The right panel. Always 320px wide. Leave out when the page has none. */
  rightPanel?: ReactNode
  className?: string
}

export function PageLayout({ variant = 'home', nav, sidebar, sidebarCollapsed, children, subNav, rightPanel, className }: PageLayoutProps) {
  return (
    <div className={['hot-page-layout', `hot-page-layout--${variant}`, className].filter(Boolean).join(' ')}>
      <div className="hot-page-layout__nav">{nav}</div>
      <div className={['hot-page-layout__sidebar', sidebarCollapsed && 'hot-page-layout__sidebar--collapsed'].filter(Boolean).join(' ')} aria-hidden={sidebarCollapsed || undefined}>{sidebar}</div>
      {subNav && <div className="hot-page-layout__sub-nav">{subNav}</div>}
      <main className="hot-page-layout__content">{children}</main>
      {rightPanel && <aside className="hot-page-layout__right-panel">{rightPanel}</aside>}
    </div>
  )
}
