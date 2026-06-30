import http from './http'

export interface ErrandItem {
  id?: number
  title: string
  taskType: string
  reward: number
  from: string
  to: string
  deadline: string
  publisher: string
  status: string
  description: string
}

export function getErrands() {
  return http.get<ErrandItem[]>('/errands')
}

export function createErrand(data: ErrandItem) {
  return http.post<ErrandItem>('/errands', data)
}
