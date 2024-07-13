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
export interface ILikeRequest{
    // id: number;
    userId: number;
    postId: number;
}

export interface IStatusLikeResponse{
    isLiked: boolean;
}
export interface ICommentRequest{
    // private Long id;
    // private Long postId;
    // private Long userId;
    // private Long parentId; // Field mới để lưu trữ ID của comment gốc (nếu có)
    // private String content;
    id: number | null;
    userId: number;
    postId: number;
    content: string;
    parentId: number | null;
}