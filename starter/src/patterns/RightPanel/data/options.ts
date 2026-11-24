import type { AvatarColor } from '../../../components/Avatar'
import type { IconName } from '../../../icons'

/** The choices in the Status field of the top section. The same three for every channel. */
export type StatusOption = { value: 'open' | 'pending' | 'closed'; label: string; icon: IconName }
export const statusOptions: StatusOption[] = [
  { value: 'open', label: 'Open', icon: 'openstatus' },
  { value: 'pending', label: 'Pending', icon: 'pendingstatus' },
  { value: 'closed', label: 'Closed', icon: 'closedstatus' },
]

/** A person who can own a conversation. Example people for the stories; a product would load them. */
export type Assignee = { value: string; label: string; color: AvatarColor; status?: 'online' | 'offline' }
export const sampleAssignees: Assignee[] = [
  { value: 'aarav', label: 'Aarav Mehta (Me)', color: 'red' },
  { value: 'priya', label: 'Priya Nair', color: 'yellow' },
  { value: 'rohan', label: 'Rohan Iyer', color: 'grey' },
  { value: 'emma', label: 'Emma Clarke', color: 'purple' },
  { value: 'liam', label: 'Liam Carter', color: 'orange' },
  { value: 'sophie', label: 'Sophie Turner', color: 'violet' },
  { value: 'daniel', label: 'Daniel Brooks', color: 'grey' },
]
