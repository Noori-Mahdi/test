'use client'
import { LoginProvider, useLogin } from '@/presentation/contexts/LoginContext'
import LoginStepOne from '../LoginStepOne'
import LoginStepTwo from '../LoginStepTwo'
import LoginStepThree from '../LoginStepThree'
import HeaderForm from '../HeadForm'

const StepRenderer = () => {
  const { state } = useLogin()

  switch (state.step) {
    case 1:
      return (
        <>
          <HeaderForm
            title="ورود به حساب کاربری"
            subTitle="لطفا موبایل خود را برای ورود به حساب کاربری وارد کنید."
          />
          <LoginStepOne className=" grow" />
        </>
      )
    case 2:
      return (
        <>
          <HeaderForm
            title="احراز هویت با کد تایید پیامکی"
            subTitle="کد تایید 5 رقمی به شماره شما ارسال شد لطفا آن را وارد کنید."
          />
          <LoginStepTwo className="grow" />
        </>
      )
    case 3:
      return (
        <>
          <HeaderForm
            title="تکمیل اطلاعات شما"
            subTitle="برای تکمیل پروفایل خود، لطفا اطلاعات مورد نیاز را وارد کنید."
            className='sm:p-0'
          />
          <LoginStepThree className="grow" />
        </>
      )
    default:
      return null
  }
}

const LoginForm = () => {
  return (
    <LoginProvider>
      <div className="flex flex-col justify-end h-full w-full gap-0 sm:gap-20 sm:w-1/2 grow sm:grow-0">
        <StepRenderer />
      </div>
    </LoginProvider>
  )
}

export default LoginForm
