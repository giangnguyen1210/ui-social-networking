import { useMutation, useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { IAvatarRequest, IGetUserRequest, IUserFollowRequest, IUserRequest } from '../types/user.type'
import { UserService } from '../service/user.service'
import { IHttpResponseDto } from '@/http/types/http.response'
import { FollowerService } from '../service/follower.service'
import { PostService } from '../service/post.service'


export function useGetPostByUserId(_params: IUserRequest) {
	const token = Cookies.get('token')
	const id=_params.id
	return useQuery({
		queryKey: ['useGetPostByUserId', id],
		enabled: !!token,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return PostService.getPostByUserId(id)
		},
	})
}