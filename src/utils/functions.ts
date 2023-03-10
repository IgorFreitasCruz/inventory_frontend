import { notification } from "antd"
import axios, { AxiosResponse } from "axios"
import { tokenName } from "./data"
import { MeUrl } from "./network"
import { AuthTokenType, CustomAxiosError, DataProps, UserType } from "./types"

export const getAuthToken = (): AuthTokenType | null => {
    const accessToken = localStorage.getItem(tokenName)
    if (!accessToken) {
        return null
    }
    return { "Authorization": `Bearer ${accessToken}` }
}

export const logOut = () => {
    localStorage.removeItem(tokenName)
    window.location.href = "/login"
}

export const authHandler = async (): Promise<UserType | null> => {

    const response = await axiosRequest<UserType>({
        url: MeUrl,
        hasAuth: true,
        showError: false
    })

    if (response) {
        return response.data
    }

    return null
}

interface AxiosRequestProps {
    method?: 'get' | 'post' | 'patch' | 'delete',
    url: string,
    payload?: DataProps | FormData
    hasAuth?: boolean
    showError?: boolean
    errorObject?: {
        message: string,
        description?: string
    }
}

export const axiosRequest = async <T>({
    method = 'get',
    url,
    payload,
    hasAuth = false,
    errorObject,
    showError = true
}: AxiosRequestProps): Promise<AxiosResponse<T> | null> => {

    const headers = hasAuth ? getAuthToken() : {}

    const response = await axios({
        method,
        url,
        data: payload,
        headers: { ...headers }
    }).catch(
        (error: CustomAxiosError) => {
            if (!showError) return
            notification.error({
                message: errorObject ?
                    errorObject.message : "Operation Error",
                description: errorObject?.description ?
                    errorObject.description : error.response?.data.error
            })
        }
    ) as AxiosResponse<T>

    if (response) {
        return response
    }

    return null
}