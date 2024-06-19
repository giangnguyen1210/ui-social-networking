import type { AxiosResponse } from 'axios'

import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import {
	AuthEnum,
	type ILoginRequestDto,
	type ILoginResponseDto,
	type IRegisterRequestDto,
	type IRegisterResponseDto,
	type IResetPasswordRequestDto,
	type IResetPasswordResponseDto,
} from '@/view/auth/types'

export const AuthService: any = {
	login: async (_user: Omit<ILoginRequestDto, AuthEnum>) => {
		const response: AxiosResponse<ILoginResponseDto, any> = await httpClient.post(API_ROUTES.auth.login, {
			password: _user.password,
			username: _user.username,
			authType: AuthEnum.authType,
		})

		return response
	},
	register: async (_user: Omit<IRegisterRequestDto, AuthEnum>) => {
		const response: AxiosResponse<IRegisterResponseDto, any> = await httpClient.post(API_ROUTES.auth.register, {
			password: _user.password,
			username: _user.username,
			fullName: _user.fullName,
			email: _user.email,
			phoneNumber: _user.phoneNumber,
			authType: AuthEnum.authType,
		})

		return response
	},
	resetPassword: async (_user: IResetPasswordRequestDto) => {
		const response: AxiosResponse<IResetPasswordResponseDto, any> = await httpClient.post(
			API_ROUTES.auth.resetPassword,
			{
				password: _user.password,
				confirmPassword: _user.confirmPassword,
			}
		)
		return response
	},
}
