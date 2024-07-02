import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IAvatarRequest, IGetUserRequest, IUserRequest } from '../types/user.type'
import { IBaseResponse } from '../../auth/types/common.type'
import { AxiosResponse } from 'axios'
export const UserService: any = {
	getInfo: async (_params: IGetUserRequest) => {
		const { username } = _params
		const response: IBaseResponse = await httpClient.get(`${API_ROUTES.user.getUserInfo}/${username}`)
		return response
	}
	
	
}
