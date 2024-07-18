import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { CommentService } from '../service/comment.service'
import { IGetChatMessagesRequest } from '../types/user.type'
import { ChatService } from '../service/chat.service'


export function useGetChat(_params: IGetChatMessagesRequest){
    const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useGetChat', _params.senderId, _params.receiverId],
		enabled: !!token && !!_params.senderId && !!_params.receiverId,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return ChatService.getMessages(_params)
		},
	})
}
