'use client'
import { GoPlusCircle } from 'react-icons/go'
import Input from '../Input'
import { useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { generateId } from '@/domain/uniqId'

export type TDynamicInputListPorps = {
  name: string
  label: string
  defaultValue: string
  inputIcon?: React.ReactNode
  classNameIcon?: string
  classNameSecondaryIcon?: string
}

export type TDynamicInput = {
  id: string
  value: string
}

export type TDynamicInputsInfo = TDynamicInput[]

const DynamicInputList = ({
  name,
  label,
  defaultValue,
  inputIcon,
  classNameIcon,
}: TDynamicInputListPorps) => {
  const [inputsInfo, setInputsInfo] = useState<TDynamicInputsInfo>([])

  const handleAddInput = () => {
    console.log('sssssssssss')
    const newInput: TDynamicInput = {
      id: generateId(),
      value: '',
    }
    setInputsInfo((prev) => [...prev, newInput])
  }

  const handleRemoveInput = (id: string) => {
    setInputsInfo((prev) => prev.filter((input) => input.id !== id))
  }
  return (
    <>
      <Input
        type="text"
        name={name}
        label={label}
        defaultValue={defaultValue}
        inputIcon={inputIcon}
        readOnly
        secondaryIcon={<GoPlusCircle />}
        classNameSecondaryIcon="text-green-500 text-lg cursor-pointer"
        onClickSecondaryIcon={() => handleAddInput()}
        error={null}
      />
      {inputsInfo?.map((input, index) => (
        <Input
          key={input.id}
          type="text"
          name={name}
          label={label}
          inputIcon={inputIcon}
          secondaryIcon={<IoIosCloseCircleOutline />}
          classNameSecondaryIcon="text-red-500 text-lg cursor-pointer"
          onClickSecondaryIcon={() => handleRemoveInput(input.id)}
          error={null}
        />
      ))}
    </>
  )
}

export default DynamicInputList
