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
import useAuthRegister from '@/view/auth/hooks/useAuthRegister'
import { type IRegisterRequestDto } from '@/view/auth/types'
import { SignUpFormValidation } from '@/view/auth/validations'

type FormFields = z.infer<typeof SignUpFormValidation>

function SignUpForm() {
	const router = useRouter()
	const { mutate: handleRegister, isSuccess, isPending, data: registerData } = useAuthRegister()

	const methods = useForm<FormFields>({ resolver: zodResolver(SignUpFormValidation) })

	const formFields = [
		{ type: 'text', name: 'fullName', placeholder: 'Enter fullname' },
		{ type: 'text', name: 'phoneNumber', placeholder: 'Enter phoneNumber' },
		{ type: 'text', name: 'email', placeholder: 'Enter email' },
		{ type: 'text', name: 'username', placeholder: 'Enter username' },
		{ type: 'text', name: 'password', placeholder: 'Enter password' },
	]

	const onSubmit: SubmitHandler<FormFields> = (formData) => {
		handleRegister(formData as IRegisterRequestDto)
	}

	useEffect(() => {
		if (registerData?.statusCode === 200) {
			methods.reset()
			router.push(APP_ROUTER.paths.center.signIn.path)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess])

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className="flex max-w-[385px] flex-col gap-6 rounded border bg-[var(--color-login-form-bg)] p-3"
			>
				<section className="sign-up-section h-[93px] !py-0">
					<Image
						src="/assets/auth/imgs/auth_form_header_img.png"
						alt="auth_form_header_img"
						width={40}
						height={10}
						className="h-auto"
					/>
					<p className="text-2xl font-medium uppercase text-[var(--color-surface-999)]">
						Sign up new account
					</p>
				</section>

				<section className="sign-up-section gap-4">
					{/* <div className="flex w-full flex-col gap-2">
					<TextBoxComponent {...register('fullName')} placeholder="FullName" floatLabelType="Always" />
					{errors.fullName && <span className="sign-up-error">{errors.fullName.message}</span>}
				</div>
				<div className="flex w-full flex-col gap-2">
					<TextBoxComponent {...register('phoneNumber')} placeholder="Phone number" floatLabelType="Always" />
					{errors.phoneNumber && <span className="sign-up-error">{errors.phoneNumber.message}</span>}
				</div>
				<div className="flex w-full flex-col gap-2">
					<TextBoxComponent {...register('email')} placeholder="Email" floatLabelType="Always" />
					{errors.email && <span className="sign-up-error">{errors.email.message}</span>}
				</div>
				<div className="flex w-full flex-col gap-2">
					<TextBoxComponent {...register('username')} placeholder="Username" floatLabelType="Always" />
					{errors.username && <span className="sign-up-error">{errors.username.message}</span>}
				</div>
				<div className="flex w-full flex-col gap-2">
					<TextBoxComponent {...register('password')} placeholder="Password" floatLabelType="Always" />
					{errors.password && <span className="sign-up-error">{errors.password.message}</span>}
				</div> */}

					{formFields.map((field) => {
						return (
							<div key={field.name} className="flex w-full flex-col gap-2">
								
							</div>
						)
					})}
				

					<div>
						Already have an account?{' '}
						<Link
							className="w-full justify-start text-sm font-semibold text-[var(--color-text-link)]"
							href={APP_ROUTER.paths.center.signIn.path}
						>
							Login here{' '}
						</Link>
					</div>
				</section>

				{/* <section className="sign-up-section gap-2 border-t">
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

export default SignUpForm
