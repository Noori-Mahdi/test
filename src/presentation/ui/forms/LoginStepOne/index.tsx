'use client'

import { validateFormValues } from '@/domain/function/validators'
import { TLoginStepOneProps } from '@/domain/type/componentsPropsType'
import { TFakeEvent, TValidationResult } from '@/domain/type/unit'
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
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [validations, setValidations] = useState<
    Record<string, TValidationResult>
  >({})
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {}
  )

  //  هوک کاستوم لاگین دیتای موقت برای رفت برگشت در فرم (Reduser + Context)
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

    //  انجام اعتبارسنجی
    const validationResults = validateFormValues(formValues)
    setValidations(validationResults)
    // اگه معتبر نباشن درخواست زده نمیشه
    const isFormValid = Object.values(validationResults).every((v) => v.type)
    if (!isFormValid) return

    try {
      const result = await sendCode(formValues)
      dispatch({ type: 'setPhone', payload: formValues.mobile })
      dispatch({ type: 'setStep', payload: 2 })
    } catch (error: any) {
      const fields = Object.keys(formValues) // دریافت اسم‌های ایمپوت ها
      if (error?.response?.data?.errors) {
        const errors = getFieldErrors(error, fields) // دریافت ارور براساس اینپوتی که ارور داده
        setFormErrors(errors) // کدوم اینپوت ها ارور دارن
      } else if (error.message) {
        alert(error.message) //زمانی که برای اتصال به سرور مشکلی پیش می‌آید
      } else {
        console.log(error)
      }
    }
  }
  return (
    <div
      className={twMerge(
        'flex justify-end sm:justify-center items-center flex-col',
        className
      )}
    >
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
          <Button
            type="submit"
            label="ورود"
            disabled={formValues.mobile ? false : true}
          />
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
          className="text-2xl p-4 hidden sm:flex"
        />
      </div>
    </div>
  )
}

export default LoginStepOne
