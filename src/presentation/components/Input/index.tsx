'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { RiErrorWarningLine } from 'react-icons/ri'
import { TInputProps } from '@/domain/type/componentsPropsType'

const Input = ({
  type,
  label,
  name,
  required,
  defaultValue,
  validationType = 'text',
  inputIcon,
  secondaryIcon,
  error,
  readOnly,
  hiddenBorder = false,
  className,
  classNameIcon,
  classNameSecondaryIcon,
  onClickSecondaryIcon,
  onChange,
}: TInputProps) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '')
  const [focus, setFocus] = useState(false)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e !== 'string') {
      setValue(e.target.value)
      onChange?.(e)
    } else {
      setValue(e)
      onChange?.({
        target: {
          name,
          value: defaultValue || '',
        },
      })
    }
  }

  useEffect(() => {
    if (defaultValue) handleOnChange(defaultValue)
  }, [defaultValue])

  return (
    <div className={`${label && 'my-3'}  w-full`}>
      <div
        onClick={() => {
          setFocus(true)
        }}
        className={twMerge(
          'relative flex items-center text-base font-medium border rounded-xl w-full bg-white cursor-text',
          error ? 'border-red-400' : 'border-neutral-400',
          hiddenBorder && 'border-transparent rounded-full'
        )}
      >
        <div className={twMerge('p-4 text-neutral-500', classNameIcon)}>
          {inputIcon}
        </div>
        <div className="w-full h-full">
          {label && (
            <label
              className={twMerge(
                'absolute select-none capitalize tracking-wide font-medium text-neutral-500  text-sm flex items-center justify-between cursor-text w-fit px-1 transition-all duration-400',
                error && 'text-red-400',
                focus || value.length != 0
                  ? 'top-0 -translate-y-3 translate-x-6 bg-white'
                  : 'top-1/2 -translate-y-1/2 p-2'
              )}
              htmlFor={name}
            >
              {label}
            </label>
          )}{' '}
          <input
            className={twMerge(
              'grow text-neutral-500 w-full text-right h-full border-neutral-500 outline-0 text-lg transition-all duration-300 ease-in-out',
              className
            )}
            id={name}
            readOnly={readOnly}
            name={name}
            type={type}
            defaultValue={value}
            required={required}
            onBlur={() => {
              setFocus(false)
            }}
            onChange={(e) => {
              handleOnChange(e)
            }}
          ></input>
        </div>
        {secondaryIcon && (
          <div
            className={twMerge(
              'flex justify-center items-center p-4',
              classNameSecondaryIcon
            )}
            onClick={(e) => {
              e.stopPropagation()
              onClickSecondaryIcon?.()
            }}
          >
            {secondaryIcon}
          </div>
        )}
      </div>
      {error && (
        <div className="text-red-400 w-full flex gap-1 pl-3 items-center text-sm font-normal mt-1">
          <RiErrorWarningLine className="text-lg" />
          <span className="whitespace-normal truncate break-words">
            {error}
          </span>
        </div>
      )}
    </div>
  )
}

export default Input
