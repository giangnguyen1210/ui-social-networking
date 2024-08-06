export const userApiRoute = {
    getUserInfo: '/api/users/get-info',
    // getUserInfoById: (_id: number) =>`/api/users/get-info-by-id/${_id}`,
	getUserInfoById: (_id: number) => `/api/users/get-info-by-id/${_id}`,
	updateAvatar: `/api/users/update-avatar`,
    getUsersByKeyword: (_id:number, keyword: string) => `/api/users/search-users/${_id}?keyword=${keyword}`,
    getHistorySearch: (_id:number) => `/api/users/search-users/history/${_id}`,
    saveHistorySearch: (id: number, clickUserId: number) => `/api/users/search-users/history?userId=${id}&clickedUserId=${clickUserId}`,
    getListGender: `/api/users/list-gender`,
    updateUser: `/api/users/update-info`
};
