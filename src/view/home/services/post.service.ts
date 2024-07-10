import type { AxiosResponse } from 'axios'

import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IGetUserRequest, IUserRequest } from '../../user/types/user.type'
import { IBaseResponse } from '../../auth/types/common.type'
import { IPostRequestDto } from '../types/post.type'
import { headers } from 'next/headers'

export const PostService: any = {
	getPostByUserId: async (_id: number) => {
		const response: IBaseResponse = await httpClient.get(API_ROUTES.post.getPostsByUserId(_id))
		return response
	},
	// createPostByUserId: async ()
	// createPostByUserId: async (_params: IPostRequestDto) => {
	// 	const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.post.createPost, {
	// 		title: _params.title,
	// 		files: _params.files,
	// 	},
	// 	// headers: 
	// )

	// 	return response
	// },
	createPostByUserId: async (_params: FormData) => {
		const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.post.createPost, _params, 
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		// headers: 
	)

		return response
	},
}
