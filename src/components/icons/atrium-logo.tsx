import React, { FC } from 'react'

import { IconProps } from '@/interfaces/ui'

const AtriumLogo: FC<IconProps> = ({ fillColor = '#1d1d1b', className }) => (
  <svg
    width="118"
    height="117"
    viewBox="0 0 118 117"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className={className}
  >
    <path
      d="M117.461 1.09981H65.1402H52.9997H0.678955V13.0878H47.5435L0.678955 116.08H13.9626L22.0545 98.1482L32.7174 74.3273H32.6625L41.1288 55.5405H41.1338L59.0699 13.0878L75.9278 54.1107L75.9428 54.1357L84.9882 74.3273H84.9283L95.5362 98.1632L103.518 116.08H117.461L70.5964 13.0878H117.461V1.09981Z"
      fill={fillColor}
    />
  </svg>
)

export default AtriumLogo
