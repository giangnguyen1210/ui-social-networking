import { userApiRoute } from './user'
import { postApiRoute } from './post'
import { authApiRoute } from './auth'
import { followerApiRoute } from './follower'
import { likeApiRoute } from './like'
import { commentApiRoute } from './comment'

export default Object.freeze({
	auth: authApiRoute,
	user: userApiRoute,
	follower: followerApiRoute,
	post: postApiRoute,
	like: likeApiRoute,
	comment: commentApiRoute
})
