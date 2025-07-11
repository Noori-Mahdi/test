import { api } from '../api'
const groupGuilds = () => api.get('/public_content/app_data?role=customer&role_type_id=32303&platform=2')

export default groupGuilds
