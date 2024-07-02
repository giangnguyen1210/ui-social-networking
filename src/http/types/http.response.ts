export interface IHttpResponseDto<T> {
	errorCode: string
	errorDesc: string
	data: T
	accessToken: string
}
