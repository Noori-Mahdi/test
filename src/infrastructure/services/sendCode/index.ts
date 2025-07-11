import { api } from "../api";
const sendCode = (data: any) => api.post('/authenticate/otp', data);

export default sendCode