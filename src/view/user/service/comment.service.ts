import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import { IAvatarRequest, ICheckFollowingRequest, ICommentRequest, IFollowerRequest, IGetUserRequest, ILikeRequest, IUserFollowRequest, IUserRequest } from '../types/user.type'
import { IBaseResponse } from '../../auth/types/common.type'
import { AxiosResponse } from 'axios'
export const CommentService: any = {
	
	createComment: async (_params: ICommentRequest) => {
		const response: AxiosResponse<IBaseResponse, any> = await httpClient.post(API_ROUTES.comment.createComment, {
			userId: _params.userId,
			postId: _params.postId,
            content: _params.content,
            parentId: _params.parentId
		})

		return response
	},
    deleteComment: async (_params: ICommentRequest) => {
		const response: any = await httpClient.post(API_ROUTES.comment.deleteComment, {
			id: _params.id
		})
		return response
	},
	updateComment: async (_params: ICommentRequest) => {
        const response: IBaseResponse = await httpClient.post(API_ROUTES.comment.updateComment,{
            id: _params.id,
            content: _params.content
        })
		return response
    },
    getCommentByPostId: async (postId: number) =>{
        const response: any = await httpClient.get(API_ROUTES.comment.getCommentByPostId(postId))
		return response
    },
    getCommentById: async (id: number) =>{
        const response: any = await httpClient.get(API_ROUTES.comment.getCommentById(id))
		return response
    },
    getRepliesByCommentId: async (commentId: number) =>{
        const response: any = await httpClient.get(API_ROUTES.comment.getRepliesByCommentId(commentId))
		return response
    }
   
}
