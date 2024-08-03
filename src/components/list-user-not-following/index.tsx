import React, { useState } from 'react';
import { IFollowerRequest, IUser, IUserFollowRequest } from '@/view/user/types/user.type';
import { useGetNotFollowingByUser } from '@/view/user/hooks/useGetFollow';
import ProfileUser from '../profile-user';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { Button, CircularProgress } from '@mui/material'; // Import CircularProgress for loading indicator
import { useFollowerCreate, useFollowerDelete } from '@/view/user/hooks/useFollower';
import { tokenDecode } from '@/common/token-decode/token-decode';

function ListUserNotFollowing({ userData }: { userData: IUser }) {
  const id = userData?.id as number;
  const token = Cookies.get('token');
  const { mutate: createFollower, isSuccess: createFollowerSuccess, isPending: followPending, data: followerData } = useFollowerCreate();
  const { mutate: deleteFollower, isSuccess: deleteFollowerSuccess, isPending: unfollowPending } = useFollowerDelete(); // Hook for unfollow API
  let userId = tokenDecode();
  const userRequest: IUserFollowRequest = {
    id: id as number,
    followingId: 0
  };
  const { data: dataNotFollowing, isSuccess } = useGetNotFollowingByUser(id);
  const dataNotFollowings = dataNotFollowing?.data;

  const [followingUsers, setFollowingUsers] = useState<number[]>([]);

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

  const onClose = () =>{

  }
  return (
    <div>
      <div className='flex flex-wrap'>
        <div className='text-sm mr-[50px]'>Gợi ý cho bạn</div>
        <div className='text-sm ml-[100px]'><button>Xem thêm</button></div>
      </div>
      <section className="flex flex-col items-start justify-between">
        {isSuccess && dataNotFollowings?.map((userData: IUser) => (
          <div key={userData.id} className='flex w-full'>
            <div className='w-3/5'>
              <ProfileUser onClose={onClose} userData={userData} />
            </div>
            {
              userData?.id !== Number(userId) &&
              <div className='flex items-center w-2/5 '>
                {followingUsers.includes(userData?.id) ? (
                  // Nếu đang follow, hiển thị nút unfollow
                  unfollowPending ? (
                    <CircularProgress size={24} thickness={4} />
                  ) : (
                    <Button style={{ textTransform: 'none' }} size="small" onClick={() => handleFollowUser(userData.id)}>Bỏ theo dõi </Button>
                  )
                ) : (
                  // Nếu chưa follow, hiển thị nút follow
                  followPending ? (
                    <CircularProgress size={24} thickness={4} />
                  ) : (
                    <Button style={{ textTransform: 'none' }} size="small" onClick={() => handleFollowUser(userData.id)}>Theo dõi </Button>
                  )
                )}
              </div>
            }
          </div>
        ))}
      </section>
    </div>
  );
}

export default ListUserNotFollowing;
