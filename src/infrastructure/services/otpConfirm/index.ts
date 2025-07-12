import { api } from '../api'

const otpConfirm = (data: any) => api.post('/authenticate/otp-confirm', data)

export default otpConfirm
