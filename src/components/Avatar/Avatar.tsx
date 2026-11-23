import type { HTMLAttributes } from 'react'
import './Avatar.css'

export type AvatarColor = 'lightBlue' | 'red' | 'orange' | 'yellow' | 'green' | 'purple' | 'violet' | 'grey'

export type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** The letter shown in the circle. Only the first letter is used. */
  initial: string
  /** Default is 24px, small is 18px and large is 32px. */
  size?: 'default' | 'small' | 'large'
  /** Shows the status dot at the bottom right. Off by default. */
  showStatus?: boolean
  /** With `showStatus`: a green dot when online (default), a grey dot when offline. */
  status?: 'online' | 'offline'
  /** Background colour of the circle. Default is light blue. */
  color?: AvatarColor
  /** Accessible name, for example the person's full name. The avatar is hidden from screen readers without it. */
  title?: string
}

export function Avatar({ initial, size = 'default', showStatus = false, status = 'online', color, title, className, ...rest }: AvatarProps) {
  const classes = ['hot-avatar', size === 'small' && 'hot-avatar--small', size === 'large' && 'hot-avatar--large', color && `hot-avatar--${color}`, className].filter(Boolean).join(' ')
  return (
    <span className={classes} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...rest}>
      {initial.charAt(0).toUpperCase()}
      {showStatus && <span className={`hot-avatar__status hot-avatar__status--${status}`} />}
    </span>
  )
}
