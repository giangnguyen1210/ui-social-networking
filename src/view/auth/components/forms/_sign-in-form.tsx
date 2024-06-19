'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { enableRipple } from '@syncfusion/ej2-base'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import Image from 'next/image'
import Link from 'next/link'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import { RHFDynamicInput } from '@/components/inputs'
import { TestLoginFormValidation } from '@/view/auth/validations'

type LoginFormFields = z.infer<typeof TestLoginFormValidation>
enableRipple(true)

function AuthLoginForm() {
	const methods = useForm<LoginFormFields>({ resolver: zodResolver(TestLoginFormValidation) })

	const onSubmit: SubmitHandler<LoginFormFields> = (formData) => {
		// eslint-disable-next-line no-console
		console.log(formData)
	}

	const formFields = [
		{ type: 'text', name: 'username', placeholder: 'Enter username' },
		{ type: 'text', name: 'password', placeholder: 'Enter password' },
		{ type: 'checkbox', name: 'remember', label: 'Remeber me' },
		{
			type: 'radio',
			name: 'gender',
			radioOptions: [
				{ value: 'male', label: 'Male', id: 'gender_01' },
				{ value: 'female', label: 'Female', id: 'gender_02' },
			],
		},
		{ type: 'date', name: 'birth', placeholder: 'Date of birth' },
		{ type: 'text-area', name: 'contact', placeholder: 'Contact us' },
	]

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
					{formFields.map((field) => {
						return (
							<div key={field.name} className="flex w-full flex-col gap-2">
								<RHFDynamicInput
									name={field.name}
									type={field.type as 'text' | 'checkbox' | 'radio'}
									placeholder={field?.placeholder}
									label={field?.label}
									radioOptions={field?.radioOptions}
								/>
							</div>
						)
					})}

					<Link
						className="justify-start text-sm font-semibold text-[var(--color-text-link)]"
						href={APP_ROUTER.paths.center.signUp.path}
					>
						Don&apos;t have an account?
					</Link>

					<ButtonComponent type="submit" className="e-primary w-full">
						SUBMIT
					</ButtonComponent>

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
