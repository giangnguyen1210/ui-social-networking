'use client'

import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'
import React from 'react'

import { APP_ROUTER } from '@/common/config'

interface IAuthTemplate {
	children: React.ReactNode
}

function AuthTemplate({ children }: IAuthTemplate) {
	const token = Cookies.get('token')

	if (token) {
		redirect(APP_ROUTER.paths.home.home.path)
	}

	return (
		<div>{children}</div>
	)
}

export default AuthTemplate
