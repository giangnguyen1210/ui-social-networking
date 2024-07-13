import React, { useState } from 'react'
import { ICheckFollowingRequest, IFollowerRequest, IUser, IUserRequest } from '@/view/user/types/user.type'
import AvatarComponent from '../avatar'
import { useGetFollowerByUser, useGetFollowingByUser } from '@/view/user/hooks/useGetFollow';
import { useGetPostByUserId } from '@/view/user/hooks/useGetPostByUser';
import { Button, Card, CircularProgress, Divider } from '@mui/material';
import Cookies from 'js-cookie'
import { useFollowerCreate, useFollowerDelete } from '@/view/user/hooks/useFollower';
import styled from '@emotion/styled';
import { tokenDecode } from '@/common/token-decode/token-decode';
import useLike, {  } from '@/view/user/hooks/useLike';
import ImagesProfileSlider from '../profile-post-images';

const StyledImage = styled.img<{ isLarge: boolean }>`
  width: ${props => props.isLarge ? '50%' : '100%'};
`;
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
function ProfileDetailUser({ userData }: { userData: IUser }) {
  let userId = tokenDecode()

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
  // const { data: isLiked, isSuccess: isLikeStatusSuccess } = useLikeStatus(Number(userId),postId);


  // {postId: postId, userId: Number(userId)}
  const { mutate: handleLike, isSuccess } = useLike()
  const numberFollowers = usersFollower?.totalRecords
  const numberFollowings = usersFollowing?.totalRecords
  const numberPosts = postsByUserId?.data?.length
  const username = userData?.username
  const name = userData?.name
  const avatarFile = userData?.avatarData?.dataFile
  const [followingUsers, setFollowingUsers] = useState<number[]>([]);
  const { mutate: createFollower, isSuccess: createFollowerSuccess, isPending: followPending, data: followData } = useFollowerCreate();
  const { mutate: deleteFollower, isSuccess: deleteFollowerSuccess, isPending: unfollowPending, data: unfollowData } = useFollowerDelete(); // Hook for unfollow API
  // const {data: likeData, isSuccess: isLikeDataSucces} = useGetLikeByPostId()
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
                    followPending && userData?.following === true ? (
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {numberPosts !== 0 ? postsByUserId?.data?.map((post: any) => (
                <Card key={post?.id}>
                  <ImagesProfileSlider post={post} maxHeight={0} maxWidth={0} />
                  
                </Card>
              )) : (
                <div className='flex flex-col text-center mt-5'>
                  <p className='text-base'>Không có bài viết</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileDetailUser
