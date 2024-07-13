// import React, { useState } from 'react';
// import AvatarComponent from '../avatar';
// import { useRouter } from 'next/navigation';
// import { APP_ROUTER } from '@/common/config';
// import { useUserGetInfoById } from '@/view/user/hooks/useUserGetInfo';
// import { useGetCommentsById } from '@/view/user/hooks/useComment';
// import { tokenDecode } from '@/common/token-decode/token-decode';
// import { TextField } from '@mui/material';

// interface ICommentContent {
//     userId: number;
//     commentId: number;
//     onClose: () => void;
//     replyData: {
//         content: string;
//         isReplying: boolean;
//         commentId: number | null;
//     };
//     setReplyData: (data: any) => void;
//     handleReplyButtonClick: (commentId: number, username: string) => void;
//     handleReplyComment: () => void;
//     handleCancelReplyComment: () => void;
//     level?: number; // Thêm một prop để lưu trữ level của comment
// }

// const CommentContent: React.FC<ICommentContent> = ({
//     onClose,
//     commentId,
//     userId,
//     replyData,
//     setReplyData,
//     handleReplyButtonClick,
//     handleReplyComment,
//     handleCancelReplyComment,
//     level = 0 // Mặc định level là 0
// }) => {
//     const router = useRouter();
//     const currentUser = tokenDecode();

//     const gotoDetail = (username: string) => {
//         if (userData?.id === Number(currentUser)) {
//             router.push(APP_ROUTER.paths.home.profile.path);
//         } else {
//             router.push(APP_ROUTER.paths.home.profile.children.view(username));
//         }
//         onClose();
//     };

//     const { data: userData } = useUserGetInfoById(userId);
//     const { data: commentData } = useGetCommentsById(commentId);

//     return (
//         <div className='flex flex-col' style={{ paddingLeft: `${level * 20}px` }}>
//             <div className='flex items-center p-4'>
//                 <div onClick={() => gotoDetail(userData?.username)} className='cursor-pointer'>
//                     <AvatarComponent width={40} height={40} avatarData={userData?.avatarData?.dataFile} />
//                 </div>
//                 <div className='flex flex-col'>
//                     <div className='flex'>
//                         <div className="pl-4 cursor-pointer" onClick={() => gotoDetail(userData?.username)}>
//                             <div className='text-sm font-semibold'>{userData?.username}</div>
//                         </div>
//                         <div className='text-sm ml-3'>
//                             {commentData?.data?.content}
//                         </div>
//                     </div>
//                     <div className='flex'>
//                         <div className='pl-4 text-xs mt-2'>{commentData?.data?.createdAt}</div>
//                         <div className='pl-4 text-[14px] mt-[5px]'>
//                             <button onClick={() => handleReplyButtonClick(commentId, userData?.username)}>trả lời</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {replyData.isReplying && replyData.commentId === commentId && (
//                 <div className="sticky bottom-0 bg-white mt-2 flex w-full">
//                     <TextField
//                         value={replyData.content}
//                         onChange={e => setReplyData({
//                             ...replyData,
//                             content: e.target.value
//                         })}
//                         placeholder='Trả lời'
//                         variant="standard"
//                         sx={{
//                             fontSize: '12px',
//                             width: '100%',
//                             marginTop: '10px'
//                         }}
//                     />
//                     {replyData.content && (
//                         <>
//                             <button
//                                 className='text-sm text-blue-500'
//                                 onClick={handleReplyComment}
//                             >
//                                 Đăng
//                             </button>
//                             <button
//                                 onClick={handleCancelReplyComment}
//                                 className='text-sm ml-3'
//                             >
//                                 Cancel
//                             </button>
//                         </>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CommentContent;
import React from 'react';
import AvatarComponent from '../avatar';
import { useRouter } from 'next/navigation';
import { APP_ROUTER } from '@/common/config';
import { useUserGetInfoById } from '@/view/user/hooks/useUserGetInfo';
import { useGetCommentsById } from '@/view/user/hooks/useComment';
import { tokenDecode } from '@/common/token-decode/token-decode';
import { TextField } from '@mui/material';

interface ICommentContent {
    userId: number;
    commentId: number;
    onClose: () => void;
    replyData: {
        content: string;
        isReplying: boolean;
        commentId: number | null;
    };
    setReplyData: (data: any) => void;
    handleReplyButtonClick: (commentId: number, username: string) => void;
    handleReplyComment: () => void;
    handleCancelReplyComment: () => void;
    level: number; // Thêm một prop để lưu trữ level của comment
}

const CommentContent: React.FC<ICommentContent> = ({
    onClose,
    commentId,
    userId,
    replyData,
    setReplyData,
    handleReplyButtonClick,
    handleReplyComment,
    handleCancelReplyComment,
    level // Sử dụng prop level để xác định mức độ lồng vào của comment
}) => {
    const router = useRouter();
    const currentUser = tokenDecode();

    const gotoDetail = (username: string) => {
        if (userData?.id === Number(currentUser)) {
            router.push(APP_ROUTER.paths.home.profile.path);
        } else {
            router.push(APP_ROUTER.paths.home.profile.children.view(username));
        }
        onClose();
    };

    const { data: userData } = useUserGetInfoById(userId);
    const { data: commentData } = useGetCommentsById(commentId);

    return (
        <div className='flex flex-col' style={{ paddingLeft: `${level * 20}px` }}>
            <div className='flex items-center p-4'>
                <div onClick={() => gotoDetail(userData?.username)} className='cursor-pointer'>
                    <AvatarComponent width={40} height={40} avatarData={userData?.avatarData?.dataFile} />
                </div>
                <div className='flex flex-col'>
                    <div className='flex'>
                        <div className="pl-4 cursor-pointer" onClick={() => gotoDetail(userData?.username)}>
                            <div className='text-sm font-semibold'>{userData?.username}</div>
                        </div>
                        <div className='text-sm ml-3'>
                            {commentData?.data?.content}
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='pl-4 text-xs mt-2'>{commentData?.data?.createdAt}</div>
                        <div className='pl-4 text-[14px] mt-[5px]'>
                            <button onClick={() => handleReplyButtonClick(commentId, userData?.username)}>trả lời</button>
                        </div>
                    </div>
                </div>
            </div>
            {replyData.isReplying && replyData.commentId === commentId && (
                <div className="sticky bottom-0 bg-white mt-2 flex w-full">
                    <TextField
                        value={replyData.content}
                        onChange={e => setReplyData({
                            ...replyData,
                            content: e.target.value
                        })}
                        placeholder='Trả lời'
                        variant="standard"
                        sx={{
                            fontSize: '12px',
                            width: '100%',
                            marginTop: '10px',
                            paddingLeft: '20px'
                        }}
                    />
                    {replyData.content && (
                        <>
                            <button
                                className='text-sm text-blue-500'
                                onClick={handleReplyComment}
                            >
                                Đăng
                            </button>
                            <button
                                onClick={handleCancelReplyComment}
                                className='text-sm ml-3'
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentContent;
