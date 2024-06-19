'use client'

import { useRouter } from 'next/navigation'

import { APP_ROUTER } from '@/common/config'

function HomePageView() {
	const router = useRouter()
	const redirectToLogin = () => {
		router.push(APP_ROUTER.paths.center.signIn.path)
	}

	return (
		<button type="button" onClick={redirectToLogin}>
			Login
		</button>
	)
}

export default HomePageView
