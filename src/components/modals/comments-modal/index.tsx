import React, { useState } from 'react';
import { Button, Divider, TextField } from "@mui/material";
import { tokenDecode } from "@/common/token-decode/token-decode";
import useCreateComment, { useGetCommentsByPostId } from "@/view/user/hooks/useComment";
import ProfileUsername from "@/components/profile-username";
import { ICommentRequest } from "@/view/user/types/user.type";
import CommentContent from "@/components/comments/comment-content";
import { useGetPostById } from "@/view/user/hooks/useGetPostByUser";
import Likes from "@/components/likes";
import ImageSlider from '@/components/post-images';

interface ModalProps {
    postId: number;
    show: boolean;
    onClose: () => void;
}

const CommentListModal: React.FC<ModalProps> = ({ postId, show, onClose }) => {
    const { data: commentData, refetch: commentDataRefetch } = useGetCommentsByPostId(postId);
    const userId = tokenDecode();
    const { mutate: handleCreateComment } = useCreateComment();

    const [replyData, setReplyData] = useState({
        content: '',
        isReplying: false,
        commentId: null as number | null,
    });

    const { data: postById, refetch: postByIdRefetch } = useGetPostById(postId);

    const commentRequest: ICommentRequest = {
        content: replyData.content,
        userId: Number(userId),
        postId: Number(postId),
        id: null,
        parentId: replyData.commentId,
    };

    const handleReplyButtonClick = (commentId: number, username: string) => {
        setReplyData({
            content: `@${username} `,
            isReplying: true,
            commentId: commentId
        });
    };
    const handleReplyComment = () => {
        handleCreateComment(commentRequest, {
            onSuccess: () => {
                setReplyData({
                    content: '',
                    isReplying: false,
                    commentId: null
                });
                commentDataRefetch(); // Refetch comments after creating a new comment
            },
        });
    };

    const handleCancelReplyComment = () => {
        setReplyData({
            content: '',
            isReplying: false,
            commentId: null
        });
    };

    const getReplies = (commentId: number) => {
        return commentData?.data.filter((comment: any) => comment.parentId === commentId);
    };

    console.log(postById);
    const renderComments = (comments: any[], level = 0) => {
        return comments?.map((comment: any) => (
            <div key={comment?.id} className="flex flex-col">
                <CommentContent
                    onClose={onClose}
                    commentId={comment?.id}
                    userId={comment?.userId}
                    replyData={replyData}
                    setReplyData={setReplyData}
                    handleReplyButtonClick={handleReplyButtonClick}
                    handleReplyComment={handleReplyComment}
                    handleCancelReplyComment={handleCancelReplyComment}
                    level={level}
                />
                <div className="ml-4">
                    {renderComments(getReplies(comment.id), level + 1)}
                </div>
            </div>
        ));
    };

    return (
        <div className="flex">
            <div className="w-[500px]">
                <ImageSlider post={postById?.data} maxHeight={500} maxWidth={600} />
            </div>
            <div className="w-[500px] min-h-[500px] flex flex-col relative p-4">
                <div className="flex justify-between items-center sticky top-0 bg-white z-10">
                    <div className=' w-3/5 '>
                        <ProfileUsername onClose={onClose} userId={Number(postById?.data?.userId)} />
                    </div>
                    <button onClick={onClose} className="material-symbols-outlined" style={{ fontSize: 26 }}>
                        close
                    </button>
                </div>
                <Divider className="w-full" />
                {postById?.data?.title !=='' &&
                    <div className='flex'>
                        <div className=''>
                            <ProfileUsername onClose={onClose} userId={Number(postById?.data?.userId)} />
                        </div>
                        <div className='w-full flex items-center text-sm'>
                            {postById?.data?.title}
                        </div>
                    </div>
                }
                <div className="flex-1 max-h-[380px] overflow-y-auto">
                    {commentData?.totalRecords === 0 && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-xl">Chưa có bình luận nào</div>
                        </div>
                    )}
                    {commentData?.totalRecords !== 0 && renderComments(commentData?.data.filter((comment: any) => comment.parentId === null))}
                </div>
                <Divider />
                <div>
                    <Likes postId={Number(postById?.data?.id)} />
                </div>
                <Divider />
                <div className="sticky bottom-0 bg-white mt-2 flex">
                    {replyData.isReplying ?
                        <TextField
                            value={''}
                            placeholder='Thêm bình luận'
                            variant="standard"
                            sx={{
                                fontSize: '12px',
                                width: '100%',
                                marginTop: '10px'
                            }}
                        /> :
                        <TextField
                            value={replyData.content}
                            onChange={e => setReplyData({
                                ...replyData,
                                content: e.target.value,
                            })}
                            placeholder='Thêm bình luận'
                            variant="standard"
                            sx={{
                                fontSize: '12px',
                                width: '100%',
                                marginTop: '10px'
                            }}
                        />
                    }
                    {replyData.isReplying === false && replyData.content && (
                        <Button
                            onClick={handleReplyComment}
                            sx={{
                                fontSize: '12px',
                                marginTop: '10px'
                            }}
                            variant="outlined"
                        >
                            Đăng
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentListModal;
