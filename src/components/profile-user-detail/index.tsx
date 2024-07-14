import React, { useState, useEffect } from 'react';
import { ICheckFollowingRequest, IFollowerRequest, IUser, IUserRequest } from '@/view/user/types/user.type';
import { useCheckIsFollowing, useGetFollowerByUser, useGetFollowingByUser } from '@/view/user/hooks/useGetFollow';
import { useGetPostByUserId } from '@/view/user/hooks/useGetPostByUser';
import { Button, Card, Divider } from '@mui/material';
import { useFollowerCreate, useFollowerDelete } from '@/view/user/hooks/useFollower';
import styled from '@emotion/styled';
import { tokenDecode } from '@/common/token-decode/token-decode';
import useLike, { } from '@/view/user/hooks/useLike';
import ImagesProfileSlider from '../profile-post-images';
import AvatarPersonalComponent from '../avatar/avatar-personal';
import useAppModal from '../modals/app-modal/store';
import UserFollowingModal from '../modals/user-following-modal';
import UserFollowerModal from '../modals/user-follower-modal';
import UserUpdateModal from '../modals/user-update-modal';

const StyledImage = styled.img<{ isLarge: boolean }>`
  width: ${props => props.isLarge ? '50%' : '100%'};
`;
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function ProfileDetailUser({ userData }: { userData: IUser }) {
  let userId = tokenDecode();

  const userRequest: IUserRequest = {
    id: Number(userData?.id)
  };

  const { data: usersFollower, isSuccess: isUsersFollowingSucess, refetch: usersFollowingRefetch } = useGetFollowerByUser(userRequest);
  const { data: usersFollowing, isSuccess: isUsersFollowerSucess, refetch: usersFollowerRefetch } = useGetFollowingByUser(userRequest);
  const { data: postsByUserId, isSuccess: isGetPostSuccess } = useGetPostByUserId(userRequest);

  const { mutate: handleLike, isSuccess } = useLike();
  const numberFollowers = usersFollower?.totalRecords;
  const numberFollowings = usersFollowing?.totalRecords;
  const numberPosts = postsByUserId?.data?.length;
  const username = userData?.username;
  const name = userData?.name;
  const avatarFile = userData?.avatarData?.dataFile;
  const { open, close, setModalOptions, isOpen } = useAppModal()

  const [following, setFollowing] = useState<boolean>(false);

  const checkFollowing: ICheckFollowingRequest = {
    userId: Number(userId),
    followingId: userData?.id
  };

  const { data: checkIsFollowing, refetch: checkIsFollowingRefetch } = useCheckIsFollowing(checkFollowing);
  const { mutate: createFollower, isSuccess: createFollowerSuccess, isPending: followPending, data: followData } = useFollowerCreate();
  const { mutate: deleteFollower, isSuccess: deleteFollowerSuccess, isPending: unfollowPending, data: unfollowData } = useFollowerDelete();

  useEffect(() => {
    setFollowing(checkIsFollowing?.data);
  }, [checkIsFollowing?.data]);

  const handleFollowUser = (_id: number) => {
    if (following) {
      const followerId = Number(userId);
      const followingId = _id;
      deleteFollower({ followerId, followingId }, {
        onSuccess: () => {
          setFollowing(false);
          checkIsFollowingRefetch();
          usersFollowingRefetch();
          usersFollowerRefetch();
        }
      });
    } else {
      const followerRequest: IFollowerRequest = {
        followerId: Number(userId),
        followingId: _id,
      };
      createFollower(followerRequest, {
        onSuccess: () => {
          setFollowing(true);
          usersFollowingRefetch();
          checkIsFollowingRefetch();
          usersFollowerRefetch();
        }
      });
    }
  };
  const handleOpenFollowingUser = (id: number) => {
    setModalOptions({
      showCloseIcon: false,
      content: <UserFollowingModal userId={id} onClose={close} show={false} />,
    })
    open()
  }
  const handleOpenFollowerUser = (id: number) => {
    setModalOptions({
      showCloseIcon: false,
      content: <UserFollowerModal userId={id} onClose={close} show={false} />,
    })
    open()
  }

  const handleClickEditProfile = () => {
    setModalOptions({
      showCloseIcon: false,
      content: <UserUpdateModal onClose={close} show={false} />,
    })
    open()
  }



  return (
    <div className='profile__detail'>
      <div className='profile__detail--header'>
        <div className='profile__detail--header-avatar'>
          <AvatarPersonalComponent width={150} height={150} avatarData={avatarFile} userId={userData?.id} />
        </div>
        <div className='profile__detail--header-info'>
          <div className='profile__username'>{username}</div>
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
              <button onClick={() => handleOpenFollowerUser(userData?.id)}>
                người theo dõi {numberFollowers}
              </button>
            </div>
          </div>
          <div className='profile__following'>
            <div className='profile__following--button'>
              <button onClick={() => handleOpenFollowingUser(userData?.id)}>
                đang theo dõi {numberFollowings}
              </button>
            </div>
          </div>
        </div>
        <div className='profile__detail--header-info'>
          <div className='profile__username'>
            {userData?.id !== Number(userId) &&
              <div>
                {following ? (
                  <Button style={{ textTransform: 'none' }} variant="outlined" onClick={() => handleFollowUser(userData.id)}>Bỏ theo dõi</Button>
                ) : (
                  <Button style={{ textTransform: 'none' }} variant="contained" onClick={() => handleFollowUser(userData.id)}>Theo dõi</Button>
                )}
              </div>
            }
            {userData?.id === Number(userId) &&
              <div className='profile__edit'>
                <div className='profile__edit--button' onClick={handleClickEditProfile}>
                  <Button style={{ textTransform: 'none' }} variant="outlined">Chỉnh sửa trang cá nhân</Button>
                </div>
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
  );
}

export default ProfileDetailUser;
