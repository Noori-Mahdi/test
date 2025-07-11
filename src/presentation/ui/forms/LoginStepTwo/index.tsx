'use client'

import { TFakeEvent, TLoginStepTwoProps, TPreviousAccount } from '@/domain/type'
import Button from '@/presentation/components/Button'
import Input from '@/presentation/components/Input'
import Modal from '@/presentation/components/Modal'
import OTPInput from '@/presentation/components/OTP'
import { useRef, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { PiHeadsetDuotone } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import SelectPreviousAccount from '../../SelectPreviousAccount'

import { fackAcount } from '../../../../../data/fackAcount'
import { GrMap } from 'react-icons/gr'
import { useLogin } from '@/presentation/contexts/LoginContext'
import { maskMiddleOfPhone } from '@/domain/maskMiddleOfPhone'
import CountdownTimer from '../../Timer'
import sendCode from '@/infrastructure/services/sendCode'
import otpConfirm from '@/infrastructure/services/otpConfirm'
import { getFieldErrors } from '@/presentation/utils/getFieldErrors'
import { useAuth } from '@/presentation/contexts/AuthContext'
import customerShopList from '@/infrastructure/services/customerShopList'
import { setToken } from '@/infrastructure/services/tokenManager'

const LoginStepTwo = ({ className }: TLoginStepTwoProps) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({
    code: '',
  })
  const [showPreviousAccount, setShowPreviousAccount] = useState(false)
  const [showTimer, setShowTimer] = useState(true)
  const [accountList, setAccountList] = useState<TPreviousAccount[] | []>([])
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {}
  )
  const { state: loginState, dispatch: loginDispatch } = useLogin()
  const { dispatch: authDispatch } = useAuth()

  const timerRef = useRef<{ reset: () => void }>(null)

  const maskMobile = maskMiddleOfPhone(loginState.phone)

  const handleResetCode = async () => {
    try {
      const result = await sendCode({ mobile: loginState.phone })
      timerRef.current?.reset()
      setShowTimer(true)
    } catch (error: any) {
      alert('مشکلی در دریافت کد به وجود آمده. دوباره تلاش کنید')
      console.log(error)
    }
  }

  const handleChange = (e: TFakeEvent) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: null }))
  }

  const handleSubmiit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await otpConfirm({
        mobile: loginState.phone,
        code: formValues.code,
        device_id: 'rfwer',
        role_group: 'customer',
      })
      if (result.data.object.token) {
        authDispatch({ type: 'setToken', payload: result.data.object.token })
        setToken(result.data.object.token)
        const customerListShopResult = await customerShopList()
        if (customerListShopResult?.data?.object?.data?.length > 0) {
          setAccountList(customerListShopResult?.data?.object?.data)
          setShowPreviousAccount(true)
        } else {
          loginDispatch({ type: 'setStep', payload: 3 })
          setAccountList([])
        }
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
      <div className="text-center text-base font-medium text-neutral-600">
        <div className="font-bold text-3xl pb-2 text-black">
          احراز هویت با کد تایید پیامکی
        </div>
        <div>کد تایید 5 رقمی به شماره شما ارسال شد. لطفا آن را وارد کنید.</div>
      </div>
      <div className="flex justify-start items-end w-full">
        <BiEditAlt
          className="text-green-500 text-2xl cursor-pointer"
          onClick={() => {
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
          disabled={!(formValues.code.length == 5)}
        />
      </form>
      <Button
        type="button"
        buttomIcon={<PiHeadsetDuotone />}
        color="transparent"
        size="small"
        rounded="normal"
        className="text-2xl p-4"
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
