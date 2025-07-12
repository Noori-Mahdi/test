'use client'
import React from 'react'
import Button from '../Button'
import { twMerge } from 'tailwind-merge'
import { TBtnGroupProps } from '@/domain/type/componentsPropsType'

const BtnGroup = ({ btnList }: TBtnGroupProps) => {
  return (
    <div className="flex justify-between items-center">
      {btnList.map((btn, index) => (
        <React.Fragment key={btn.label + index}>
          {btnList.length > 1 && index != 0 && (
            <hr className="w-32 mx-3 text-green-500 block" key={index} />
          )}
          <Button
            key={index + btn.label}
            type="button"
            color={btn.disable ? 'muted' : btn.active ? 'secondary' : 'primary'}
            label={btn.label}
            disabled={btn.disable}
            className={twMerge(
              'text-sm py-3 px-4 rounded-2xl select-none',
              btn.className
            )}
            rounded="normal"
            onClick={btn.onClick}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

export default BtnGroup
