'use client'
import { createContext, useReducer, useContext, ReactNode } from 'react'

type TLoginState = {
  step: 1 | 2 | 3
  phone: string
  code: boolean
  formData: {
    shop_name?: string
    guild_id?: number
    location_type?: string
    province_id?: string
    township_id?: string
    address?: string
    location_lat?: string
    location_lng?: string
    user_full_name?: string
    user_mobile_1?: string
    city_id?: string
    area_id?: string
    sector_id?: string
    village_id?: string
    road_side_id?: string
    user_id?: string
    shop_image?: File
  }
}
// 09114227969
const initialState: TLoginState = {
  step: 1,
  phone: '',
  code: false,
  formData: {},
}

type TAction =
  | { type: 'setStep'; payload: TLoginState['step'] }
  | { type: 'setPhone'; payload: string }
  | { type: 'setCode'; payload: boolean }
  | { type: 'updateFormData'; payload: Partial<TLoginState['formData']> }
  | { type: 'reset' }

function loginReducer(state: TLoginState, action: TAction): TLoginState {
  switch (action.type) {
    case 'setStep':
      return { ...state, step: action.payload }
    case 'setPhone':
      return { ...state, phone: action.payload }
    case 'setCode':
      return { ...state, code: action.payload }
    case 'updateFormData':
      return { ...state, formData: { ...state.formData, ...action.payload } }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const LoginContext = createContext<{
  state: TLoginState
  dispatch: React.Dispatch<TAction>
} | null>(null)

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(loginReducer, initialState)

  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {children}
    </LoginContext.Provider>
  )
}
export const useLogin = () => {
  const context = useContext(LoginContext)
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider')
  }
  return context
}
