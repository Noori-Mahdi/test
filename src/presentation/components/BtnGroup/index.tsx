'use client'
import React from 'react'
import Button from '../Button'

export type BtnGroup = {
  label: string
  active: boolean
  disable: boolean
  onClick?: () => void
}

export type BtnGroupProps = {
  btnList: BtnGroup[]
}

const BtnGroup = ({ btnList }: BtnGroupProps) => {
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
            color={
              btn.disable ? 'muted' : btn.active ? 'secondary' : 'primary'
            }
            label={btn.label}
            disabled={btn.disable}
            className="text-sm py-3 px-4 rounded-2xl select-none"
            rounded="normal"
            onClick={btn.onClick}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

export default BtnGroup
