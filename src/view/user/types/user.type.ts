// GET ALL USER
export interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    createdAt: string
    updatedAt: string
    genderId: string
    avatarData: IAvatar
    following: boolean
}

interface IAvatar {
    createdAt: string
    dataFile: string
    userId: string
}

export interface IUserRequest {
    id: number
}

export interface IAvatarRequest {
    id: number
}
export interface IGetUserRequest {
    username: string
}

export interface IUserFollowRequest {
    id: number
    followingId: number
}

export interface ICheckFollowingRequest {
    userId: number
    followingId: number
}

export interface IFollowerRequest{
    followerId: number
    followingId: number
}