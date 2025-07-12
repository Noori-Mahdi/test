import { TBtnGroup, TDropDownOption, TFakeEvent, TFakeEventFile, TFakeEventNumber, TPreviousAccount } from "./unit"


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

export type TBtnGroupProps = {
  btnList: TBtnGroup[]
}

export type TCountdownTimerProps = {
  seconds: number
  onEnd?: () => void
  expiredMessage?: string
  className?: string
}


export type TDynamicInputListPorps = {
  name: string
  label: string
  defaultValue: string
  inputIcon?: React.ReactNode
  classNameIcon?: string
  classNameSecondaryIcon?: string
}

export type TImageUploaderProps = {
  name: string
  defaultValue?: File
  onChange?: (e: TFakeEventFile) => void
}

export type TMessageProps = {
  message: string
  type: 'sucess' | 'warning' | 'info' | 'error'
}

export type THeaderFormProps = {
  title: string
  subTitle: string
  className?: string
}

export type TMapProps = {
  onClose?: () => void
  onClick?: (e: { lat: number; lng: number }) => void
  onClickBtn?: () => void
  defaultValue?: { lat: number; lng: number }
  isLock?: boolean
  blurDisable?: boolean
  className?: string
}

export type TDropDownProps = {
  name: string
  label?: string
  options: TDropDownOption[]
  defaultValue?: number
  required?: boolean
  error?: string
  readOnly?: boolean
  className?: string
  classNameIcon?: string
  icon?: React.ReactNode
  onChange?: (e: TFakeEventNumber) => void
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
  hiddenBorder?: boolean
  classNameIcon?: string
  secondaryIcon?: React.ReactNode
  classNameSecondaryIcon?: string
  onClickSecondaryIcon?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | TFakeEvent) => void
}

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
