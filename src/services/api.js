import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost/snep/modules/default/api/',
  timeout: 5000
})

export default api
