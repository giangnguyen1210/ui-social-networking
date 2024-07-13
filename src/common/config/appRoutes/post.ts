export const postApiRoute = {
	createPost: '/api/posts/create',
	getPostsByUserId:(_id: number) => `/api/posts/get-posts-by-user-id/${_id}`,
	getPostsById:(_id: number) => `/api/posts/get/${_id}`
}
