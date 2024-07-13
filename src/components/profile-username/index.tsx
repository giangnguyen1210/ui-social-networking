import React from 'react'

import { IUser } from '@/view/user/types/user.type'
import AvatarComponent from '../avatar'
import { useRouter } from 'next/navigation'
import { APP_ROUTER } from '@/common/config'
import { tokenDecode } from '@/common/token-decode/token-decode'
import { useUserGetInfoById } from '@/view/user/hooks/useUserGetInfo'

interface IProfileUsername{
    userId: number
    onClose: ()=> void;
}
const ProfileUsername: React.FC<IProfileUsername> = ({ onClose,userId }) => {
// function ProfileUsername(userId: number) {
    const router = useRouter()
    const gotoDetail = (_username: string) => {
        if(userData?.id===Number(userId)){
            router.push(APP_ROUTER.paths.home.profile.path)
        }else{
            router.push(APP_ROUTER.paths.home.profile.children.view(_username))
        }
        onClose();
    }
   
  const { data: userData, isLoading: userDataIsLoading, refetch } = useUserGetInfoById(userId)

//   console.log(userData);
    return (
        <div onClick={() => gotoDetail(userData?.username)} className="flex items-center p-4 cursor-pointer w-3/5 ">
            <div className="">
                <AvatarComponent width={40} height={40} avatarData={userData?.avatarData?.dataFile} />
                {/* {userData?.id && <AvatarComponent width={50} height={50} src={avatarSrc} userId={userData?.id} />} */}
            </div>
            <div className="pl-4">
                <div className='text-sm'>{userData?.username}</div>
            </div>
        </div>

    )
}

export default ProfileUsername
