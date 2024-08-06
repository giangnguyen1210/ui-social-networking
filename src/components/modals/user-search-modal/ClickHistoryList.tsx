import React from 'react';
import { CircularProgress } from "@mui/material";
import ProfileUser from '@/components/profile-user';
import { IUser } from '@/view/user/types/user.type';

interface ClickHistoryListProps {
    userId: string;
    loading: boolean;
    clickHistory: IUser[];
    onClose: () => void;
}

const ClickHistoryList: React.FC<ClickHistoryListProps> = ({ userId, loading, clickHistory, onClose }) => {
    console.log(userId);
    console.log(clickHistory);
    return (
        <div className="overflow-y-auto mt-3" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <CircularProgress />
                </div>
            ) : (
                clickHistory.length > 0 ? clickHistory.map((userData: IUser) => (
                    <div key={userData.id} className="flex w-full">
                        <div className="w-4/5">
                            <ProfileUser onClose={onClose} userData={userData} />
                        </div>
                    </div>
                )) : (
                    <div className="flex flex-1 justify-center items-center">
                        <h2>Không có lịch sử tìm kiếm</h2>
                    </div>
                )
            )}
        </div>
    );
};

export default ClickHistoryList;
