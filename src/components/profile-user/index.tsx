import React from 'react'

import { IUser } from '@/view/user/types/user.type'
import AvatarComponent from '../avatar'
import { useRouter } from 'next/navigation'
import { APP_ROUTER } from '@/common/config'
import { tokenDecode } from '@/common/token-decode/token-decode'
interface IProfileUser{
    userData: IUser
    onClose: () => void;
    onHistoryClick?: (userData: IUser) => void;
}

const ProfileUser: React.FC<IProfileUser> = ({ onHistoryClick,userData, onClose }) =>{
    let userId = tokenDecode()
    const router = useRouter()
    const gotoDetail = (_username: string) => {
        if(userData?.id===Number(userId)){
            router.push(APP_ROUTER.paths.home.profile.path)
            onClose();
        }else{
            router.push(APP_ROUTER.paths.home.profile.children.view(_username))
            onClose();
        }
        onHistoryClick && onHistoryClick(userData);
    }
   
    return (
        <div onClick={() => gotoDetail(userData?.username)} className="flex items-center p-4 cursor-pointer">
            <div className="">
                <AvatarComponent width={50} height={50} avatarData={userData?.avatarData?.dataFile} />
                {/* {userData?.id && <AvatarComponent width={50} height={50} src={avatarSrc} userId={userData?.id} />} */}
            </div>
            <div className="pl-4">
                <div className='text-sm'>{userData?.username}</div>
                <div className='text-base text-gray-500'>{userData?.name}</div>
            </div>
        </div>

    )
}

export default ProfileUser
