import React, { FC } from 'react'

import { CURSOR_TRACKER } from '@/constants/cursor-tracker'

import { IconProps } from '@/interfaces/ui'

const IconArrow: FC<IconProps> = ({ className }) => (
  <svg
    width={`${CURSOR_TRACKER.ARROW_VW}vw`}
    height={`${CURSOR_TRACKER.ARROW_VW}vw`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M7 17L17 7M17 7h-6M17 7v6"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default IconArrow
