'use client';
import AvatarComponent from '@/components/avatar'
import React from 'react'
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie'
import { useUserGetInfo } from '../hooks/useUserGetInfo';
import ProfileDetailUser from '@/components/profile-user-detail';

function ProfileDetailPage() {
  const params = useSearchParams()
  const usernamePerson = Cookies.get('username')
  const username = params.get('username') || usernamePerson as string
  const { data: userData, isLoading: userDataIsLoading } = useUserGetInfo({ username })
  if (userData?.data===null) {
    return (
      <div className='flex flex-col text-center'>
        <h1 className='text-2xl mb-4'>Rất tiếc, trang này hiện không khả dụng.</h1>
        <p className='text-base'>Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ. <span> <a href='/home' className='text-blue-500'>Quay lại trang chủ</a></span> </p>
      </div>
    )
  }
  return (
    <ProfileDetailUser userData={userData?.data} />
  )
}

export default ProfileDetailPage