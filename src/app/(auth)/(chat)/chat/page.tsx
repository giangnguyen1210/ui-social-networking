import WebSocketComponent from '@/components/chat';
import ProfileDetailPage from '@/view/user/pages/profile-detail.page';
import React from 'react'

export async function generateMetadata() {
	return {
		title: 'Chat',
	}
}
function ChatPage({ params }: { params: { slug: string } }) {
	
	return <div>
		<WebSocketComponent/>
    </div>
}

export default ChatPage
