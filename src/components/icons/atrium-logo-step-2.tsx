import React, { FC } from 'react'

import { IconProps } from '@/interfaces/ui'

const AtriumLogoStep2: FC<IconProps> = ({
  fillColor = '#141715',
  className,
}) => (
  <svg
    width="117"
    height="115"
    viewBox="0 0 117 115"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className={className}
  >
    <path
      d="M116.782 0H64.4612H52.3208H0V11.988H46.8645L0 114.98H13.2836L21.3756 97.0484L32.0384 73.2275H31.9835L40.4499 54.4407H40.4549L58.391 11.988L75.2488 53.0109L75.2638 53.0359L84.3092 73.2275H84.2493L94.8573 97.0634L102.839 114.98H116.782L69.9174 11.988H116.782V0Z"
      fill={fillColor}
    />
  </svg>
)

export default AtriumLogoStep2
