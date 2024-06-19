import React from 'react'

import AuthTemplate from '@/templates/auth-template'

interface ISignUpLayout {
	children: React.ReactNode
}

function SignUpLayout({ children }: ISignUpLayout) {
	return <AuthTemplate>{children}</AuthTemplate>
}

export default SignUpLayout
