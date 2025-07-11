'use client'
import { LoginProvider, useLogin } from '@/presentation/contexts/LoginContext'
import LoginStepOne from '../LoginStepOne'
import LoginStepTwo from '../LoginStepTwo'
import LoginStepThree from '../LoginStepThree'

const StepRenderer = () => {
  const { state } = useLogin()

  switch (state.step) {
    case 1:
      return <LoginStepOne className="w-full sm:w-1/2 grow" />
    case 2:
      return <LoginStepTwo className="w-full sm:w-1/2 grow" />
    case 3:
      return <LoginStepThree className="w-full sm:w-1/2 grow" />
    default:
      return null
  }
}

const LoginForm = () => {
  return (
    <LoginProvider>
      <StepRenderer />
    </LoginProvider>
  )
}

export default LoginForm
