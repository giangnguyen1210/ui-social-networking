import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IAvatarRequest, IGetUserRequest, IUserFollowRequest, IUserRequest } from '../types/user.type'
import { IBaseResponse } from '../../auth/types/common.type'
import { AxiosResponse } from 'axios'
export const PostService: any = {
    getPostByUserId: async (_id: number) => {
		const response: IBaseResponse = await httpClient.get(API_ROUTES.post.getPostsByUserId(_id))
		return response
	},
	getPostById: async (_id: number) => {
		const response: IBaseResponse = await httpClient.get(API_ROUTES.post.getPostsById(_id))
		return response
	}
}
