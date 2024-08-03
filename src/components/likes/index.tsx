import { Button, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useState } from 'react';
import useLike, { useGetLikeByPostId, useLikeStatus, useUnLike } from '@/view/user/hooks/useLike';
import { tokenDecode } from '@/common/token-decode/token-decode';
import { ILikeRequest } from '@/view/user/types/user.type';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
interface ILikesProps {
    // handleLikePost: () => void;
    postId: number;
}

const Likes: React.FC<ILikesProps> = ({ postId }) => {
    const userId = tokenDecode();
    const { data: likeData, isSuccess: isLikeDataSuccess, refetch: likeDataRefetch } = useGetLikeByPostId(postId);
    const { data: isLiked, isSuccess: isLikeStatusSuccess, refetch: isLikedRefetch } = useLikeStatus(Number(userId), postId);
    // const { mutate: checkIsLike } = useLikeStatus();
    const { mutate: handleLike, isSuccess: isLikeSuccess } = useLike()
    const { mutate: handleUnLikeLike, isSuccess: isUnlikeSuccess } = useUnLike()
    const likeRequest: ILikeRequest = {
        userId: Number(userId),
        postId: Number(postId),
    }
    const handleLikePost = (id: number) => {
        if (!isLiked?.isLiked) {
            handleLike(likeRequest,
                {
                    onSuccess: () => {
                        likeDataRefetch();
                        isLikedRefetch();
                    }
                }
            )
        } else {
            handleUnLikeLike(likeRequest, {
                onSuccess: () => {
                    likeDataRefetch();
                    isLikedRefetch();
                }
            })
        }
    }
    return (
        <>
            {
                isLiked?.isLiked ?
                    <IconButton
                        sx={{ color: 'red'  }}
                        onClick={() => (handleLikePost(postId))}
                        aria-label="add to favorites"
                    >
                        <FavoriteIcon  />
                    </IconButton> :
                    <IconButton
                        sx={{ color: 'black' }}
                        onClick={() => (handleLikePost(postId))}
                        aria-label="add to favorites"
                    >
                        <FavoriteBorderIcon />
                    </IconButton>
            }
            <div className='cursor-pointer'>{isLikeDataSuccess && likeData?.totalRecords} lượt thích</div>
        </>
    );
};

export default Likes;
