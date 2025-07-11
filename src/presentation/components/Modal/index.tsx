'use client'

import { TModalProps } from '@/domain/type'
import { useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { IoWarningOutline } from 'react-icons/io5'
import { MdInfoOutline, MdOutlineReportGmailerrorred } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

const Modal = ({
  type = null,
  isOpen = false,
  onClose,
  className,
  children,
  size,
  label,
}: TModalProps) => {
  const [show, setShow] = useState(isOpen)

  useEffect(() => {
    setShow(isOpen)
  }, [isOpen])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 w-full flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-xs bg-stone-50/10"></div>
      <div
        className={twMerge(
          `p-5 rounded shadow-lg  text-black bg-white relative`,
          size ? size : 'w-96',
          className
        )}
      >
        {type !== 'map' && (
          <div
            className={twMerge(
              'flex justify-end items-center text-lg mb-5',
              (type != null || label) && 'justify-between'
            )}
          >
            <div className="flex gap-2 items-center">
              {type === 'warning' ? (
                <IoWarningOutline className="text-yellow-500" />
              ) : type === 'info' ? (
                <MdInfoOutline className="text-sky-600" />
              ) : type === 'error' ? (
                <MdOutlineReportGmailerrorred className="text-red-800" />
              ) : null}
              {label ? (
                <span className="capitalize tracking-wide font-semibold">
                  {label}
                </span>
              ) : (
                <span className="capitalize tracking-wide font-semibold">
                  {type}
                </span>
              )}
            </div>
            <IoIosClose
              className=" cursor-pointer text-2xl hover:text-red-600 text-black"
              onClick={onClose}
            />
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export default Modal
