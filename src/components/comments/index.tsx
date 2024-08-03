import { IconButton, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import useLike, { useLikeStatus, useUnLike } from '@/view/user/hooks/useLike';
import { tokenDecode } from '@/common/token-decode/token-decode';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import useCreateComment, { useGetCommentsByPostId } from '@/view/user/hooks/useComment';
import { ICommentRequest } from '@/view/user/types/user.type';
import useAppModal from '../modals/app-modal/store';
import CommentListModal from '../modals/comments-modal';

interface ICommentProps {
    postId: number;
}

const Comments: React.FC<ICommentProps> = ({ postId }) => {
	const { open, close, setModalOptions, isOpen } = useAppModal()

    const userId = tokenDecode();
    // const [content, setContent] = useState<string>('');
    const [dataComment, setDataComment] = useState({
        content: '',
        replyToComment: null as number | null,
    });
    const { data: commentData, refetch: commentDataRefetch } = useGetCommentsByPostId(postId);
    const {mutate: handleCreateComment} = useCreateComment();

    const handleOpenCommentModal = (id: number) => {
        // CommentListModal
        setModalOptions({
			showCloseIcon: false,
			content: <CommentListModal postId={id} onClose={close} show={false} />,
		})
		open()
    };
    const commentRequest: ICommentRequest = {
        content: dataComment.content,
        userId: Number(userId),
        postId: Number(postId),
        id: null,
        parentId: null
    }

    const handleSubmitComment = () => {
        // Add your logic to handle comment submission here
        // console.log('Submitted comment:', content);
        // handleCreateComment(commentRequest)
        handleCreateComment(commentRequest, {
            onSuccess: () => {
                setDataComment({
                    content: '',
                    replyToComment: null,
                });
                commentDataRefetch(); // Refetch comments after creating a new comment
            },
        });
    };

    // console.log(commentData);
    return (
        <>
            <div className='flex'>
                <div className='cursor-pointer' onClick={() => handleOpenCommentModal(postId)}>
                    <IconButton aria-label="comments"   sx={{ color: 'black' }}>
                        <ChatBubbleOutlineIcon fontSize="small"  />
                    </IconButton>
                    {commentData?.totalRecords} bình luận
                </div>
                <TextField
                    value={dataComment.content}
                    onChange={e => setDataComment({
                        ...dataComment,
                        content: e.target.value,
                    })}
                    placeholder='Thêm bình luận'
                    variant="standard"
                    sx={{
                        marginLeft: '20px',
                        fontSize: '12px',
                        marginTop: '2px',
                        '& .MuiInput-underline:before': {
                            borderBottom: 'none',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottom: 'none',
                        },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottom: 'none',
                        },
                    }}
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
                {dataComment.content && (
                    <Button
                        onClick={handleSubmitComment}
                        sx={{
                            marginLeft: '10px',
                            fontSize: '12px',
                        }}
                    >
                        Đăng
                    </Button>
                )}
            </div>
        </>
    );
};

export default Comments;
