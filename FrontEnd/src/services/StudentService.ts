import type { StudentDetail } from '@/type'
import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('access_token')
  }
})

export default {
  getStudent(): Promise<AxiosResponse<StudentDetail[]>> {
    return apiClient.get<StudentDetail[]>('/student')
  },
  getStudentById(id: number): Promise<AxiosResponse<StudentDetail>> {
    return apiClient.get<StudentDetail>('student/' + id.toString())
  }
}
