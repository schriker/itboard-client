import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'https://itboardapi.herokuapp.com/',
  withCredentials: true
})

export default api