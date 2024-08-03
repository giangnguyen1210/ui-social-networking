import { useMutation } from '@tanstack/react-query'

import { IFollowerRequest } from '../types/user.type'
import { FollowerService } from '../service/follower.service'

export function useFollowerCreate() {
	return useMutation({
		mutationKey: ['useFollowerCreate'],
		mutationFn: (_params: IFollowerRequest) => {
			return FollowerService.postFollow(_params)
		}
		
	})
}
export function useFollowerDelete() {
	return useMutation({
		mutationKey: ['useFollowerDelete'],
		mutationFn: (_params: IFollowerRequest) => {
			return FollowerService.postUnFollow(_params)
		}
	})
}
