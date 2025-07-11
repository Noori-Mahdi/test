'use client'

import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { RiErrorWarningLine } from 'react-icons/ri'
import { IoIosArrowDown } from 'react-icons/io'
import { TFakeEventNumber } from '@/domain/type'

export type TOption = {
  id: number
  title: string
}

type TDropDownProps = {
  name: string
  label?: string
  options: TOption[]
  defaultValue?: number
  required?: boolean
  error?: string
  readOnly?: boolean
  className?: string
  classNameIcon?: string
  icon?: React.ReactNode
  onChange?: (e: TFakeEventNumber) => void
}

const DropDown = ({
  name,
  label,
  options,
  defaultValue,
  required = false,
  error,
  readOnly = false,
  className,
  classNameIcon,
  icon,
  onChange,
}: TDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find((opt) => opt.id === value)

  const handleSelect = (val: number) => {
    setValue(val)
          onChange?.({
        target: {
          name,
          value: val,
        },})
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className="w-full relative">
      <div
        className={twMerge(
          'flex items-center text-base font-medium border rounded-xl w-full cursor-pointer transition-colors',
          readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
          error ? 'border-red-400' : 'border-neutral-400'
        )}
        onClick={() => !readOnly && setIsOpen(!isOpen)}
      >
        <div className={twMerge('p-4 text-neutral-500', classNameIcon)}>
          {icon}
        </div>

        <div className="grow h-fit relative">
          {label && (
            <div
              className={twMerge(
                'absolute w-fit h-2 pb-2 select-none capitalize tracking-wide font-medium text-neutral-500  text-sm flex items-center justify-between  px-1 ',
                (value || isOpen) && 'top-0  translate-x-6 bg-white',
                value
                  ? '-translate-y-4'
                  : isOpen && '-translate-y-7 transition-all duration-400',
                error && 'text-red-400'
              )}
            >
              {label} {required && '*'}
            </div>
          )}
          <div className="text-neutral-700">
            {selectedOption ? selectedOption.title : ''}
          </div>
        </div>

        <div className="px-2 text-neutral-500">
          <IoIosArrowDown
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isOpen && !readOnly && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={twMerge(
                'px-4 py-2 text-sm hover:bg-neutral-100 cursor-pointer',
                opt.id === value && 'bg-neutral-100 font-medium'
              )}
            >
              {opt.title}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-400 flex gap-1 pl-3 items-center text-sm font-normal mt-1">
          <RiErrorWarningLine className="text-lg" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default DropDown
