/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/google-font-display */
"use client"
import '/public/assets/scss/global.css'
import '../styles/globals.css'
import '/public/assets/scss/base/base.scss'
import 'react-responsive-modal/styles.css';
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import Cookies from 'js-cookie'

import { useRouter } from 'next/navigation'

import { APP_ROUTER } from '@/common/config'
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';


const AppProvider = dynamic(() => import('@/components/providers'), { ssr: false })

export default function RootLayout(props: { children: React.ReactNode; params: { locale: string } }) {
	// Validate that the incoming `locale` parameter is valid

	// Using internationalization in Client Components

	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			const decoded = jwtDecode(token);
			const currentTime = Date.now() / 1000;
			const expire = decoded?.exp as number;
			if (expire < currentTime) {
				router.push(APP_ROUTER.paths.home.home.path);
			}
			//  else {
			// 	Cookies.remove('token')
			// 	Cookies.remove('username')
			// 	Cookies.remove('id')
			// 	// router.push(APP_ROUTER.paths.center.signIn.path);
			// 	// console.log(expire, currentTime);

			// }
		} else {
			router.push(APP_ROUTER.paths.center.signIn.path);
		}
	}, [router]);

	// if (token) {
	// 	const decoded = jwtDecode(token)
	// 	const currentTime = Date.now() / 1000
	// 	const expire = decoded?.exp as number
	// 	if (expire < currentTime) {
	// 		router.push(APP_ROUTER.paths.home.home.path)
	// 	}
	// } else {
	// 	router.push(APP_ROUTER.paths.center.signIn.path)
	// }

	return (
		<html suppressHydrationWarning lang={props.params.locale}>
			<head>
				<link id="app-themes-cdn" rel="stylesheet" />
				{/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/no-page-custom-font */}
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
				/>
			</head>
			<body suppressHydrationWarning>
				<AppProvider>{props.children}</AppProvider>
			</body>
		</html>
	)
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
