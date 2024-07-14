export const followerApiRoute = {
	getUsersFollower: (_id: number, keyword: string) =>`/api/users/get-users-follower/${_id}?keyword=${keyword}`,
	getUsersFollowing:(_id: number, keyword: string) =>`/api/users/get-users-following/${_id}?keyword=${keyword}`,
	getUsersNotFollowing: (_id: number)=>`/api/users/get-users-not-following/${_id}`,
	checkIsFollowing: (_id: number, _followingId: number) => `/api/users/check-is-following/${_id}/${_followingId}`,
	postFollowUser: '/api/followers/create',
	postUnFollowUser: '/api/followers/unfollow'
	// getAvatarImage: (_id: number)=> `/api/photo/avatar/1719146746296-file_3.png`,
}
