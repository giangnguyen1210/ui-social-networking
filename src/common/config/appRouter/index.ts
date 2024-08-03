import { home } from "./home/home"
import { profile } from "./home/profile"

const DEFAULT_PATHS = {
	home: {
		home,
		profile
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
})
