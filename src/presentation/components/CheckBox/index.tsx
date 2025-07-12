'use client'

import { TCheckBoxProps } from '@/domain/type/componentsPropsType'
import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

const CheckBox = ({
  onClick,
  checkboxText,
  active = false,
  className,
  disable = false,
}: TCheckBoxProps) => {
  const [value, setValue] = useState(active)

  useEffect(() => {
    setValue(active)
  }, [active])

  return (
    <div
      className={twMerge('flex items-center justify-start gap-2', className)}
    >
      <div
        onClick={() => {
          if (!disable) {
            setValue(!value)
            onClick(!value)
          }
        }}
        className={twMerge(
          `flex justify-center items-center  cursor-pointer w-4 h-4 rounded-md border border-gray-500 transition-all duration-400 ease-in-out`,
          value ? 'border-green-500 scale-110' : 'scale-100',
          disable && 'bg-gray-500 cursor-not-allowed'
        )}
      >
        {value && (
          <FaCheck className="text-xs text-green-500 opacity-100 transition-opacity duration-300 ease-in-out" />
        )}
      </div>
      <span
        onClick={() => {
          if (!disable) {
            setValue(!value)
            onClick(!value)
          }
        }}
        className="text-sm select-none"
      >
        {checkboxText}
      </span>
    </div>
  )
}

export default CheckBox
