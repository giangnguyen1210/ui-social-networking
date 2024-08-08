import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IGetUserRequest, IUpdateUserRequest, IUserRequest, IUserSearch } from '../types/user.type'
import { IBaseResponse } from '../../auth/types/common.type'
import { AxiosResponse } from 'axios'
export const UserService: any = {
	getInfo: async (_params: IGetUserRequest) => {
		const { username } = _params
		const response: IBaseResponse = await httpClient.get(`${API_ROUTES.user.getUserInfo}/${username}`)
		return response
	},

	// getInfoById: async (id: number) => {
	// 	const response: IBaseResponse = await httpClient.get(`${API_ROUTES.user.getUserInfoById}/${id}`)
	// 	return response
	// }

	getInfoById: async (id: number) => {
		const response = await httpClient.get(`/api/users/get-info-by-id/${id}`);
		return response.data;
	},
	// updateAvatar: async
	updateAvatar: async (_params: FormData) => {
		const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.user.updateAvatar, _params,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)

		return response
	},
	getUserByKeyword: async (_params: IUserRequest) => {
		const _id = _params.id
		const keyword = _params.keyword as string || ''
		const response: IBaseResponse = await httpClient.get(API_ROUTES.user.getUsersByKeyword(_id, keyword))
		return response
	},
	getHistorySearch: async (userId: number) => {
		const response: IBaseResponse = await httpClient.get(API_ROUTES.user.getHistorySearch(userId))
		return response
	},
	saveHistorySearch: async (params: IUserSearch) => {
		const response: IBaseResponse = await httpClient.post(API_ROUTES.user.saveHistorySearch(
			params.id,
			params.clickUserId
		))
		return response
	},
	deleteHistorySearch: async (userId: number) => {
		const response: IBaseResponse = await httpClient.delete(API_ROUTES.user.deleteHistorySearch(
			userId
		))
		return response
	},
	deleteHistorySearchClickedUser: async (userId: number, clickUserId: number) => {
		const response: IBaseResponse = await httpClient.delete(API_ROUTES.user.deleteHistorySearchClickedUser(
			userId,
			clickUserId
		))
		return response
	},
	
	getListGender: async () => {
		const response: IBaseResponse = await httpClient.get(API_ROUTES.user.getListGender)
		return response
	},
	updateUserInfo: async (_params: IUpdateUserRequest) => {
		const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.user.updateUser, {
			bio: _params.bio,
			name: _params.name,
			username: _params.username,
			birthday: _params.birthday,
			genderId: _params.gender,
			id: _params.id
		})

		return response
	},

}
