import {create} from 'zustand'

type AuthType = {
    id: string
    username: string
    avatar: string
    displayName: string
    email: string
    firstName: string
    lastName: string
}

interface AuthState {
    auth?: AuthType
    authLoaded: boolean,
    setAuth: (auth?: AuthType) => void,
    logout: () => void,

}

export const useAuthState = create<AuthState>((set) => ({
    auth: undefined,
    authLoaded: false,
    setAuth: (auth) => set((state) => ({
        ...state,
        auth: auth,
        authLoaded: true
    })),

    logout: () => set((state) => {
        localStorage.removeItem("token")
        return ({
            ...state,
            auth: undefined,
            authLoaded: true
        })
    })

}))
