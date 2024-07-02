export const profile = {
	path: '/profile',
	children: {
		view: (_username: string) => `/profile?username=${_username}`,
		edit: (_username: string) => `/profile?username=${_username}`,
	},
}
