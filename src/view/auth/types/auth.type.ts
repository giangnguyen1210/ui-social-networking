// LOGIN
export interface ILoginRequestDto {
	username: string
	password: string
	authType: AuthEnum.authType
}

export interface ILoginResponseDto {
	accessToken: string
	tokenType: string
	refreshToken: string
}

// REGISTER
export interface IRegisterRequestDto {
	fullName: string
	username: string
	password: string
	email: string
	phoneNumber: string
	authType: AuthEnum.authType
}

export interface IRegisterResponseDto {
	succeeded: true
	errors: any[]
}

// RESET PASSWORD
export interface IResetPasswordRequestDto {
	password: string
	confirmPassword: string
}

export interface IResetPasswordResponseDto {
	succeeded: true
	errors: any[]
}

export enum AuthEnum {
	authType = 1,
}
