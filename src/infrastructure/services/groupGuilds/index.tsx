import { api } from '../api'
const groupGuilds = () => api.get('/public_content/app_data')

export default groupGuilds
