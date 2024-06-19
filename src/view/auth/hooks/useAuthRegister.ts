import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import type { IHttpResponseDto } from '@/http/types/http.response'
import { AuthService } from '@/view/auth/services/auth.service'
import type { IRegisterRequestDto, IRegisterResponseDto } from '@/view/auth/types'

export default function useAuthRegister() {
	return useMutation({
		mutationKey: ['useAuthRegister'],
		mutationFn: (_user: IRegisterRequestDto) => {
			return AuthService.register(_user)
		},
		onSuccess: (res: IHttpResponseDto<IRegisterResponseDto>) => {
			if (res.statusCode === 200) {
				toast.success('Registration successful!')
			}
			if (res.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}