// LOGIN
export interface ILoginRequestDto {
	username: string
	password: string
}

export interface ILoginResponseDto {
	errorCode: string
	errorDesc: string
	token: string
}

// REGISTER
export interface IRegisterRequestDto {
	name: string
	username: string
	password: string
	email: string
	phoneNumber: string
	gender: number;
}

export interface IRegisterResponseDto {
	errorCode: string
	errorDesc: string
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
