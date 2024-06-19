import { authApiRoute } from '@/common/config/appRoutes/auth'
import { userApiRoute } from './user'

export default Object.freeze({
	auth: authApiRoute,
	user: userApiRoute,
})
