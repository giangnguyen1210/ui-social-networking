import { useMutation, useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

import type { IHttpResponseDto } from '@/http/types/http.response'
import type { ILoginRequestDto, ILoginResponseDto } from '@/view/auth/types'
import { ILikeRequest, IStatusLikeResponse } from '../types/user.type'
import { LikeService } from '../service/like.service'

export default function useLike() {
	return useMutation({
		mutationKey: ['useLike'],
		mutationFn: (_params: ILikeRequest) => {
			return LikeService.createLike(_params)
		},
		// onSuccess: (res: IHttpResponseDto<ILikeRequest>) => {
			
		// },
	})
}
export function useUnLike() {
	return useMutation({
		mutationKey: ['useUnLike'],
		mutationFn: (_params: ILikeRequest) => {
			return LikeService.unLike(_params)
		},
		// onSuccess: (res: IHttpResponseDto<ILikeRequest>) => {
			
		// },
	})
}

export function useGetLikeByPostId(id: number){
    const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useGetLikeByPostId', id],
		enabled: !!token && !!id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return LikeService.getLikeByPostId(id)
		},
	})
}

export function useLikeStatus(userId: number, postId: number) {
    const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useLikeStatus', userId, postId],
		enabled: !!token && !!userId && !!postId,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return LikeService.checkIsLike(userId, postId)
		},
	})
}