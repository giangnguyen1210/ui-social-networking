import type { AxiosResponse } from 'axios'

import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IGetUserRequest, IUserRequest } from '../../user/types/user.type'
import { IBaseResponse } from '../types/common.type'

export const PostService: any = {
	getPostByUserId: async (_params: IGetUserRequest) => {
		const { username } = _params
		const response: IBaseResponse = await httpClient.get(`${API_ROUTES.user.getUserInfo}/${username}`)
		return response
	},
}
