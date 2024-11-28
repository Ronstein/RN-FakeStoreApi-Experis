import { fakeStoreApi } from "../../config/api/FakeStoreApi";
import { AuthResponse } from "../../infrastructure";


const returnToken = (data: AuthResponse) => {
    return {
        token: data.token
    }
}

export const authLogin = async (username: string, password: string) => {
    username = username.toLowerCase();
    try {
        const { data } = await fakeStoreApi.post<AuthResponse>('/auth/login', {
            username,
            password,
        });
        return returnToken(data);

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const authCheckStatus = async (token: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulamos una respuesta del servidor
            if (token && token.startsWith("ey")) {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 1000);
    });
};