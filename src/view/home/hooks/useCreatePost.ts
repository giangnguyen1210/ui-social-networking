import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

import type { IHttpResponseDto } from '@/http/types/http.response'
import { AuthService } from '@/view/auth/services/auth.service'
import type { ILoginRequestDto, ILoginResponseDto } from '@/view/auth/types'
import { PostService } from '../services/post.service'
import { IPostRequestDto } from '../types/post.type'
import { IBaseResponse } from '@/view/auth/types/common.type'

export default function useCreatePost() {
	return useMutation({
		mutationKey: ['useCreatePost'],
		mutationFn: (_params: FormData) => {
			return PostService.createPostByUserId(_params)
		},
		onSuccess: (res: IHttpResponseDto<IBaseResponse>) => {
			if (res.errorCode === "OK") {
				
			}
			if (res.errorCode !== "OK") {
			}
		},
	})
}
