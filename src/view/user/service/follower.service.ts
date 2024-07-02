import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IAvatarRequest, ICheckFollowingRequest, IFollowerRequest, IGetUserRequest, IUserFollowRequest, IUserRequest } from '../types/user.type'
import { IBaseResponse } from '../../auth/types/common.type'
import { AxiosResponse } from 'axios'
export const FollowerService: any = {
	getFollowing: async (_id: number) => {
		const response: IBaseResponse = await httpClient.get(API_ROUTES.follower.getUsersFollowing(_id))
		return response
	},
	getFollower: async (_id: number) => {
		const response: IBaseResponse = await httpClient.get(API_ROUTES.follower.getUsersFollower(_id))
		return response
	},
	getNotFollowing: async (_id: number) => {
		const response: IBaseResponse = await httpClient.get(API_ROUTES.follower.getUsersNotFollowing(_id))
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
