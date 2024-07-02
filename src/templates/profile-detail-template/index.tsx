'use client'

// import './style.css'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useMemo, useState } from 'react'

import { APP_ROUTER } from '@/common/config'
import { jwtDecode } from 'jwt-decode'
import AvatarComponent from '../../components/avatar'
import SideBar from '../components/sidebar'

interface IProfileTemplate {
	children: React.ReactNode
}

const initData = {
	sidebarData: {
		sections: {
			navigator: [
				{ innerText: 'Trang chủ', icon: 'home', path: '/home', key: 'nav_00' },
				{ innerText: 'Tìm kiếm', icon: 'search', path: '', key: 'nav_01' },
				{ innerText: 'Thông báo', icon: 'notifications', path: '', key: 'nav_02' },
				{ innerText: 'Tạo bài viết', icon: 'add', path: '', key: 'nav_03' },
				{
					innerText: 'Trang cá nhân', icon: <AvatarComponent width={24} height={24} avatarData={null}/>, path: '/profile', key: 'nav_04'
				}
			],
			settings: [
				{ innerText: 'Setting', icon: 'settings', path: '/settings', key: 'setting_01' },
				{ innerText: 'Logout', icon: 'logout', path: '', key: 'user_setting_02', type: 'logout' },
			],
		},
	},
}

const ProfileTemplateContext = createContext({
	templateState: initData,
	handleLogout: () => null,
})

const useProfileTemplateContext = () => {
	const context = useContext(ProfileTemplateContext)

	if (!context) {
		throw new Error('useProfileTemplateContext must be used in ProfileTemplateContext.Provider.')
	}
	return context
}

function ProfileTemplate({ children }: IProfileTemplate) {

	const token = Cookies.get('token') || ''
	const router = useRouter()

	const [templateState, setTemplateState] = useState<typeof initData>(initData)



	const handleLogout = () => {
		if (token) {
			Cookies.remove('token')
			Cookies.remove('username')
			Cookies.remove('id')
		}
		router.push(APP_ROUTER.paths.center.signIn.path)
		return null
	}

	const value = useMemo(() => {
		return { templateState, handleLogout }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (token) {
		const decoded = jwtDecode(token)
		const currentTime = Date.now() / 1000
		const expire = decoded?.exp as number
		if (expire < currentTime) {
			handleLogout()
		}
	} else {
		handleLogout()
	}
	return (
		<ProfileTemplateContext.Provider value={value}>
			<div className="admin__template">
				<div className={`admin__body p-5`}>
					<SideBar />
					<div className='mx-[120px] py-[10px]'>
						{children}
					</div>
				</div>
			</div>
		</ProfileTemplateContext.Provider>
	)
}

export { ProfileTemplate, useProfileTemplateContext }
