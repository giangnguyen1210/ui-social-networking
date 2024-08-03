export const commentApiRoute = {
	createComment: '/api/comments/create',
	deleteComment: '/api/comments/delete',
	updateComment: '/api/comments/update',
	getCommentByPostId: (postId: number)=> `/api/comments/get-by-post-id/${postId}`,
	getCommentById: (id: number)=> `/api/comments/get-by-id/${id}`,
	getRepliesByCommentId: (commentId: number)=> `/api/comments/replies/${commentId}`,
    // likeStatus: '/api/likes/status'
}
