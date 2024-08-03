export const chatApiRoute = {
	createChat: '/api/chat-message/chat',
	getMessage: (senderId: string, receiveId: string)=>`/api/chat-message/message/${senderId}/${receiveId}`	
}
