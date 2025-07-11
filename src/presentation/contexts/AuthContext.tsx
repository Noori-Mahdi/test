'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import * as tokenManager from '@/infrastructure/services/tokenManager'

type TAuthState = {
  token: string | null
}

type TAuthAction =
  | { type: 'setToken'; payload: string }
  | { type: 'clearToken' }

const initialState: TAuthState = {
  token: null,
}

const AuthContext = createContext<{
  state: TAuthState
  dispatch: React.Dispatch<TAuthAction>
}>({
  state: initialState,
  dispatch: () => null,
})

const authReducer = (state: TAuthState, action: TAuthAction): TAuthState => {
  switch (action.type) {
    case 'setToken':
      tokenManager.setToken(action.payload)
      return { ...state, token: action.payload }
    case 'clearToken':
      tokenManager.setToken(null)
      return { ...state, token: null }
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
