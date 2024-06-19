'use client'

// import './style.css'

import Cookies from 'js-cookie'
import { redirect, useRouter } from 'next/navigation'
import React, { createContext, useContext, useMemo, useState } from 'react'

import { APP_ROUTER } from '@/common/config'
import AdminNavbar from '@/templates/admin-template/components/admin-navbar'
import AdminSidebar from '@/templates/admin-template/components/admin-sidebar'

interface IAdminTemplate {
	children: React.ReactNode
}

const initData = {
	bodyExpand: true,
	sidebarData: {
		sections: {
			navigator: [
				{ innerText: 'Dashboard', icon: 'dashboard', path: '/dashboard', key: 'nav_00' },
				{ innerText: 'Files', icon: 'draft', path: '/file', key: 'nav_01' },
				{ innerText: 'Model management', icon: 'more_horiz', path: '/model-management', key: 'nav_02' },
				{ innerText: 'Coparison model', icon: 'compare_arrows', path: '/comparison-model', key: 'nav_03' },
				{ innerText: 'Cost estimate', icon: 'function', path: '/cost-estimate', key: 'nav_04' },
				{ innerText: 'Equipment', icon: 'settings', path: '/equipment', key: 'nav_05' },
				{
					innerText: 'Project Management',
					icon: 'format_list_bulleted',
					path: '/project-management',
					key: 'nav_06',
				},
				{ innerText: 'System Log', icon: 'history', path: '/system-log', key: 'nav_07' },
			],
			settings: [
				{ innerText: 'Setting', icon: 'settings', path: '/settings', key: 'setting_01' },
				{ innerText: 'Logout', icon: 'logout', path: '', key: 'user_setting_02', type: 'logout' },
			],
		},
	},
	navbarData: {
		sections: {
			userSetting: [
				{ innerText: 'Setting', icon: 'settings', path: '/settings', key: 'user_setting_01' },
				{ innerText: 'Logout', icon: 'logout', path: '', key: 'user_setting_02' },
			],
		},
	},
}

const AdminTemplateContext = createContext({
	templateState: initData,
	handleToggleSidebar: () => null,
	handleLogout: () => null,
})

const useAdminTemplateContext = () => {
	const context = useContext(AdminTemplateContext)

	if (!context) {
		throw new Error('useAdminTemplateContext must be used in AdminTemplateContext.Provider.')
	}
	return context
}

function AdminTemplate({ children }: IAdminTemplate) {
	const accessToken = Cookies.get('accessToken')
	const router = useRouter()

	const [templateState, setTemplateState] = useState<typeof initData>(initData)

	const handleToggleSidebar = () => {
		setTemplateState((prev) => {
			return { ...prev, bodyExpand: !prev.bodyExpand }
		})
		return null
	}

	const handleLogout = () => {
		if (accessToken) {
			Cookies.remove('accessToken')
			Cookies.remove('refreshToken')
			router.push(APP_ROUTER.paths.center.signIn.path)
		}
		return null
	}

	const value = useMemo(() => {
		return { templateState, handleToggleSidebar, handleLogout }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!accessToken) {
		return redirect('/sign-in')
	}

	return (
		<AdminTemplateContext.Provider value={value}>
			<div className="admin__template">
				<AdminNavbar />

				<div className={`admin__body p-5 ${templateState.bodyExpand && 'admin__body--open'}`}>
					<AdminSidebar bodyExpand={templateState.bodyExpand} handleToggleSidebar={handleToggleSidebar} />
					{children}
				</div>
			</div>
		</AdminTemplateContext.Provider>
	)
}

export { AdminTemplate, useAdminTemplateContext }
