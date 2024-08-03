import create from 'zustand';
import { AxiosError } from 'axios';
import { IUserFollowRequest } from '@/view/user/types/user.type';
import { FollowerService } from '@/view/user/service/follower.service';

interface FollowerState {
    followers: any[];
    following: any[];
    notFollowing: any[];
    loading: boolean;
    error: string | null;
    getFollowers: (_id: number) => void;
    getFollowing: (_id: number) => void;
    getNotFollowing: (_id: number) => void;
}

const useFollowerStore = create<FollowerState>((set) => ({
    followers: [],
    following: [],
    notFollowing: [],
    loading: false,
    error: null,
    getFollowers: (_id: number) => {
        set({ loading: true, error: null });
        FollowerService.getFollower(_id)
            .then((response: any) => {
                set({ followers: response.data, loading: false });
            })
            .catch((error: AxiosError) => {
                set({ error: error.message, loading: false });
            });
    },
    getFollowing: (_id: number) => {
        set({ loading: true, error: null });
        FollowerService.getFollowing(_id)
            .then((response: any) => {
                set({ following: response.data, loading: false });
            })
            .catch((error: AxiosError) => {
                set({ error: error.message, loading: false });
            });
    },
    getNotFollowing: (_id: number) => {
        set({ loading: true, error: null });
        FollowerService.getNotFollowing(_id)
            .then((response: any) => {
                set({ notFollowing: response.data, loading: false });
            })
            .catch((error: AxiosError) => {
                set({ error: error.message, loading: false });
            });
    },
}));

export default useFollowerStore;
