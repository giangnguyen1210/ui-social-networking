import { useMutation, useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { IHttpResponseDto } from '@/http/types/http.response'
import { IUserRequest } from '@/view/user/types/user.type'
import { PostService } from '@/view/user/service/post.service'

export function useGetPostByFollowing(_params: IUserRequest) {
	const token = Cookies.get('token')
	const id=_params.id
	return useQuery({
		queryKey: ['useGetPostByFollowing', id],
		enabled: !!token &&!!id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return PostService.getPostByUserId(id)
		},
	})
}