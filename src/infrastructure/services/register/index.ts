import { api } from '../api'

const register = (data: any) => api.post('/customer/register', data)

export default register
