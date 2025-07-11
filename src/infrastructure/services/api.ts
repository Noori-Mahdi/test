import axios from 'axios'
import { getToken } from './tokenManager'

export const api = axios.create({
  baseURL: 'https://develop-test.visiton.ir/api/v1',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})


api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})