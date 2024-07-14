'use client'
import { Avatar } from '@mui/material';
import { IAvatar } from '../../templates/home-template/types/user.type';

function AvatarComponent({ width, height, avatarData }: IAvatar) {
    return (
        <div>
            <Avatar
                className='cursor-pointer'
                sx={{ width, height, border: 'solid 0.1px #ccc' }}
                alt="User Avatar"
                src={avatarData !== null ? `data:image/png;base64, ${avatarData}` : '/assets/images/user/avatar-default.png'}
            />
        </div>
    );
}

export default AvatarComponent;

