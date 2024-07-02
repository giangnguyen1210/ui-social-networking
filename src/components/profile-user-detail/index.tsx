import React, { useState } from 'react'

import { ICheckFollowingRequest, IFollowerRequest, IUser, IUserRequest } from '@/view/user/types/user.type'
import AvatarComponent from '../avatar'
import { useCheckIsFollowing, useGetFollowerByUser, useGetFollowingByUser } from '@/view/user/hooks/useGetFollow';
import { useGetPostByUserId } from '@/view/user/hooks/useGetPostByUser';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Divider, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useFollowerCreate, useFollowerDelete } from '@/view/user/hooks/useFollower';
function ProfileDetailUser({ userData }: { userData: IUser }) {
  const token = Cookies.get('token')
  let userId = ''
  if (token) {
    const decoded = jwtDecode(token)
    userId = decoded.jti as string
  }
  const userRequest: IUserRequest = {
    id: Number(userData?.id)
  }
  const userCheckFollowing: ICheckFollowingRequest = {
    userId: Number(userId), 
    followingId: userData?.id
  }
  const { data: usersFollower, isSuccess: isUsersFollowingSucess } = useGetFollowerByUser(userRequest);
  const { data: usersFollowing, isSuccess: isUsersFollowerSucess } = useGetFollowingByUser(userRequest);
  const { data: postsByUserId, isSuccess: isGetPostSuccess } = useGetPostByUserId(userRequest);
  const numberFollowers = usersFollower?.totalRecords
  const numberFollowings = usersFollowing?.totalRecords
  const numberPosts = postsByUserId?.data?.length
  const username = userData?.username
  const name = userData?.name
  const avatarFile = userData?.avatarData?.dataFile
  const handleLikePost = (_id: number) => {
    console.log(_id);
  }
  const [followingUsers, setFollowingUsers] = useState<number[]>([]);
  const { mutate: createFollower, isSuccess: createFollowerSuccess, isPending: followPending, data: followData } = useFollowerCreate();
  const { mutate: deleteFollower, isSuccess: deleteFollowerSuccess, isPending: unfollowPending, data: unfollowData } = useFollowerDelete(); // Hook for unfollow API
  const handleFollowUser = (_id: number) => {
    if (followingUsers.includes(_id)) {
      // Nếu user đã follow, thực hiện unfollow
      const followerId = Number(userId);
      const followingId = _id;
      deleteFollower({ followerId, followingId }); // Gọi API unfollow
      setFollowingUsers(followingUsers.filter(id => id !== _id)); // Cập nhật trạng thái unfollow
    } else {
      // Nếu user chưa follow, thực hiện follow
      const followerRequest: IFollowerRequest = {
        followerId: Number(userId),
        followingId: _id
      };
      createFollower(followerRequest); // Gọi API follow
      setFollowingUsers([...followingUsers, _id]); // Cập nhật trạng thái follow
    }
  };

  return (
    <>
      <div className='profile__detail'>
        <div className='profile__detail--header'>
          <div className='profile__detail--header-avatar'>
            <AvatarComponent width={150} height={150} avatarData={avatarFile} />
          </div>
          <div className='profile__detail--header-info'>
            <div className='profile__username'>{username}</div>
            <div className='profile__edit'>
              <div className='profile__edit--button'>
                <button>Chỉnh sửa trang cá nhân</button>
              </div>
            </div>
            <div className='profile__storage'>
              <div className='profile__storage--button'>
                <button>
                  {numberPosts} bài viết
                </button>
              </div>
            </div>
          </div>
          <div className='profile__detail--header-info'>
            <div className='profile__username'>{name ? name : username}</div>
            <div className='profile__follower'>
              <div className='profile__follower--button'>
                <button>
                  người theo dõi {numberFollowers}
                </button>
              </div>
            </div>
            <div className='profile__following'>
              <div className='profile__following--button'>
                <button>
                  đang theo dõi {numberFollowings}
                </button>
              </div>
            </div>
          </div>
          <div className='profile__detail--header-info'>
            <div className='profile__username'>
              {
                userData?.id !== Number(userId) &&
               
                <div>
                  {followingUsers.includes(userData?.id) ? (
                    // Nếu đang follow, hiển thị nút unfollow
                    unfollowPending ? (
                      <CircularProgress size={24} thickness={4} />
                    ) : (
                      <Button style={{ textTransform: 'none' }} variant="outlined" onClick={() => handleFollowUser(userData.id)}>Bỏ theo dõi </Button>
                    )
                  ) : (
                    // Nếu chưa follow, hiển thị nút follow
                    followPending  && userData?.following ===true? (
                      <CircularProgress size={24} thickness={4} />
                    ) : (
                      <Button style={{ textTransform: 'none' }} variant="contained" onClick={() => handleFollowUser(userData.id)}>Theo dõi </Button>
                    )
                  )}
                </div>
              }
            </div>
          </div>

        </div>
        <div className='profile__detail--content'>
          <div className='profile__detail--content-posts'>
            <Divider />
            {numberPosts !== 0 ? postsByUserId?.data?.map((post: any) =>
              <Card sx={{ marginTop: "20px" }} key={post?.id}>
                <CardHeader
                  avatar={
                    <AvatarComponent width={40} height={40} avatarData={userData?.avatarData?.dataFile} />
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={username}
                  subheader={post?.createdAt}
                />
                {post?.filePost?.map((photo: any) =>
                  <>
                    <CardMedia
                      key={photo?.id}
                      component="img"
                      width="200"
                      src={`data:image/png;base64, ${photo?.dataFile}`}
                      alt="post photo"
                    />
                  </>)}
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post?.title}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton onClick={() => handleLikePost(post?.id)} aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>

            )
              :
              <div className='flex flex-col text-center mt-5'>
                <p className='text-base'> Không có bài viết </p>
              </div>

            }

          </div>
        </div>
      </div>
    </>

  )
}

export default ProfileDetailUser
