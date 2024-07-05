import {create} from 'zustand'

type AuthType = {
    id: string
    username: string
    firstName: string
    lastName: string
}

interface AuthState {
    auth?: AuthType
    authLoaded: boolean,
    setAuth: (auth?: AuthType) => void,

}

export const useAuthState = create<AuthState>((set) => ({
    auth: undefined,
    authLoaded: false,
    setAuth: (auth) => set((state) => ({
        ...state,
        auth: auth,
        authLoaded: true
    }))

}))
