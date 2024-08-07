import React from 'react';
import { CircularProgress } from "@mui/material";
import ProfileUser from '@/components/profile-user';
import { IUser } from '@/view/user/types/user.type';
import { useDeleteHistorySearch } from '@/view/user/hooks/useUserGetInfo';

interface ClickHistoryListProps {
    userId: string;
    loading: boolean;
    clickHistory: IUser[];
    onClose: () => void;
    onClickDeleteHistory: (userId: string) => void; 
}

const ClickHistoryList: React.FC<ClickHistoryListProps> = ({onClickDeleteHistory, userId, loading, clickHistory, onClose }) => {

    return (
        <div className="overflow-y-auto mt-3" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <div className='flex justify-between'>
                        <div className='ml-4'>Gần đây</div>
                        {clickHistory.length > 0 &&
                            <button onClick={() => onClickDeleteHistory(userId)} className='text-blue-500'>
                                Xoá tất cả
                            </button>
                        }
                    </div>
                    {clickHistory.length > 0 ? clickHistory.map((userData: IUser) => (
                        <div key={userData.id} className="flex w-full">
                            <div className="w-4/5">
                                <ProfileUser onClose={onClose} userData={userData} />
                            </div>
                        </div>
                    )) : (
                        <div className="flex flex-1 justify-center items-center">
                            <div className='flex'>Không có lịch sử tìm kiếm</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ClickHistoryList;
