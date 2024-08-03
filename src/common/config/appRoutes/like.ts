export const likeApiRoute = {
	createLike: '/api/likes/create',
	unLike: '/api/likes/remove',
	getLikeByPostId: (_id: number)=> `/api/likes/get-by-post-id/${_id}`,
    likeStatus: (userId: number, postId: number)=> `/api/likes/status/${userId}/${postId}`
    // likeStatus: '/api/likes/status'
}
