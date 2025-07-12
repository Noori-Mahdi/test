let token: string | null = null
let apikey: string | null = null

export const setToken = (newToken: string | null) => {
  token = newToken
}

export const setApiKey = (newApiKey: string | null) => {
  apikey = newApiKey
}

export const getApiKey = () => apikey
export const getToken = () => token
