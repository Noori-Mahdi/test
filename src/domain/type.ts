// unit

export type TValidationResult = {
  type: boolean
  message: string | null
}

export type TValidationResults = Record<string, TValidationResult>

//  function
export type TInputValidation =
  | ((value: string, type: string) => TValidationResult)
  | ((formValues: Record<string, string>) => TValidationResults)

//  Props
export type TContainerProps = {
  children: React.ReactNode
  className?: string
  removeSpaceY?: boolean
  removeSpaceX?: boolean
}

export type TLogoProps = {
  height: number
  width: number
  className?: string
  content?: string
  classNameImage?: string
  classNameContext?: string
}

export type TInputProps = {
  type: 'text'
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
  error: string | null
  validationType?: 'mobile' | 'inviteCode' | 'OTP' | 'text'
  className?: string
  readOnly?: boolean
  inputIcon?: React.ReactNode
  hiddenBorder?:boolean
  classNameIcon?: string
  secondaryIcon?: React.ReactNode
  classNameSecondaryIcon?: string
  onClickSecondaryIcon?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | TFakeEvent) => void
}

export type TFakeEvent = { target: { name: string; value: string } }
export type TFakeEventFile = { target: { name: string; value: File | '' }}
export type TFakeEventNumber = { target: { name: string; value: number } }


export type TButtomProps = {
  label?: string
  buttomIcon?: React.ReactNode
  type: 'submit' | 'button'
  color?:
    | 'primary'
    | 'danger'
    | 'secondary'
    | 'warning'
    | 'muted'
    | 'transparent'
  size?: 'full' | 'small' | 'fit'
  rounded?: 'full' | 'normal' | 'small' | 'none'
  disabled?: boolean
  className?: string
  animation?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type TLoginStepOneProps = {
  className?: string
}

export type TLoginStepTwoProps = {
  className?: string
}

export type TLoginStepThreePros = {
  className?: string
}

export type TModalProps = {
  type?: null | 'warning' | 'info' | 'error' | 'map'
  isOpen?: boolean
  onClose?: () => void
  children: React.ReactNode
  className?: string
  size?: string
  label?: string | React.ReactNode
}

export type TPreviousAccount = {
  id: string
  image: string
  addrese1: string
  addrese2: string
}

export type TSelectPreviousAccountProps = {
  list: TPreviousAccount[]
  onClick?: () => void
}

export type TOTPInputProps = {
  name: string
  error?: string | null
  onChange?: (e: TFakeEvent) => void
}

export type TCheckBoxProps = {
  checkboxText: string | React.ReactNode
  active?: boolean
  disable?: boolean
  className?: string
  onClick: (e: boolean) => void
}
