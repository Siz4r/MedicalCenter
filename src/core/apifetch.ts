import axios from 'axios'

const apiPath = 'http://localhost:5000'

export const api = axios.create({
  baseURL: apiPath,
  withCredentials: true,
})
