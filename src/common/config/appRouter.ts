const baseApiUrl = (path: string) => {
	if (path) {
		return `${process.env.NEXT_PUBLIC_BASE_API}${path}`
	}

	return `${process.env.NEXT_PUBLIC_BASE_API}`
}

const DEFAULT_PATHS = {
	admin: {
		dashboard: {
			path: '/dashboard',
		},
	},
	center: {
		signIn: {
			path: '/sign-in',
		},
		signUp: {
			path: '/sign-up',
		},
		forgotPassword: {
			path: '/forgot-password',
		},
		resetPassoword: {
			path: '/reset-password',
		},
	},
	unAuth: {
		root: '/',
	},
	homePage: {
		root: '/',
	},
}

export default Object.freeze({
	paths: DEFAULT_PATHS,
	utils: {
		baseApiUrl,
	},
})
