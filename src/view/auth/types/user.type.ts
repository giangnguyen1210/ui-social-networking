// GET ALL USER
export interface IGetAllUserRequest {
    pageNumber: number,
    maxPageSize: number,
    pageSize: number
}

export interface User {
    id: string,
    fullName: string,
    phoneNumber: string,
    userName: string,
    email: string,
    createdDate: string
}

export interface IGetAllUserResponse {
    users: User[]
}
