import React, { useState } from 'react';
import { Button, CircularProgress, Divider, IconButton, InputAdornment, TextField } from "@mui/material";
import { tokenDecode } from "@/common/token-decode/token-decode";
import { IFollowerRequest, IUser, IUserRequest } from "@/view/user/types/user.type";
import { useGetFollowerByUser, useGetFollowingByUser } from '@/view/user/hooks/useGetFollow';
import ProfileUser from '@/components/profile-user';
import { useFollowerCreate, useFollowerDelete } from '@/view/user/hooks/useFollower';
import SearchIcon from '@mui/icons-material/Search';
import { useGetUserByKeyword } from '@/view/user/hooks/useUserGetInfo';

interface ModalProps {
    userId: number;
    show: boolean;
    onClose: () => void;
}

const UserSearchModal: React.FC<ModalProps> = ({ userId, show, onClose }) => {
    const currentUserId = tokenDecode();
    const [keyword, setKeyword] = useState('')
    const userRequest: IUserRequest = {
        id: Number(userId),
        keyword: keyword
    };
    const userCurrentRequest: IUserRequest = {
        id: Number(currentUserId)
    }

    const { data: usersGetByKeyword, isSuccess: isusersGetByKeywordSucess, refetch: usersGetByKeywordRefetch } = useGetUserByKeyword(userRequest);

    const handleGetFollowingAfterSearch = () => {
        if (keyword !== '') {
            usersGetByKeywordRefetch();
        }
    }

    return (
        <section className="flex flex-col min-w-[400px] min-h-[500px] max-h-[500px] p-5">
            <div className="flex justify-between">
                <div className="text-lg font-medium">Tìm kiếm</div>
                <button onClick={onClose} className="flex material-symbols-outlined" style={{ fontSize: 26 }}>
                    close
                </button>
            </div>
            <Divider className="w-full pt-3" />

            <TextField 
                type="text" 
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
                {keyword !== '' ? isusersGetByKeywordSucess && usersGetByKeyword?.data?.map((userData: IUser) => {
                    return (
                        <div key={userData.id} className="flex w-full">
                            <div className="w-4/5">
                                <ProfileUser onClose={onClose} userData={userData} />
                            </div>
                        </div>
                    );
                })
                : 
                <div className="flex flex-1 justify-center items-center">
                    <h2>Hãy tìm kiếm gì đó</h2>
                </div>
                }
            </div>
        </section>
    );
};

export default UserSearchModal;
