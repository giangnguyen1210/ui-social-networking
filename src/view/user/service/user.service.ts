import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IGetUserRequest, IUpdateUserRequest, IUserRequest } from '../types/user.type'
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
	getListGender: async () => {
		const response: IBaseResponse = await httpClient.get(API_ROUTES.user.getListGender)
		return response
	},
	updateUserInfo: async (_params: IUpdateUserRequest)=>{
		const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.user.updateUser, {
			bio: _params.bio,
			name: _params.name,
			birthday: _params.birthday,
			gender: _params.gender,
			id: _params.id
		})

		return response
	},
	
}
