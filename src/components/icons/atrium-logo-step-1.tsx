import React, { FC } from 'react'

import { IconProps } from '@/interfaces/ui'

const AtriumLogoStep1: FC<IconProps> = ({ className }) => (
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
      d="M749.788 68.8135H966.624V660H1039.16V68.8135H1256V0H749.788V68.8135Z"
      fill="#a6a5a7"
    />
    <path
      d="M290.387 0H357.734L648.121 660H570.755L496.089 486.802H149.245L73.7076 660H0L290.387 0ZM467.947 420.407L323.146 86.1064L177.473 420.318H467.86L467.947 420.407Z"
      fill="#a6a5a7"
    />
    <path d="M1256 68.8135H749.788V0H1256V68.8135Z" fill="#1d1d1b" />
    <path
      d="M357.734 0H290.387L0 660H73.7076L323.146 86.1064L570.755 660H648.121L357.734 0Z"
      fill="#1d1d1b"
    />
  </svg>
)

export default AtriumLogoStep1
