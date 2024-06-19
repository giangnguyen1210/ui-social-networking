export interface IHttpResponseDto<T> {
	statusCode: number
	message: string
	data: T
}
