import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IChatMessage, IChatNotification, IGetChatMessagesRequest, ISendMessageRequest } from '../types/chat.type'
import { IBaseResponse } from '../../auth/types/common.type'
import { AxiosResponse } from 'axios'

export const ChatService: any = {
  // Lấy tin nhắn giữa hai người dùng
  getMessages: async (_params: IGetChatMessagesRequest) => {
    const { senderId, recipientId } = _params
    const response: IBaseResponse = await httpClient.get(`${API_ROUTES.chat.getMessages}/${senderId}/${recipientId}`)
    return response
  },

  // Gửi tin nhắn
  sendMessage: async (_params: ISendMessageRequest) => {
    const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.chat.sendMessage, _params)
    return response
  },

  // Lấy thông báo tin nhắn
  getChatNotification: async (userId: number) => {
    const response: IBaseResponse = await httpClient.get(`${API_ROUTES.chat.getChatNotification}/${userId}`)
    return response
  },
  
  // Xử lý đọc tin nhắn
  readMessage: async (messageId: number) => {
    const response: IBaseResponse = await httpClient.post(`${API_ROUTES.chat.readMessage}/${messageId}`)
    return response
  }
}
