import { IAvatar } from './../templates/home-template/types/user.type';
import create from 'zustand';
import { AxiosError } from 'axios';
import { IUserFollowRequest } from '@/view/user/types/user.type';
import { FollowerService } from '@/view/user/service/follower.service';
import { UserService } from '@/view/user/service/user.service';

interface AvatarState {
    avatar: any;
    loading: boolean;
    error: string | null;
    getAvatar: (_id: number) => void;
}

const userAvatarStore = create<AvatarState>((set) => ({
    avatar: '',
    loading: false,
    error: null,
    getAvatar:  (_id: number) => {
        set({ loading: true, error: null });
        UserService.getAvatar(_id)
            .then((response: any) => {
                set({ avatar: response.data, loading: false });
            })
            .catch((error: AxiosError) => {
                set({ error: error.message, loading: false });
            });
    },
}));

export default userAvatarStore;
