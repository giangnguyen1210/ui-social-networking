import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import type { IHttpResponseDto } from '@/http/types/http.response'
import { AuthService } from '@/view/auth/services/auth.service'
import type { IResetPasswordRequestDto, IResetPasswordResponseDto } from '@/view/auth/types'

export default function useAuthResetPassword() {
	return useMutation({
		mutationKey: ['useAuthResetPassword'],
		mutationFn: (_user: IResetPasswordRequestDto) => {
			return AuthService.resetPassword(_user)
		},
		onSuccess: (res: IHttpResponseDto<IResetPasswordResponseDto>) => {
			if (res.statusCode === 200) {
				toast.success('Registration successful!')
			}
			if (res.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
