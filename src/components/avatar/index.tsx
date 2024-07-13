'use client'
import { Avatar } from '@mui/material';
import { IAvatar } from '../../templates/home-template/types/user.type';
import useAppModal from '../modals/app-modal/store';
import AvatarChangeModal from './avatar-change-modal';

function AvatarComponent({ width, height, avatarData }: IAvatar) {
    const { open, close, setModalOptions, isOpen } = useAppModal()

    const handleOpenChangeAvatarModal = () => {
        setModalOptions({
            showCloseIcon: false,
            content: <AvatarChangeModal onClose={close} show={false} />,
        })
        open()
    }
    return (
        <div onClick={handleOpenChangeAvatarModal}>
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

