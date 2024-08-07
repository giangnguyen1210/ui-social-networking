// 'use client';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { SubmitHandler, useForm, useFormContext } from 'react-hook-form';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { LoginFormValidation } from '../../validations';
// import { z } from 'zod';
// import useAuthLogin from '../../hooks/useAuthLogin';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { ILoginRequestDto } from '../../types';
// import { APP_ROUTER } from '@/common/config';
// import Cookies from 'js-cookie'
// import { useUserGetInfo } from '../../../user/hooks/useUserGetInfo';


// type LoginFormFields = z.infer<typeof LoginFormValidation>


// export default function AuthLoginForm() {
//     // const { users, handleLogin, isLoggedIn } = useStore();
//     const router = useRouter()
//     const { mutate: handleLogin, isSuccess, isPending, data: loginData } = useAuthLogin()
//     const [dataSignIn, setDataSignIn] = useState<ILoginRequestDto>()
//     const { register, handleSubmit, formState: { errors } } = useForm<LoginFormFields>()
//     const onSubmit: SubmitHandler<LoginFormFields> = (formData) => {
//         setDataSignIn(formData);
//         handleLogin(formData as unknown as ILoginRequestDto)
//     }
//     const username = dataSignIn?.username as string;

//     useEffect(() => {
//         if (isSuccess && loginData?.errorCode === "OK") {
//             Cookies.set('username', username);
//             router.push(APP_ROUTER.paths.home.home.path);
//         }
//     }, [isSuccess, loginData, router, username]);
//     // const { data: userData, isSuccess: successUserInfo } = useUserGetInfo({ username });

//     // Cookies.set('id', userData?.data?.id);

//     // Cookies.set('id', userData?.data?.id);

//     return (
//         <Grid container component="main" sx={{ height: '100vh' }}>
//             <CssBaseline />
//             <Grid
//                 item
//                 xs={false}
//                 sm={4}
//                 md={7}
//                 sx={{
//                     backgroundImage: 'url(background-login.png)',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundColor: (t) =>
//                         t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                 }}
//             />
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                 <Box
//                     sx={{
//                         my: 8,
//                         mx: 4,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                         <LockOutlinedIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Sign in
//                     </Typography>
//                     <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>


//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="username"
//                             label="Username"
//                             autoComplete="Username"
//                             {...register('username')}
//                             autoFocus
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             {...register('password')}
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                         />

//                         <FormControlLabel
//                             control={<Checkbox value="remember" color="primary" />}
//                             label="Remember me"
//                         />
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 2 }}
//                         >
//                             Sign In
//                         </Button>
//                         <Grid container>
//                             <Grid item xs>
//                                 <Link href="#" variant="body2">
//                                     Forgot password?
//                                 </Link>
//                             </Grid>
//                             <Grid item>
//                                 <Link href="/sign-up" variant="body2">
//                                     {"Don't have an account? Sign Up"}
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>
//             </Grid>
//         </Grid>
//     );
// }

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { LoginFormValidation } from '../../validations';
import useAuthLogin from '../../hooks/useAuthLogin';
import { ILoginRequestDto } from '../../types';
import { APP_ROUTER } from '@/common/config';
import { useUserGetInfo } from '../../../user/hooks/useUserGetInfo';
import { FormControlLabel } from '@mui/material';
import Image from 'next/image';
import InstagramSVG from '@/components/svgComps/InstagramSVG';

type LoginFormFields = z.infer<typeof LoginFormValidation>;

const SignIn: NextPage = () => {
    const router = useRouter()
    const { mutate: handleLogin, isSuccess, isPending, data: loginData } = useAuthLogin()
    const [dataSignIn, setDataSignIn] = useState<ILoginRequestDto>()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormFields>()
    const onSubmit: SubmitHandler<LoginFormFields> = (formData) => {
        setDataSignIn(formData);
        handleLogin(formData as unknown as ILoginRequestDto)
    }
    const username = dataSignIn?.username as string;

    useEffect(() => {
        if (isSuccess && loginData?.errorCode === "OK") {
            Cookies.set('username', username);
            router.push(APP_ROUTER.paths.home.home.path);
        }
    }, [isSuccess, loginData, router, username]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={6}
        md={7}
        sx={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Box sx={{ position: 'relative', height: '90%', width: '90%' }}>
          <Image
            src="/loginFrame.png"
            alt="Phones"
            layout="fill"
            objectFit="contain"
          />
          <div className="absolute top-[26px] right-14 h-full w-full">
              <div className="relative ">
                <div className="absolute top-0 right-[-118px] h-[690px] w-full animate-loginImage1 opacity-0">
                  <Image
                    priority
                    src="/loginImg1.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="absolute top-0 right-[-118px] h-[690px] w-full animate-loginImage2 opacity-0">
                  <Image
                    src="/loginImg2.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="absolute top-0 right-[-118px] h-[690px] w-full animate-loginImage3 opacity-0">
                  <Image
                    src="/loginImg3.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <div className="absolute top-0 right-[-118px] h-[690px] w-full animate-loginImage4 opacity-0">
                  <Image
                    src="/loginImg4.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="h-auto w-[175px] py-10">
              <InstagramSVG disableDarkMode white={false} />
            </div>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Số điện thoại, tên người dùng hoặc email"
              autoComplete="username"
              autoFocus
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              {...register('password')}
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Bạn chưa có tài khoản? Đăng ký"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
