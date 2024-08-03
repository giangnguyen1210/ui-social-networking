'use client';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignUpFormValidation } from '../../validations';
import { z } from 'zod';
import useAuthLogin from '../../hooks/useAuthLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ILoginRequestDto, IRegisterRequestDto } from '../../types';
import { APP_ROUTER } from '@/common/config';
import useAuthRegister from '../../hooks/useAuthRegister';

type SignUpFormFields = z.infer<typeof SignUpFormValidation>


export default function SignUpForm() {
	// const { users, handleLogin, isLoggedIn } = useStore();
	const router = useRouter()
	const { mutate: handleRegister, isSuccess, isPending, data: signupData } = useAuthRegister()
	const methods = useForm<SignUpFormFields>({ resolver: zodResolver(SignUpFormValidation) })
	const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormFields>()
	const onSubmit: SubmitHandler<SignUpFormFields> = (formData) => {
		handleRegister(formData as unknown as IRegisterRequestDto)
	}
	useEffect(() => {
		if (signupData?.errorCode === "OK") {
			methods.reset()
			router.push(APP_ROUTER.paths.center.signIn.path)
		}
	}, [isSuccess])

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: 'url(background-login.png)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>


						<TextField
							margin="normal"
							required
							fullWidth
							size='small'
							id="name"
							label="Name"
							autoComplete="name"
							{...register('name')}
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							size='small'
							id="phone-number"
							label="Phone number"
							autoComplete="phone number"
							{...register('phoneNumber')}
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							size='small'
							{...register('email')}
							label="Email"
							type="email"
							id="email"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							size='small'
							id="username"
							label="Username"
							autoComplete="Username"
							{...register('username')}
							autoFocus
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							size='small'
							{...register('password')}
							label="Password"
							type="password"
							id="password"
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/sign-in" variant="body1">
									{"Already have an account? Sign In"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}