import type { AxiosResponse } from 'axios'

import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import {
	type ILoginRequestDto,
	type ILoginResponseDto,
	type IRegisterRequestDto,
	type IRegisterResponseDto,
	type IResetPasswordRequestDto,
	type IResetPasswordResponseDto,
} from '@/view/auth/types'

export const AuthService: any = {
	signIn: async (_user: ILoginRequestDto) => {
		const response: AxiosResponse<ILoginResponseDto, any> = await httpClient.post(API_ROUTES.auth.signIn, {
			password: _user.password,
			username: _user.username,
		})

		return response
	},
	register: async (_user: IRegisterRequestDto) => {
		const response: AxiosResponse<IRegisterResponseDto, any> = await httpClient.post(API_ROUTES.auth.register, {
			password: _user.password,
			username: _user.username,
			name: _user.name,
			email: _user.email,
			phoneNumber: _user.phoneNumber,
		})

		return response
	},
	resetPassword: async (_user: IResetPasswordRequestDto) => {
		const response: AxiosResponse<IResetPasswordResponseDto, any> = await httpClient.post(
			API_ROUTES.auth.sendEmailVerify,
			{
				password: _user.password,
				confirmPassword: _user.confirmPassword,
			}
		)
		return response
	},
}
