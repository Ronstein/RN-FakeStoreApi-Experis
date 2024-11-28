import { create } from "zustand";

import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { StorageAdapter } from '../../../config/adapters/storage-adapter';
import { authCheckStatus, authLogin } from "../../../actions/auth/auth";

export interface AuthState {
    status: AuthStatus;
    token?: string;

    login: (username: string, password: string) => Promise<boolean>;
    checkStatus: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,
    login: async (username: string, password: string) => {
        const resp = await authLogin(username, password);
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined });
            return false;
        }
        //todo: salvar token en el storage
        //console.log({ resp });
        await StorageAdapter.setItem('token', resp.token);
        // const storedToken = await StorageAdapter.getItem('token');
        // console.log({ storedToken });


        set({ status: 'authenticated', token: resp.token });

        return true;
    },
    checkStatus: async (token: string) => {
        const resp = await authCheckStatus(token);
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, });
            return
        }
        await StorageAdapter.setItem('token', token);
        set({ status: 'authenticated', token: token });
    },
    logout: async () => {
        await StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', token: undefined });
    },

}))