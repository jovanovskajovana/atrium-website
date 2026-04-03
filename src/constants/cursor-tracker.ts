export type CursorTrackerMode = 'default' | 'interactive' | 'project'

export const CURSOR_TRACKER_SELECTORS =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'

export const CURSOR_TRACKER = {
  LERP: 0.18,
  BASE_VW: 1.5,
  HOVER_GROW: 3,
  PROJECT_GROW: 4,
  ARROW_VW: 1.8,
} as const
