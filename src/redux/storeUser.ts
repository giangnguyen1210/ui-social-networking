import create from 'zustand';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface StoreState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => void;
}

const useStore = create<StoreState>((set) => ({
  users: [],
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      set({ users: response.data, loading: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unexpected error occurred', loading: false });
      }
    }
  },
}));

export default useStore;
