import React, { FC } from 'react'

import IconArrow from '@/components/icons/icon-arrow'

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
  const variantStyle = BUTTON_STYLES[variant]
  const sizeStyle = BUTTON_SIZES[size]

  return (
    <Component
      className={`group relative inline-flex items-center gap-[0.6vw] ${sizeStyle.text} font-[550] tracking-[0.04em] border ${variantStyle.border} ${sizeStyle.height} ${sizeStyle.px} overflow-hidden ${className}`}
      {...rest}
    >
      <span
        className={`absolute inset-[-1px] ${variantStyle.fill} translate-y-[101%] transition-transform duration-500 ease-in-out group-hover:translate-y-0`}
      />
      <span
        className={`relative ${variantStyle.text} transition-colors duration-500`}
      >
        {children}
      </span>
      {size !== 'small' && (
        <IconArrow
          className={`relative w-[0.8vw] h-[0.8vw] ${variantStyle.text} mt-[1px] transition-all duration-500 group-hover:translate-x-[4px]`}
        />
      )}
    </Component>
  )
}

export default Button
