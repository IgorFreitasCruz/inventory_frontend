import { AxiosError } from 'axios'

export interface DataProps {
    [key: string]: string | boolean | number
}

export interface CustomAxiosError extends Omit<AxiosError, 'response'> {
    response?: {
        data: {
            error: string
        }
    }
}

export interface AuthTokenType {
    Authorization: string
}

export interface UserType {
    email: string
    fullname: string
    id: string
    created_at: string
    role: string
    last_login: string
}

export interface AuthProps {
    errorCallback?: () => void
    successCallback?: () => void
}

export interface StoreProps {
    user: UserType | null
    updatePasswordUserId: number | null
}

export enum ActionTypes {
    UPDATE_USER_INFO = "[action] update user info",
    UPDATE_PASSWORD_USER_ID = "[action] update user password"
}

export type ActionProps = {
    type: ActionTypes.UPDATE_USER_INFO
    payload: UserType | null
} | {
    type: ActionTypes.UPDATE_PASSWORD_USER_ID
    payload: number | null
}

export interface StoreProviderProps {
    state: StoreProps
    dispatch: (arg: ActionProps) => void
}