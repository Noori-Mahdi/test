import { api } from '../api'
const customerShopList = () => api.get('/customer')

export default customerShopList
