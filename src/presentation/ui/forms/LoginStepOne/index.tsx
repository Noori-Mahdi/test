'use client'
import {
  TFakeEvent,
  TLoginStepOneProps,
  TValidationResult,
} from '@/domain/type'
import { validateFormValues } from '@/domain/validators'
import sendCode from '@/infrastructure/services/sendCode'
import Button from '@/presentation/components/Button'
import Input from '@/presentation/components/Input'
import { useLogin } from '@/presentation/contexts/LoginContext'
import { getFieldErrors } from '@/presentation/utils/getFieldErrors'
import { useState } from 'react'
import { LuPhone } from 'react-icons/lu'
import { PiHeadsetDuotone } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'

const LoginStepOne = ({ className }: TLoginStepOneProps) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({
    mobile: '',
  })
  const [validations, setValidations] = useState<
    Record<string, TValidationResult>
  >({})
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {}
  )

  const { state, dispatch } = useLogin()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TFakeEvent
  ) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationResults = validateFormValues(formValues)
    setValidations(validationResults)

    const isFormValid = Object.values(validationResults).every((v) => v.type)
    if (!isFormValid) return

    try {
      const result = await sendCode(formValues)
      dispatch({ type: 'setPhone', payload: formValues.mobile })
      dispatch({ type: 'setStep', payload: 2 })
    } catch (error: any) {
      const fields = Object.keys(formValues)
      if (error?.response?.data?.errors) {
        const errors = getFieldErrors(error, fields)
        setFormErrors(errors)
      } else if (error.message) {
        alert(error.message)
      } else {
        console.log(error)
      }
    }
  }
  return (
    <div
      className={twMerge(
        'flex justify-between sm:justify-center items-center flex-col gap-4 sm:gap-8',
        className
      )}
    >
      <div className="text-center text-base font-medium text-neutral-600">
        <div className="font-bold text-3xl pb-2 text-black">
          ورود به حساب کاربری
        </div>
        <div>لطفا موبایل خود را برای ورود به حساب وارد کنید.</div>
      </div>
      <div className="w-full flex flex-col gap-3 items-center">
        <form onSubmit={handleSubmit} className="w-full">
          <Input
            name="mobile"
            type="text"
            inputIcon={<LuPhone className="text-2xl" />}
            label="شماره موبایل"
            defaultValue={state.phone ?? ''}
            required
            error={
              formErrors['mobile'] ??
              (validations.mobile?.type === false
                ? validations.mobile?.message
                : null)
            }
            onChange={handleChange}
          />
          <Button type="submit" label="ورود" />
        </form>
        <div>یا</div>
        <div className="text-base font-medium text-neutral-600">
          <span>حساب نمی‌خواهید؟</span>
          <span className="text-green-600 hover:text-green-500 cursor-pointer">
            مهمان وارد شوید
          </span>
        </div>

        <Button
          type="button"
          buttomIcon={<PiHeadsetDuotone />}
          color="transparent"
          size="small"
          rounded="normal"
          className="text-2xl p-4"
        />
      </div>
    </div>
  )
}

export default LoginStepOne
