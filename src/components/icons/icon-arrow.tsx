import React, { FC } from 'react'

import { IconProps } from '@/interfaces/ui'

const IconArrow: FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path d="M4 12l8-8M12 9V4H7" />
  </svg>
)

export default IconArrow
