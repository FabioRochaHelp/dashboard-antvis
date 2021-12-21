import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pabx.efixtelecom.com.br/snep/modules/default/api/',
  timeout: 5000
})

export default api
