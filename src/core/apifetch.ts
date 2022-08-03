import axios, { AxiosRequestConfig } from 'axios'

const apiPath = 'http://localhost:5000'

type fetchArgs = {
  requestConfig: AxiosRequestConfig
}

export const apiFetch = async <RES>(url: string, args: fetchArgs): Promise<RES> => {
  try {
    const response = await axios(`${apiPath}${url}`, args.requestConfig)

    return response.data as RES
  } catch (error: any) {
    return error.response.data
  }
}
export const api = axios.create({
  baseURL: 'http://localhost:5000',
})
