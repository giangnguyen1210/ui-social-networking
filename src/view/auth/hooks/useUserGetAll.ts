import { useQuery } from '@tanstack/react-query'

import { UserService } from '../services/user.service'

export default function useUserGetAll() {
	return useQuery({
		queryKey: ['useUserGetAll'],
		queryFn: () => {
			return UserService.getAllUser()
		},
		// onSuccess: (res: IHttpResponseDto<IGetAllUserResponse>) => {
		// 	if (res.statusCode === 200) {
		// 		toast.success('Registration successful!')
		// 	}
		// 	if (res.statusCode !== 200) {
		// 		toast.error(res.message)
		// 	}
		// },
	})
}
