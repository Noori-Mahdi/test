// unit

export type TValidationResult = {
  type: boolean
  message: string | null
}

export type TDropDownOption = {
  id: number
  title: string
}

export type TDynamicInput = {
  id: string
  value: string
}

export type TBtnGroup = {
  label: string
  active: boolean
  disable: boolean
  className?: string
  onClick?: () => void
}

export type TPreviousAccount = {
  id: string
  image: string
  addrese1: string
  addrese2: string
}

export type TValidationResults = Record<string, TValidationResult>

export type TDynamicInputsInfo = TDynamicInput[]

export type TFakeEvent = { target: { name: string; value: string } }
export type TFakeEventFile = { target: { name: string; value: File | '' } }
export type TFakeEventNumber = { target: { name: string; value: number } }
