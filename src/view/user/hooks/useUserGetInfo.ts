import { useMutation, useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { IAvatarRequest, IGetUserRequest, IUserRequest } from '../types/user.type'
import { UserService } from '../service/user.service'
import { IHttpResponseDto } from '@/http/types/http.response'


export function useUserGetInfo(_params: IGetUserRequest) {
	const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useUserGetInfo', _params],
		enabled: !!token,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return UserService.getInfo(_params)
		},
	})
}


export function useGetAvatar(_param: number) {
	const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useAuthRegister'],
		enabled: !!token,
		refetchOnWindowFocus: false,
		queryFn: () => {
			const userRequest: IAvatarRequest = { id: Number(_param)};
			return UserService.getAvatar(userRequest)
			
		}
	})
}
