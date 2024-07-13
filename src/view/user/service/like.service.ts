import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IAvatarRequest, ICheckFollowingRequest, IFollowerRequest, IGetUserRequest, ILikeRequest, IUserFollowRequest, IUserRequest } from '../types/user.type'
import { IBaseResponse } from '../../auth/types/common.type'
import { AxiosResponse } from 'axios'
export const LikeService: any = {
	
	createLike: async (_params: ILikeRequest) => {
		const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.like.createLike, {
			userId: _params.userId,
			postId: _params.postId,
		})

		return response
	},
    unLike: async (_params: ILikeRequest) => {
		const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.like.unLike, {
			userId: _params.userId,
			postId: _params.postId,
		})

		return response
	},
	getLikeByPostId: async (id: number) => {
        const response: IBaseResponse = await httpClient.get(API_ROUTES.like.getLikeByPostId(id))
		return response
    },
    checkIsLike: async (userId: number, postId: number) =>{
        const response: any = await httpClient.get(API_ROUTES.like.likeStatus(userId, postId))

		return response
    }
   
}
