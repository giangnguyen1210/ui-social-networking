import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

import type { IHttpResponseDto } from '@/http/types/http.response'
import { AuthService } from '@/view/auth/services/auth.service'
import type { ILoginRequestDto, ILoginResponseDto } from '@/view/auth/types'

export default function useAuthLogin() {
	return useMutation({
		mutationKey: ['useAuthLogin'],
		mutationFn: (_user: ILoginRequestDto) => {
			return AuthService.signIn(_user)
		},
		onSuccess: (res: IHttpResponseDto<ILoginRequestDto>) => {
			if (res.errorCode === "OK") {
				if (res.accessToken) {
					Cookies.set('token', res.accessToken)
					toast.success('Login successful!')
				}
			}
			if (res.errorCode !== "OK") {
				toast.error(res.errorDesc)
			}
		},
	})
}
