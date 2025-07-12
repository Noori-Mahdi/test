'use client'

import Button from '@/presentation/components/Button'
import Modal from '@/presentation/components/Modal'
import OTPInput from '@/presentation/components/OTP'
import { useRef, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { PiHeadsetDuotone } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import SelectPreviousAccount from '../../SelectPreviousAccount'

import { GrMap } from 'react-icons/gr'
import { useLogin } from '@/presentation/contexts/LoginContext'
import { maskMiddleOfPhone } from '@/domain/function/maskMiddleOfPhone'
import CountdownTimer from '../../Timer'
import sendCode from '@/infrastructure/services/sendCode'
import otpConfirm from '@/infrastructure/services/otpConfirm'
import { getFieldErrors } from '@/presentation/utils/getFieldErrors'
import { useAuth } from '@/presentation/contexts/AuthContext'
import customerShopList from '@/infrastructure/services/customerShopList'
import { setApiKey, setToken } from '@/infrastructure/services/tokenManager'
import { TLoginStepTwoProps } from '@/domain/type/componentsPropsType'
import { TFakeEvent, TPreviousAccount } from '@/domain/type/unit'

const LoginStepTwo = ({ className }: TLoginStepTwoProps) => {
  const [showPreviousAccount, setShowPreviousAccount] = useState(false) //مدال مربوط به اکانت‌های قبلی
  const [showTimer, setShowTimer] = useState(true) // نمایش تایمر
  const [accountList, setAccountList] = useState<TPreviousAccount[] | []>([]) // لیست اکانت‌های قبلی کاربر
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {}
  )
  //  هوک کاستوم لاگین دیتای موقت برای رفت برگشت در فرم (Reduser + Context)
  const { state: loginState, dispatch: loginDispatch } = useLogin()
  //  هوک کاستوم اصلی کاربر در کل برنامه (Reduser + Context)
  const { state: authState, dispatch: authDispatch } = useAuth()
  // رف مربوط به ریست کردن تایمر
  const timerRef = useRef<{ reset: () => void }>(null)
  // ماسک کردن شماره همراه کاربر برای نمایش
  const maskMobile = maskMiddleOfPhone(loginState.phone)

  const handleChange = (e: TFakeEvent) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: null }))
  }

  // دریافت مجدد کد با همین شماره، شماره ذخیره شد در کانتکس لاگین
  const handleResetCode = async () => {
    try {
      await sendCode({ mobile: loginState.phone })
      timerRef.current?.reset()
      setShowTimer(true)
    } catch (error: any) {
      alert('درخواست شما به مشکل خورد. لطفا دوباره تلاش کنید.')
      console.log(error)
    }
  }

  const handleSubmiit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await otpConfirm({
        mobile: loginState.phone,
        code: formValues.code,
        device_id: 'rfwer', // این مقادیر در مرورگر مستقیم قابل دسترس نیست
        role_group: 'customer', // این مقادیر در مرورگر مستقیم قابل دسترس نیست
      })
      if (result.data.object.token) {
        authDispatch({ type: 'login', payload: result.data.object }) // توکن و کاربر را به کانتکس اصلی اضافه میکنیم
        setToken(result.data.object.token) // ماژل برای ذخیره سازی و استفاده موقع اضافه کردن در هدر
        setApiKey(result.data.object.apiKey)
        const customerListShopResult = await customerShopList() // درخواست دریافت باقی اکانت ها

        // console.log(customerListShopResult, 'customerListShopResult111')
        //  customerShopList دیتای نامربوط بر می‌گرداند

        if (customerListShopResult?.data?.object?.data?.length > 0) {
          // باز شدن پنجره مربوط انتخاب اکانت‌های دیگر
          setAccountList(customerListShopResult?.data?.object?.data)
          setShowPreviousAccount(true)
        } else {
          // انتقال به فرم بعد به عنوان کاربر جدید
          loginDispatch({ type: 'setStep', payload: 3 })
          setAccountList([])
        }
        // در صورت دریافت توکن به کانتکس اعلام می‌شود
        loginDispatch({ type: 'setCode', payload: true })
      } else {
        alert('توکن دریافت نشد')
      }
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
        'flex justify-center items-center flex-col gap-4 sm:gap-8',
        className
      )}
    >
      <div className="flex justify-start items-end w-full">
        <BiEditAlt
          className="text-green-500 text-2xl cursor-pointer"
          onClick={() => {
            // انتقال به فرم اول برای ویرایش
            loginDispatch({ type: 'setStep', payload: 1 })
          }}
        />
        <span className="select-none" style={{ direction: 'ltr' }}>
          {maskMobile}
        </span>
      </div>
      <form
        onSubmit={handleSubmiit}
        className="w-full flex justify-center items-center flex-col gap-4"
      >
        <OTPInput
          name="code"
          onChange={handleChange}
          error={formErrors['code'] ?? null}
        />
        <CountdownTimer
          seconds={300}
          expiredMessage={'زمان ارسال پیامک به اتمام رسیده است.'}
          ref={timerRef}
          //  با تمام شدن زمان تایمر بسته بشه
          onEnd={() => {
            setShowTimer(false)
          }}
        />
        {!showTimer && (
          <div
            onClick={handleResetCode}
            className="text-center font-medium text-green-500 cursor-pointer"
          >
            ارسال مجدد
          </div>
        )}

        <Button
          type="submit"
          label="ورود"
          disabled={formValues.code?.includes('-')}
        />
      </form>
      <Button
        type="button"
        buttomIcon={<PiHeadsetDuotone />}
        color="transparent"
        size="small"
        rounded="normal"
        className="text-2xl p-4 hidden sm:flex"
      />

      <Modal
        label={<GrMap />}
        className="w-fit lg:max-w-1/3"
        isOpen={showPreviousAccount}
        onClose={() => {
          setShowPreviousAccount(false)
        }}
        children={<SelectPreviousAccount list={accountList} />}
      />
    </div>
  )
}

export default LoginStepTwo
