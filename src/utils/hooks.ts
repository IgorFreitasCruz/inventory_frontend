import { useContext, useEffect } from "react"
import { authHandler } from "./functions"
import { store } from "./store"
import { ActionTypes, AuthProps, UserType } from "./types"

export const useAuth = async ({ errorCallback, successCallback }: AuthProps) => {

    const { dispatch } = useContext(store)

    useEffect(() => {
        const checkUser = async () => {
            const user: UserType | null = await authHandler()
            if (!user) {
                if (errorCallback) {
                    errorCallback()
                }
                return
            }
            if (successCallback) {
                dispatch({ type: ActionTypes.UPDATE_USER_INFO, payload: user })
                successCallback()
            }
        }
        checkUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}