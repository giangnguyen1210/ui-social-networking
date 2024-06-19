import React from 'react'

import AuthTemplate from '@/templates/auth-template'

interface ILoginLayout {
	children: React.ReactNode
}

function LoginLayout({ children }: ILoginLayout) {
	return <AuthTemplate>{children}</AuthTemplate>
}

export default LoginLayout
