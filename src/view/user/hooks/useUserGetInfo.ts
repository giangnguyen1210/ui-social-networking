import { useMutation, useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { IAvatarRequest, IGetUserRequest, IUpdateUserRequest, IUserRequest } from '../types/user.type'
import { IHttpResponseDto } from '@/http/types/http.response'
import { IBaseResponse } from '@/view/auth/types/common.type'
import { UserService } from '../service/user.service'


export function useUserGetInfo(_params: IGetUserRequest) {
	const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useUserGetInfo', _params],
		enabled: !!token &&!!_params,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return UserService.getInfo(_params)
		},
	})
}


export function useUserGetInfoById(id: number) {
	const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useUserGetInfoById', id],
		enabled: !!token && !!id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return UserService.getInfoById(id)
		},
	})
}


export function useGetAvatar(_param: number) {
	const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useGetAvatar'],
		enabled: !!token,
		refetchOnWindowFocus: false,
		queryFn: () => {
			const userRequest: IAvatarRequest = { id: Number(_param)};
			return UserService.getAvatar(userRequest)
			
		}
	})
}

export function useGetUserByKeyword(_params: IUserRequest){
	const token = Cookies.get('token')
	const id= _params.id
	return useQuery({
		queryKey: ['useGetUserByKeyword', id],
		enabled: !!token &&!!_params.id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return UserService.getUserByKeyword(_params)
		},
	})
}


export function useUpdateAvatar() {
	return useMutation({
		mutationKey: ['useUpdateAvatar'],
		mutationFn: (_params: FormData) => {
			return UserService.updateAvatar(_params)
		},
		onSuccess: (res: IHttpResponseDto<IBaseResponse>) => {
			if (res.errorCode === "OK") {
				
			}
			if (res.errorCode !== "OK") {
			}
		},
	})
}

export function useUpdateUserInfo() {
	return useMutation({
		mutationKey: ['useUpdateUserInfo'],
		mutationFn: (_params: IUpdateUserRequest) => {
			return UserService.updateUserInfo(_params)
		},
		onSuccess: (res: IHttpResponseDto<IBaseResponse>) => {
			if (res.errorCode === "OK") {
				
			}
			if (res.errorCode !== "OK") {
			}
		},
	})
}
export function useGetListGender() {
	const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useGetListGender'],
		enabled: !!token,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return UserService.getListGender()
		},
	})
}