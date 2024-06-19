'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import useAuthLogin from '@/view/auth/hooks/useAuthLogin'
import { type ILoginRequestDto } from '@/view/auth/types'
import { LoginFormValidation } from '@/view/auth/validations'

type LoginFormFields = z.infer<typeof LoginFormValidation>

function AuthLoginForm() {
	const router = useRouter()

	const { mutate: handleLogin, isSuccess, isPending, data: loginData } = useAuthLogin()

	const methods = useForm<LoginFormFields>({ resolver: zodResolver(LoginFormValidation) })

	const onSubmit: SubmitHandler<LoginFormFields> = (formData) => {
		handleLogin(formData as unknown as ILoginRequestDto)
	}

	const formFields = [
		{ type: 'text', name: 'username', placeholder: 'Enter username' },
		{ type: 'text', name: 'password', placeholder: 'Enter password' },
		{ type: 'checkbox', name: 'remember', label: 'Remeber me' },
	]

	useEffect(() => {
		if (loginData?.statusCode === 200) {
			methods.reset()
			router.push(APP_ROUTER.paths.admin.dashboard.path)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess])

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className="my-form flex max-w-[385px] flex-col gap-6 rounded border bg-[var(--color-login-form-bg)] p-3"
			>
				<section className="login-section h-[93px] !py-0">
					<Image
						src="/assets/auth/imgs/auth_form_header_img.png"
						alt="auth_form_header_img"
						width={40}
						height={10}
						className="h-auto"
					/>
					<p className="text-2xl font-medium uppercase text-[var(--color-surface-999)]">
						Sign in to your account
					</p>
				</section>

				<section className="login-section gap-4">
					{/* <div className="flex w-full flex-col gap-2">
					<TextBoxComponent {...register('username')} placeholder="Enter username" floatLabelType="Always" />
					{errors.username && <span className="sign-in-error">{errors.username.message}</span>}
				</div>
				<div className="flex w-full flex-col gap-2">
					<TextBoxComponent {...register('password')} placeholder="Enter password" floatLabelType="Always" />
					{errors.password && <span className="sign-in-error">{errors.password.message}</span>}
				</div>
				<div className="flex w-full items-center justify-between">
					<Controller
						name="remember"
						control={control}
						rules={{ required: true }}
						defaultValue={false}
						render={({ field }) => (
							<CheckBoxComponent
								label="Remmeber me"
								onChange={(e: any) => field.onChange(e.target.checked)}
								checked={field.value}
							/>
						)}
					/>
				</div> */}
					{formFields.map((field) => {
						return (
							<div key={field.name} className="flex w-full flex-col gap-2">
								
							</div>
						)
					})}
					<Link
						className="justify-start text-sm font-semibold text-[var(--color-text-link)]"
						href={APP_ROUTER.paths.center.signUp.path}
					>
						Don&apos;t have an account?
					</Link>

				
					<Link
						className="w-full text-sm font-semibold text-[var(--color-text-link)]"
						href={APP_ROUTER.paths.center.forgotPassword.path}
					>
						Forgot your password?
					</Link>
				</section>

				{/* <section className="login-section gap-2 border-t">
				<span className="text-center">Or continue with</span>
				<div className="flex w-full items-center justify-center gap-3">
					<ButtonComponent className="e-normal h-[33px] w-[145px]">
						<div className="flex items-center gap-3">
							<Image
								src="/assets/auth/imgs/gg_icon.svg"
								alt="auth_form_header_img"
								width={20}
								height={20}
								className="h-auto"
							/>
							<span>Google</span>
						</div>
					</ButtonComponent>
					<ButtonComponent className="e-normal h-[33px] w-[145px]">
						<div className="flex items-center gap-3">
							<Image
								src="/assets/auth/imgs/git_icon.svg"
								alt="auth_form_header_img"
								width={20}
								height={20}
								className="h-auto"
							/>
							<span>Github</span>
						</div>
					</ButtonComponent>
				</div>
			</section> */}
			</form>
		</FormProvider>
	)
}

export default AuthLoginForm
