import { useMutation, useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { IAvatarRequest, ICheckFollowingRequest, IGetUserRequest, IUserFollowRequest, IUserRequest } from '../types/user.type'
import { UserService } from '../service/user.service'
import { IHttpResponseDto } from '@/http/types/http.response'
import { FollowerService } from '../service/follower.service'
import { IBaseResponse } from '@/view/auth/types/common.type'


export function useGetFollowerByUser(_params: IUserRequest) {
	const token = Cookies.get('token')
	const id= _params.id
	return useQuery({
		queryKey: ['useGetFollowerByUser', id],
		enabled: !!token &&!!_params.id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return FollowerService.getFollower(_params)
		},
	})
}

export function useGetFollowingByUser(_params: IUserRequest) {
	const token = Cookies.get('token')
	const id=_params.id
	return useQuery({
		queryKey: ['useGetFollowingByUser', id],
		enabled: !!token &&!!_params.id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return FollowerService.getFollowing(_params)
		},
	})
}

export function useGetNotFollowingByUser(id: number) {
	const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useGetNotFollowingByUser', id],
		enabled: !!token && !!id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return FollowerService.getNotFollowing(id)
		},
	})
}

export function useCheckIsFollowing(_params: ICheckFollowingRequest){
	const token = Cookies.get('token')
	const followingId=_params.followingId
	const id=_params.userId
	return useQuery({
		queryKey: ['useCheckIsFollowing'],
		enabled: !!token && !!id && !!followingId,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return FollowerService.checkIsFollowing(_params)
		}
	})
}
