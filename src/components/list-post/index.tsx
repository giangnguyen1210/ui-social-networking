import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import AvatarComponent from '../avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { IUser, IUserRequest } from '@/view/user/types/user.type';
import { useGetPostByFollowing } from '@/view/home/hooks/useGetPostByFollowing';
import { formatDateFromArray } from '@/utils/format-datetime';
import Likes from '../likes';
import Comments from '../comments';
import ImageSlider from '../post-images';
import ProfileUsername from '../profile-username';
import { useRouter } from 'next/navigation';
import { tokenDecode } from '@/common/token-decode/token-decode';
import { APP_ROUTER } from '@/common/config';
import { useGetPostByUserId } from '@/view/user/hooks/useGetPostByUser';

interface IPost {
  id: string;
  createdAt: string;
  title: string;
  filePost: { id: string; dataFile: string; mimeType: string }[];
}

interface IListPost {
  // posts: IPost[];
  // username: string;
  followings: IUser;
}

export const ListPost: React.FC<IListPost> = ({ followings }) => {
  const handleLikePost = (id: string) => {

  }
  const userId = tokenDecode()

  const userRequest: IUserRequest = {
    id: Number(followings?.id)
  }
  const userCurrentRequest: IUserRequest = {
    id: Number(userId)
  }
  const { data: postsByUserId, isSuccess: isGetPostSuccess } = useGetPostByFollowing(userRequest);
  const { data: post, isSuccess: isGetPost } = useGetPostByUserId(userCurrentRequest);

  const router = useRouter()
  const gotoDetail = (_username: string) => {
    if (followings?.id === Number(userId)) {
      router.push(APP_ROUTER.paths.home.profile.path)
    } else {
      router.push(APP_ROUTER.paths.home.profile.children.view(_username))
    }
  }
  return (
    <div>
      {postsByUserId?.data?.map((post: IPost) => (
        <Card key={post.id} sx={{ marginTop: "20px" }}>
          <CardHeader
          onClick={()=>gotoDetail(followings?.username)}
            avatar={
              <AvatarComponent width={40} height={40} avatarData={followings?.avatarData?.dataFile} />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={followings?.username}
            subheader={formatDateFromArray(post.createdAt as any)}
          />
          <ImageSlider post={post} maxHeight={550} maxWidth={550} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Likes postId={Number(post?.id)} />
            <Comments postId={Number(post?.id)} />
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
