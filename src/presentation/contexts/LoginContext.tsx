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
    province_id?: number
    township_id?: number
    address?: string
    location_lat?: number
    location_lng?: number
    user_full_name?: string
    user_mobile_1?: string
    city_id?: number
    area_id?: number
    sector_id?: number
    village_id?: number
    road_side_id?: number
    user_id?: number
    shop_image?: File
  }
}
// 09114227969
// 09159303097
// 09154477277
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
