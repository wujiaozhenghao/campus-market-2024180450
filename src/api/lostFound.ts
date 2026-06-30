import http from './http'

export interface LostFoundItem {
  id?: number
  title: string
  type: 'lost' | 'found'
  itemName: string
  location: string
  eventTime: string
  contact: string
  status: string
  description: string
}

export function getLostFounds() {
  return http.get<LostFoundItem[]>('/lostFounds')
}

export function createLostFound(data: LostFoundItem) {
  return http.post<LostFoundItem>('/lostFounds', data)
}
