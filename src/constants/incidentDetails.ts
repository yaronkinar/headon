export const SEVERITY = {
  DANGER: 'danger',
  SECONDARY: 'secondary',
} as const

export const REJECT_PROPS = {
  severity: SEVERITY.SECONDARY,
  outlined: true,
} as const
