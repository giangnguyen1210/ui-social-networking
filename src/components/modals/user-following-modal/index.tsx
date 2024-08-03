import React, { useState } from 'react';
import { Button, CircularProgress, Divider, IconButton, InputAdornment, TextField } from "@mui/material";
import { tokenDecode } from "@/common/token-decode/token-decode";
import { IUser, IUserRequest } from "@/view/user/types/user.type";
import { useGetFollowerByUser, useGetFollowingByUser } from '@/view/user/hooks/useGetFollow';
import ProfileUser from '@/components/profile-user';
import { useFollowerCreate, useFollowerDelete } from '@/view/user/hooks/useFollower';
import SearchIcon from '@mui/icons-material/Search';

interface ModalProps {
    userId: number;
    show: boolean;
    onClose: () => void;
}

const UserFollowingModal: React.FC<ModalProps> = ({ userId, show, onClose }) => {
    const currentUserId = tokenDecode();
    const [keyword, setKeyword] = useState('');
    const userRequest: IUserRequest = {
        id: Number(userId),
        keyword: keyword
    };
    const userCurrentRequest: IUserRequest = {
        id: Number(currentUserId)
    };
    const [following, setFollowing] = useState<boolean>(false);

    const { data: usersFollowing, isSuccess: isUsersFollowingSuccess, refetch: usersFollowingRefetch } = useGetFollowingByUser(userRequest);
    const { data: userCurrentFollowing, isSuccess: userCurrentFollowingSuccess, refetch } = useGetFollowingByUser(userCurrentRequest);
    const { mutate: createFollower, isSuccess: createFollowerSuccess, isPending: followPending } = useFollowerCreate();
    const { mutate: deleteFollower, isSuccess: deleteFollowerSuccess, isPending: unfollowPending } = useFollowerDelete();

    const handleGetFollowingAfterSearch = () => {
        usersFollowingRefetch();
    };

    return (
        <section className="flex flex-col min-w-[400px] min-h-[500px] max-h-[500px] p-5">
            <div className="flex justify-between">
                <div className="text-lg font-medium">Đang theo dõi</div>
                <button onClick={onClose} className="flex material-symbols-outlined" style={{ fontSize: 26 }}>
                    close
                </button>
            </div>
            <Divider className="w-full pt-3" />

            <TextField 
                type='text' 
                placeholder="Tìm kiếm..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }} 
                onKeyUp={handleGetFollowingAfterSearch} 
                onChange={e => setKeyword(e.target.value)} 
            />

            <div className="overflow-y-auto mt-3" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {isUsersFollowingSuccess && usersFollowing?.data?.map((userData: IUser) => (
                    <div key={userData.id} className='flex w-full'>
                        <div className='w-4/5'>
                            <ProfileUser onClose={onClose} userData={userData} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UserFollowingModal;
