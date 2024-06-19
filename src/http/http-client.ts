import type { AxiosError, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

import { AxiosBuilder } from '@/http/axios-builder'
import type { IHttpResponseDto } from '@/http/types/http.response'

const axiosBuilder = new AxiosBuilder()
	.setBaseUrl(process.env.NEXT_PUBLIC_BASE_API_URL)
	.addInterceptor(async (config: any) => {
		const accessToken = Cookies.get('accessToken') || ''

		// eslint-disable-next-line no-param-reassign
		config.params = {
			...config.params,
		}

		if (accessToken) {
			// eslint-disable-next-line no-param-reassign
			config.headers.Authorization = `Bearer ${accessToken}`
		}

		return config
	})
	.setResponseInterceptor(async (response: AxiosResponse<IHttpResponseDto<any>, any>) => {
		if (response.status === 200) {
			if (typeof window !== 'undefined') {
				if (response?.data?.statusCode === 500) {
					window.location.href = '/500'
				}
				if (response?.data?.statusCode === 502) {
					window.location.href = '/502'
				}
				if (response?.data?.statusCode === 503) {
					window.location.href = '/503'
				}
				if (response?.data?.statusCode === 401) {
					window.location.href = '/401'
				}
				if (response?.data?.statusCode === 403) {
					window.location.href = '/403'
				}
			}
			return response.data
		}
		return response
	})
	.setErrorInterceptor(async (error: AxiosError) => {
		return error
	})
	.build()
export const httpClient = axiosBuilder
