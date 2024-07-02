// import './style.css'

// import { ButtonComponent } from '@syncfusion/ej2-react-buttons'

import Cookies from 'js-cookie'
import { useGetAvatar, useUserGetInfo } from '@/view/user/hooks/useUserGetInfo'
import { IGetUserRequest, IUser } from '@/view/user/types/user.type'
import { useEffect } from 'react'
import { IBaseResponse } from '@/view/auth/types/common.type'
import ListUserNotFollowing from '@/components/list-user-not-following'
import ProfileUser from '@/components/profile-user'



function SideBarRight() {
	const username = Cookies.get('username')
	const userRequest: IGetUserRequest = {
		username: username as string
	}
	const { data: responseData } = useUserGetInfo(userRequest)
	const userData: IUser = responseData?.data
	return (
		<div className={`admin__sidebar-right-component`}>
			<div className="admin__sidebar-right-body">
				<section className="flex flex-col items-start justify-between gap-3">
					<ProfileUser userData={userData} />
				</section>
				<ListUserNotFollowing userData={userData}/>
				
			</div>
		</div>
	)
}

export default SideBarRight

