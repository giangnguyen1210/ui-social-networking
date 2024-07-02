import ProfileDetailPage from '@/view/user/pages/profile-detail.page';
import React from 'react'
import Cookies from 'js-cookie'
import { IGetUserRequest, IUser } from '@/view/user/types/user.type';
import { useUserGetInfo } from '@/view/user/hooks/useUserGetInfo';

export async function generateMetadata() {
	return {
		title: 'Profile',
	}
}
function ProfilePage({ params }: { params: { slug: string } }) {
	
	return <div>
        <ProfileDetailPage/>
    </div>
}

export default ProfilePage
