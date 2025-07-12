'use client'

import { TButtomProps } from '@/domain/type/componentsPropsType'
import { twMerge } from 'tailwind-merge'

const Button = ({
  label,
  buttomIcon,
  type,
  disabled,
  className,
  animation = true,
  color = 'primary',
  rounded = 'full',
  size = 'full',
  onClick,
}: TButtomProps) => {
  const btnColor = {
    primary: 'text-white hover:bg-green-700 bg-green-600',
    secondary: 'text-green-600 bg-white border border-green-600',
    danger: 'text-white hover:bg-red-600 bg-red-500',
    warning: 'text-white bg-amber-500 hover:bg-yellow-500',
    muted: 'bg-gray-400 text-white',
    transparent: 'bg-transparent text-neutral-500 border border-neutral-500',
  }
  const btnRounded = {
    full: 'rounded-full',
    normal: 'rounded-lg',
    small: 'rounded-md',
    none: '',
  }
  const btnSize = {
    full: 'w-full h-fit',
    fit: 'w-fit h-fit',
    small: 'w-8 h-8',
  }
  return (
    <button
      className={twMerge(
        'flex justify-center items-center gap-2 py-3 font-semibold ',
        btnSize[size],
        btnRounded[rounded],
        btnColor[color],
        animation &&
          ' transition-all duration-300 ease-in-out hover:shadow-lg ',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer ',
        className,
        ''
      )}
      type={type}
      disabled={disabled ?? false}
      onClick={(e) => {
        onClick && onClick(e)
      }}
    >
      {buttomIcon && <span>{buttomIcon}</span>}
      {label && <span>{label}</span>}
    </button>
  )
}

export default Button
