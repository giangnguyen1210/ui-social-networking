'use client'

// import './style.css'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { APP_ROUTER } from '@/common/config'
import { jwtDecode } from 'jwt-decode'
import AvatarComponent from '../../components/avatar'
import SideBar from '../components/sidebar'
import SideBarRight from '../components/sidebar-right'
import CreatePostModal from '@/view/home/components/modals/create-posts.modal'
import useAppModal from '@/components/modals/app-modal/store'
import UserSearchModal from '@/components/modals/user-search-modal'
import { tokenDecode } from '@/common/token-decode/token-decode'

interface IHomeTemplate {
	children: React.ReactNode
}

const initData = {
	sidebarData: {
		sections: {
			navigator: [
				{ innerText: 'Trang chủ', icon: 'home', path: '/home', key: 'nav_00' },
				{ innerText: 'Tìm kiếm', icon: 'search', path: '', key: 'nav_01', type: 'search' },
				// { innerText: 'Thông báo', icon: 'notifications', path: '', key: 'nav_02' },
				{ innerText: 'Tạo bài viết', icon: 'add', path: '', key: 'nav_03', type: 'add' },
				// { innerText: 'Tin nhắn', icon: 'chat', path: '/chat', key: 'nav_04', type: 'chat' },
				{
					innerText: 'Trang cá nhân', icon: <AvatarComponent width={24} height={24} avatarData={null} />, path: `profile`, key: 'nav_05'
				},
				{
					innerText: 'Tin nhắn', icon: 'message', path: `/chat`, key: 'nav_06'
				},
			],
			settings: [
				{ innerText: 'Setting', icon: 'settings', path: '/settings', key: 'setting_01' },
				{ innerText: 'Logout', icon: 'logout', path: '', key: 'user_setting_02', type: 'logout' },
			],
		},
	},
}

const HomeTemplateContext = createContext({
	templateState: initData,
	handleLogout: () => null,
	handleClickOpenModal: () => null,
	handleOpenSearchModal: () => null
})

const useHomeTemplateContext = () => {
	const context = useContext(HomeTemplateContext)

	if (!context) {
		throw new Error('useHomeTemplateContext must be used in HomeTemplateContext.Provider.')
	}
	return context
}

function HomeTemplate({ children }: IHomeTemplate) {

	const token = Cookies.get('token') || ''
	const router = useRouter()
	const userId = Number(tokenDecode())

	const [templateState, setTemplateState] = useState<typeof initData>(initData)


	const { open, close, setModalOptions, isOpen } = useAppModal()

	const handleClickOpenModal = () => {
		setModalOptions({
			showCloseIcon: false,
			content: <CreatePostModal onClose={close} show={false} title={""} message={""} />,
		})
		open()
		return null;
	}

	const handleOpenSearchModal = () => {
		setModalOptions({
			showCloseIcon: false,
			content: <UserSearchModal userId={userId} onClose={close} show={false} />,
		})
		open()
		return null;
	}

	const handleLogout = () => {
		// console.log(token, router);
		if (token) {
			Cookies.remove('token')
			Cookies.remove('username')
			Cookies.remove('id')
		}
		window.location.href = '/sign-in'
		// router.push('/sign-in')
		// router.push('/sign-in');
		return null
	}

	const value = useMemo(() => {
		return { templateState, handleLogout, handleClickOpenModal, handleOpenSearchModal }
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
		<HomeTemplateContext.Provider value={value}>
			<div className="admin__template">
				<div className={`admin__body p-5`}>
					<SideBar />
					{children}
					<SideBarRight />
				</div>
			</div>
		</HomeTemplateContext.Provider>
	)
}

export { HomeTemplate, useHomeTemplateContext }
