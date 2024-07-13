import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IGetUserRequest } from '../types/user.type'
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
}
