import type { AxiosResponse } from 'axios'

import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { type IGetAllUserRequest, type IGetAllUserResponse } from '../types/user.type'

export const UserService: any = {
	getAllUser: async (_user: IGetAllUserRequest) => {
		const response: AxiosResponse<IGetAllUserResponse, any> = await httpClient.get(
			API_ROUTES.user.getAllUser,
			{
				params: {
					PageNumber: 1,
					MaxPageSize: 10,
					PageSize: 10
				}
			}
		)
		// console.log(response);

		return response
	},
}
