'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import * as tokenManager from '@/infrastructure/services/tokenManager'

type TUser = {
  id?: number | null
  name?: string
  family?: string
  full_name?: string
  user_mobile?: {
    id?: number | null
    mobile?: string
    user_id?: number | null
  }
}

type TAuthState = {
  token: string | null
  user: TUser
}

const initialState: TAuthState = {
  token: null,
  user: {},
}

type TAuthAction =
  | { type: 'login'; payload: { token: string; user: TUser } }
  | { type: 'logout' }

const AuthContext = createContext<{
  state: TAuthState
  dispatch: React.Dispatch<TAuthAction>
}>({
  state: initialState,
  dispatch: () => null,
})

const authReducer = (state: TAuthState, action: TAuthAction): TAuthState => {
  switch (action.type) {
    case 'login':
      tokenManager.setToken(action.payload.token)
      return {
        token: action.payload.token,
        user: action.payload.user,
      }
    case 'logout':
      tokenManager.setToken(null)
      return {
        token: null,
        user: {},
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
