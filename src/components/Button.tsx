import React, { FC } from 'react'

import { BUTTON_STYLES, BUTTON_SIZES } from '@/constants/button'

interface ButtonProps {
  children: React.ReactNode
  as?: React.ElementType
  variant?: keyof typeof BUTTON_STYLES
  size?: keyof typeof BUTTON_SIZES
  className?: string
  [key: string]: any
}

const Button: FC<ButtonProps> = ({
  children,
  as: Component = 'button',
  variant = 'dark',
  size = 'default',
  className = '',
  ...rest
}) => {
  const style = BUTTON_STYLES[variant]
  const height = BUTTON_SIZES[size]

  return (
    <Component
      className={`group relative inline-flex items-center justify-center text-[0.92vw] font-[500] tracking-[0.04em] border ${style.border} ${height} px-[1.6vw] overflow-hidden ${className}`}
      {...rest}
    >
      <span
        className={`absolute inset-0 ${style.fill} translate-y-[101%] transition-transform duration-500 ease-in-out group-hover:translate-y-0`}
      />
      <span
        className={`relative ${style.text} transition-colors duration-500 ease-in-out`}
      >
        {children}
      </span>
    </Component>
  )
}

export default Button
