import React, { FC } from 'react'

import { IconProps } from '@/interfaces/ui'

const AtriumLogo: FC<IconProps> = ({ fillColor = '#1d1d1b', className }) => (
  <svg
    width="1256"
    height="660"
    viewBox="0 0 1256 660"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className={className}
  >
    <path
      d="M963 0H662.826H593.174H293V68.8122H561.871L293 660H369.211L415.636 557.069L476.81 420.334H476.495L525.068 312.496H525.097L628 68.8122L724.717 304.289L724.803 304.432L776.698 420.334H776.354L837.214 557.155L883.009 660H963L694.129 68.8122H963V0Z"
      fill={fillColor}
    />
  </svg>
)

export default AtriumLogo
