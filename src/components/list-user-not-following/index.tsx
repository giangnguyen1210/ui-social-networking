// import React, { useEffect } from 'react';
// import { IFollowerRequest, IUser, IUserFollowRequest } from '@/view/user/types/user.type';
// import { useGetNotFollowingByUser } from '@/view/user/hooks/useGetFollow';
// import ProfileUser from '../profile-user';
// import Cookies from 'js-cookie'
// import useFollowerCreate from '@/view/user/hooks/useFollowerCreate';
// import { jwtDecode } from 'jwt-decode';
// import { Button } from '@mui/material';

// function ListUserNotFollowing({ userData }: { userData: IUser }) {
//   const id = userData?.id as number;
//   const token = Cookies.get('token');
//   const { mutate: createFollower, isSuccess: createFollowerSuccess, isPending, data: followerData } = useFollowerCreate();
//   let userId = '';
//   if (token) {
//     const decoded = jwtDecode(token);
//     userId = decoded.jti as string;
//   }
//   const userRequest: IUserFollowRequest = {
//     id: id as number,
//     followingId: 0
//   };
//   const { data: dataNotFollowing, isSuccess, refetch: refetchNotFollowing } = useGetNotFollowingByUser(userRequest);
//   const dataNotFollowings = dataNotFollowing?.data;
  
//   const handleFollowUser = (_id: number) => {
//     const followerRequest: IFollowerRequest = {
//       followerId: Number(userId),
//       followingId: _id
//     };
//     createFollower(followerRequest);
//   };

//   useEffect(() => {
//     if (createFollowerSuccess) {
//       refetchNotFollowing(); // Gọi lại hàm lấy dữ liệu notFollowing khi createFollower thành công
//     }
//   }, [createFollowerSuccess, refetchNotFollowing]);

//   return (
//     <div>
//       <div className='flex flex-wrap'>
//         <div className='text-sm mr-[50px]'>Gợi ý cho bạn</div>
//         <div className='text-sm ml-[100px]'><button>Xem thêm</button></div>
//       </div>
//       <section className="flex flex-col items-start justify-between">
//         {isSuccess && dataNotFollowings?.map((userData: IUser) => (
//           <div key={userData.id} className='flex w-full'>
//             <ProfileUser userData={userData} />
//             {
//               userData?.id !== Number(userId) &&
//               userData?.following === false &&
//               <div className='flex items-center w-2/5 '>
//                 <Button style={{ textTransform: 'none' }} size="small" onClick={() => handleFollowUser(userData?.id)}>Theo dõi </Button>
//               </div>
//             }
//           </div>

//         ))}
//       </section>
//     </div>
//   );
// }

// export default ListUserNotFollowing;
import React, { useState } from 'react';
import { IFollowerRequest, IUser, IUserFollowRequest } from '@/view/user/types/user.type';
import { useGetNotFollowingByUser } from '@/view/user/hooks/useGetFollow';
import ProfileUser from '../profile-user';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { Button, CircularProgress } from '@mui/material'; // Import CircularProgress for loading indicator
import { useFollowerCreate, useFollowerDelete } from '@/view/user/hooks/useFollower';

function ListUserNotFollowing({ userData }: { userData: IUser }) {
  const id = userData?.id as number;
  const token = Cookies.get('token');
  const { mutate: createFollower, isSuccess: createFollowerSuccess, isPending: followPending, data: followerData } = useFollowerCreate();
  const { mutate: deleteFollower, isSuccess: deleteFollowerSuccess, isPending: unfollowPending } = useFollowerDelete(); // Hook for unfollow API
  let userId = '';
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.jti as string;
  }
  const userRequest: IUserFollowRequest = {
    id: id as number,
    followingId: 0
  };
  const { data: dataNotFollowing, isSuccess } = useGetNotFollowingByUser(userRequest);
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

  return (
    <div>
      <div className='flex flex-wrap'>
        <div className='text-sm mr-[50px]'>Gợi ý cho bạn</div>
        <div className='text-sm ml-[100px]'><button>Xem thêm</button></div>
      </div>
      <section className="flex flex-col items-start justify-between">
        {isSuccess && dataNotFollowings?.map((userData: IUser) => (
          <div key={userData.id} className='flex w-full'>
            <ProfileUser userData={userData} />
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
