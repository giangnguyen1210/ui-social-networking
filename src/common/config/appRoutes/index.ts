import { userApiRoute } from './user'
import { postApiRoute } from './post'
import { authApiRoute } from './auth'
import { followerApiRoute } from './follower'

export default Object.freeze({
	auth: authApiRoute,
	user: userApiRoute,
	follower: followerApiRoute,
	post: postApiRoute,
})
