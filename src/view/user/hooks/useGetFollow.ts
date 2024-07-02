import { useMutation, useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { IAvatarRequest, ICheckFollowingRequest, IGetUserRequest, IUserFollowRequest, IUserRequest } from '../types/user.type'
import { UserService } from '../service/user.service'
import { IHttpResponseDto } from '@/http/types/http.response'
import { FollowerService } from '../service/follower.service'
import { IBaseResponse } from '@/view/auth/types/common.type'


export function useGetFollowerByUser(_params: IUserRequest) {
	const token = Cookies.get('token')
	const id=_params.id
	return useQuery({
		queryKey: ['useGetFollowerByUser', id],
		enabled: !!token,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return FollowerService.getFollower(id)
		},
	})
}

export function useGetFollowingByUser(_params: IUserRequest) {
	const token = Cookies.get('token')
	const id=_params.id
	return useQuery({
		queryKey: ['useGetFollowingByUser', id],
		enabled: !!token && !!id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return FollowerService.getFollowing(id)
		},
	})
}

export function useGetNotFollowingByUser(_params: IUserRequest) {
	const token = Cookies.get('token')
	const id=_params.id
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
	return useQuery({
		queryKey: ['useCheckIsFollowing'],
		queryFn: () => {
			return FollowerService.checkIsFollowing(_params)
		}
	})
}
