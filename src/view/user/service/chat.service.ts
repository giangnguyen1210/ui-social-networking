import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IBaseResponse } from '../../auth/types/common.type'
import { AxiosResponse } from 'axios'
import { IGetChatMessagesRequest } from '../types/user.type'
import axios from 'axios';

const API_URL = 'http://localhost:8086/api/chatrooms';
export const ChatService: any = {
  // Lấy tin nhắn giữa hai người dùng
  getMessages: async (_params: IGetChatMessagesRequest) => {
    const { senderId, receiverId } = _params
    const response: IBaseResponse = await httpClient.get(`${API_ROUTES.chat.getMessage}/${senderId}/${receiverId}`)
    return response
  },
}

export const createChatRoom = async (senderId: string, recipientId: string) => {
    const response = await axios.post(`${API_URL}?senderId=${senderId}&recipientId=${recipientId}`);
    return response.data;
};
