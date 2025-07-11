'use client'

import { TOTPInputProps } from '@/domain/type'
import { useRef, useState } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

const OTPInput = ({ name, error, onChange }: TOTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [otp, setOtp] = useState<string[]>(Array(5).fill(''))

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    const formatted = newOtp
      .slice()
      .reverse()
      .map((v) => (v === '' ? '-' : v))
      .join('')

    onChange?.({ target: { name, value: formatted } })

    if (value && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  return (
    <div>
      <div className="flex gap-2 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            placeholder="-"
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={twMerge(
              'w-12 h-12 border  rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500',
              error ? 'border-red-400' : 'border-gray-400'
            )}
          />
        ))}
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

export default OTPInput
