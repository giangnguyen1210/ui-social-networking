// import React, { useState } from 'react';
// import { Button, CircularProgress, Divider, IconButton, InputAdornment, TextField } from "@mui/material";
// import { tokenDecode } from "@/common/token-decode/token-decode";
// import { IFollowerRequest, IUser, IUserRequest } from "@/view/user/types/user.type";
// import { useGetFollowerByUser, useGetFollowingByUser } from '@/view/user/hooks/useGetFollow';
// import ProfileUser from '@/components/profile-user';
// import { useFollowerCreate, useFollowerDelete } from '@/view/user/hooks/useFollower';
// import SearchIcon from '@mui/icons-material/Search';
// import { useGetUserByKeyword } from '@/view/user/hooks/useUserGetInfo';

// interface ModalProps {
//     userId: number;
//     show: boolean;
//     onClose: () => void;
// }

// const UserSearchModal: React.FC<ModalProps> = ({ userId, show, onClose }) => {
//     const currentUserId = tokenDecode();
//     const [keyword, setKeyword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const userRequest: IUserRequest = {
//         id: Number(userId),
//         keyword: keyword
//     };
//     const userCurrentRequest: IUserRequest = {
//         id: Number(currentUserId)
//     }

//     const { data: usersGetByKeyword, isSuccess: isusersGetByKeywordSucess, refetch: usersGetByKeywordRefetch } = useGetUserByKeyword(userRequest);

//     const handleGetFollowingAfterSearch = () => {
//         if (keyword !== '') {
//             setLoading(true);
//             setTimeout(() => {
//                 usersGetByKeywordRefetch().finally(() => setLoading(false));
//             }, 500);
//         }
//     }

//     return (
//         <section className="flex flex-col min-w-[400px] min-h-[500px] max-h-[500px] p-5">
//             <div className="flex justify-between">
//                 <div className="text-lg font-medium">Tìm kiếm</div>
//                 <button onClick={onClose} className="flex material-symbols-outlined" style={{ fontSize: 26 }}>
//                     close
//                 </button>
//             </div>
//             <Divider className="w-full pt-3" />

//             <TextField 
//                 type="text" 
//                 placeholder="Tìm kiếm..." 
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <IconButton>
//                                 <SearchIcon />
//                             </IconButton>
//                         </InputAdornment>
//                     ),
//                 }} 
//                 onKeyUp={handleGetFollowingAfterSearch} 
//                 onChange={e => setKeyword(e.target.value)} 
//             />

//             <div className="overflow-y-auto mt-3" style={{ maxHeight: 'calc(100vh - 200px)' }}>
//                 {loading ? (
//                     <div className="flex justify-center items-center h-full">
//                         <CircularProgress />
//                     </div>
//                 ) : (
//                     keyword !== '' ? isusersGetByKeywordSucess && usersGetByKeyword?.data?.map((userData: IUser) => {
//                         return (
//                             <div key={userData.id} className="flex w-full">
//                                 <div className="w-4/5">
//                                     <ProfileUser onClose={onClose} userData={userData} />
//                                 </div>
//                             </div>
//                         );
//                     }) : (
//                         <div className="flex flex-1 justify-center items-center">
//                             <h2>Hãy tìm kiếm gì đó</h2>
//                         </div>
//                     )
//                 )}
//             </div>
//         </section>
//     );
// };

// export default UserSearchModal;
import React, { useState, useEffect } from 'react';
import { CircularProgress, Divider, IconButton, InputAdornment, TextField } from "@mui/material";
import { tokenDecode } from "@/common/token-decode/token-decode";
import { IUser, IUserRequest, IUserSearch } from "@/view/user/types/user.type";
import ProfileUser from '@/components/profile-user';
import SearchIcon from '@mui/icons-material/Search';
import { useGetUserByKeyword, useGetHistorySearch, useSaveHistorySearch, useDeleteHistorySearch, useDeleteHistorySearchClickedUser } from '@/view/user/hooks/useUserGetInfo';
import ClickHistoryList from './ClickHistoryList';

interface ModalProps {
    userId: number;
    show: boolean;
    onClose: () => void;
}

const UserSearchModal: React.FC<ModalProps> = ({ userId, show, onClose }) => {
    const currentUserId = tokenDecode();
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);

    const userRequest: IUserRequest = {
        id: Number(userId),
        keyword: keyword
    };

    const { data: usersGetByKeyword, isSuccess: isusersGetByKeywordSuccess, refetch: usersGetByKeywordRefetch } = useGetUserByKeyword(userRequest);
    const { data: clickHistory, isLoading: isClickHistoryLoading, refetch: refetchClickHistory } = useGetHistorySearch(Number(currentUserId));
    const { mutate: saveHistory} = useSaveHistorySearch();
    const { mutate: deleteHistorySearch, isSuccess } = useDeleteHistorySearch();
    const { mutate: deleteHistorySearchClickedUser, isSuccess: isDeleteSuccess } = useDeleteHistorySearchClickedUser();

    useEffect(() => {
        if (show) {
            refetchClickHistory();
        }
    }, [show, refetchClickHistory]);

    const handleGetFollowingAfterSearch = () => {
        if (keyword !== '') {
            setLoading(true);
            setTimeout(() => {
                usersGetByKeywordRefetch().finally(() => setLoading(false));
            }, 500);
        }
    };

    const handleHistoryClick = (userData: IUser) => {
        const param: IUserSearch = {
            id: Number(currentUserId),
            clickUserId: userData.id
        }
        saveHistory(param);
    };
    const handleDeleteHistory = (userId: string) => {
        // Implement delete history logic here
        deleteHistorySearch(Number(userId), {
            onSuccess: () => {
                refetchClickHistory();
                console.log(`Deleted history for user: ${userId}`);
                // Perform any additional actions on success, like refetching data or showing a success message
            },
            onError: (error) => {
                console.error('Error deleting history:', error);
                // Handle the error, like showing an error message
            }
        });
    };

    const handleDeleteHistoryClickedUser = (userId: string, clickUserId: number) => {
        // Implement delete history logic here
        const param: IUserSearch = {
            id: Number(userId),
            clickUserId:  Number(clickUserId)
        }
        deleteHistorySearchClickedUser(param, {
            onSuccess: () => {
                refetchClickHistory();
                console.log(`Deleted history for user: ${userId}`);
                // Perform any additional actions on success, like refetching data or showing a success message
            },
            onError: (error) => {
                console.error('Error deleting history:', error);
                // Handle the error, like showing an error message
            }
        });
    };


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
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <CircularProgress />
                    </div>
                ) : (
                    keyword !== '' ? (
                        isusersGetByKeywordSuccess && usersGetByKeyword?.data?.map((userData: IUser) => (
                            <div key={userData.id} className="flex w-full">
                                <div className="w-4/5">
                                    <ProfileUser onHistoryClick={(userData) => handleHistoryClick(userData)} onClose={onClose} userData={userData} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <ClickHistoryList 
                            userId={currentUserId}
                            loading={isClickHistoryLoading}
                            clickHistory={clickHistory?.data || []}
                            onClickDeleteHistory={handleDeleteHistory}
                            onDeleteHistoryClickedUser={handleDeleteHistoryClickedUser}
                            onClose={onClose}
                        />
                    )
                )}
            </div>
        </section>
    );
};

export default UserSearchModal;
