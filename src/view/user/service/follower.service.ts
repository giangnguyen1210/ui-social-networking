import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IAvatarRequest, ICheckFollowingRequest, IFollowerRequest, IGetUserRequest, IUserFollowRequest, IUserRequest } from '../types/user.type'
import { IBaseResponse } from '../../auth/types/common.type'
import { AxiosResponse } from 'axios'
export const FollowerService: any = {
	getFollowing: async (_params: IUserRequest) => {
		const _id = _params.id
		const keyword = _params.keyword as string || ''
		const response: IBaseResponse = await httpClient.get(API_ROUTES.follower.getUsersFollowing(_id, keyword))
		return response
	},
	getFollower: async (_params: IUserRequest) => {
		const _id = _params.id
		const keyword = _params.keyword as string || ''
		const response: IBaseResponse = await httpClient.get(API_ROUTES.follower.getUsersFollower(_id, keyword))
		return response
	},
	getNotFollowing: async (id: number) => {
		const response: IBaseResponse = await httpClient.get(API_ROUTES.follower.getUsersNotFollowing(id))
		return response
	},
	postFollow: async (_params: IFollowerRequest) => {
		const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.follower.postFollowUser, {
			followerId: _params.followerId,
			followingId: _params.followingId,
		})

		return response
	},
	postUnFollow: async (_params: IFollowerRequest) => {
		const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.follower.postUnFollowUser, {
			followerId: _params.followerId,
			followingId: _params.followingId,
		})

		return response
	},
	checkIsFollowing: async (_params: ICheckFollowingRequest) => {
		const { userId, followingId } = _params
		const response: IBaseResponse = await httpClient.get(API_ROUTES.follower.checkIsFollowing(userId, followingId))
		return response
	},
}
