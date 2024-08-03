export interface IProfile {
    username: string
    name: string
}

export interface IAvatar {
    width: number
    height: number
    userId?: number
    avatarData?: string | null
}
