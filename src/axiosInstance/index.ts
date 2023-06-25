import axios from 'axios'
import { useQueryClient } from 'react-query'
import { baseURL } from './constants'

const config = { baseURL: baseURL }
const axiosInstance = axios.create(config)

const useAxios = () => {
  return { axiosInstance }
}

export default useAxios
