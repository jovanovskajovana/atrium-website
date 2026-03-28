import React, { FC } from 'react'

import { BUTTON_STYLES } from '@/constants/button'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: keyof typeof BUTTON_STYLES
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'dark',
  className = '',
  ...rest
}) => {
  const s = BUTTON_STYLES[variant]

  return (
    <button
      className={`group relative text-[0.8vw] border ${s.border} py-[1%] px-[1.1vw] overflow-hidden ${className}`}
      {...rest}
    >
      <span
        className={`absolute inset-0 ${s.fill} translate-y-[101%] transition-transform duration-500 ease-in-out group-hover:translate-y-0`}
      />
      <span
        className={`relative ${s.text} transition-colors duration-500 ease-in-out`}
      >
        {children}
      </span>
    </button>
  )
}

export default Button
