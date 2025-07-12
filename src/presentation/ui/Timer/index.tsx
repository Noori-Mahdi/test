'use client'

import { TCountdownTimerProps } from '@/domain/type/componentsPropsType'
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react'

// این forwardRef اجازه میده فانکشو از بالا صدا بزنی
const CountdownTimer = forwardRef(
  (
    {
      seconds,
      onEnd,
      expiredMessage = 'زمان به پایان رسید',
      className,
    }: TCountdownTimerProps,
    ref
  ) => {
    const [timeLeft, setTimeLeft] = useState(seconds)
    const [isExpired, setIsExpired] = useState(false)

    useEffect(() => {
      if (timeLeft <= 0) {
        setIsExpired(true)
        onEnd?.()
        return
      }

      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }, [timeLeft, onEnd])

    // این قسمت به والد اجازه میده reset() رو صدا بزنه
    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          setTimeLeft(seconds)
          setIsExpired(false)
        },
      }),
      [seconds]
    )

    const formatTime = (time: number) => {
      const m = Math.floor(time / 60)
      const s = time % 60
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }

    return (
      <div className={className}>
        {isExpired ? (
          <span className="text-neutral-500 font-medium">{expiredMessage}</span>
        ) : (
          <span className="text-green-500 font-medium">
            {formatTime(timeLeft)}
          </span>
        )}
      </div>
    )
  }
)

CountdownTimer.displayName = 'CountdownTimer'
export default CountdownTimer
