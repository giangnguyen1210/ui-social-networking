import { useMutation, useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

import type { IHttpResponseDto } from '@/http/types/http.response'
import type { ILoginRequestDto, ILoginResponseDto } from '@/view/auth/types'
import { ICommentRequest, ILikeRequest, IStatusLikeResponse } from '../types/user.type'
import { LikeService } from '../service/like.service'
import { CommentService } from '../service/comment.service'

export default function useCreateComment() {
	return useMutation({
		mutationKey: ['useCreateComment'],
		mutationFn: (_params: ICommentRequest) => {
			return CommentService.createComment(_params)
		},
		// onSuccess: (res: IHttpResponseDto<ILikeRequest>) => {
			
		// },
	})
}


export function useDeleteComment() {
	return useMutation({
		mutationKey: ['useDeleteComment'],
		mutationFn: (_params: ICommentRequest) => {
			return CommentService.deleteComment(_params)
		},
		// onSuccess: (res: IHttpResponseDto<ILikeRequest>) => {
			
		// },
	})
}


export function useUpdateComment() {
	return useMutation({
		mutationKey: ['useUpdateComment'],
		mutationFn: (_params: ICommentRequest) => {
			return CommentService.updateComment(_params)
		},
		// onSuccess: (res: IHttpResponseDto<ILikeRequest>) => {
			
		// },
	})
}


export function useGetCommentsByPostId(id: number){
    const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useGetCommentsByPostId', id],
		enabled: !!token && !!id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return CommentService.getCommentByPostId(id)
		},
	})
}

export function useGetCommentsById(id: number){
    const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useGetCommentsById', id],
		enabled: !!token && !!id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return CommentService.getCommentById(id)
		},
	})
}

export function useGetRepliesByCommentId(id: number){
    const token = Cookies.get('token')
	return useQuery({
		queryKey: ['useGetRepliesByCommentId', id],
		enabled: !!token && !!id,
		refetchOnWindowFocus: false,
		queryFn: () => {
			return CommentService.getRepliesByCommentId(id)
		},
	})
}