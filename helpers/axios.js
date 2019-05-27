import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'http://itboardapi.janusmarcin.pl',
  withCredentials: true
})

export default api