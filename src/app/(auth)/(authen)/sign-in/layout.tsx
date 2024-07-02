import React from 'react'

import AuthTemplate from '@/templates/auth-template'

interface ILoginLayout {
	children: React.ReactNode
}

export async function generateMetadata() {
	return {
		title: 'Sign in',
	}
}
function LoginLayout({ children }: ILoginLayout) {
	return <AuthTemplate>{children}</AuthTemplate>
}

export default LoginLayout
