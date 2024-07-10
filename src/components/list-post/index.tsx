import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import AvatarComponent from '../avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { IUser, IUserRequest } from '@/view/user/types/user.type';
import { useGetPostByFollowing } from '@/view/home/hooks/useGetPostByFollowing';
import {  formatDateFromArray } from '@/utils/format-datetime';

interface IPost {
  id: string;
  createdAt: string;
  title: string;
  filePost: { id: string; dataFile: string }[];
}

interface IListPost {
  // posts: IPost[];
  // username: string;
  followings: IUser;
}

export const ListPost: React.FC<IListPost> = ({  followings }) => {
    const handleLikePost = (id: string) =>{

    }
    const userRequest: IUserRequest = {
		id: Number(followings?.id)
	  }
	const { data: postsByUserId, isSuccess: isGetPostSuccess } = useGetPostByFollowing(userRequest);

  return (
    <div>
       {postsByUserId?.data?.map((post: IPost) => (
        <Card key={post.id} sx={{ marginTop: "20px" }}>
          <CardHeader
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
          {post.filePost.map((photo) => (
            <CardMedia
              key={photo.id}
              component="img"
              width="200"
              src={`data:image/png;base64, ${photo.dataFile}`}
              alt="post photo"
            />
          ))}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={() => handleLikePost(post.id)} aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
