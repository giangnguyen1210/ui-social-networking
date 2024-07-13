export const userApiRoute = {
    getUserInfo: '/api/users/get-info',
    // getUserInfoById: (_id: number) =>`/api/users/get-info-by-id/${_id}`,
	getUserInfoById: (_id: number) => `/api/users/get-info-by-id/${_id}`,
	updateAvatar: `/api/users/update-avatar`,

};
