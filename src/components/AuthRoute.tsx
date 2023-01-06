import { FC, PropsWithChildren, useState } from 'react'
import { logOut } from '../utils/functions'
import { useAuth } from '../utils/hooks'

const AuthRoute: FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState(true)

    useAuth({
        errorCallback: () => {
            logOut()
        },
        successCallback: () => {
            setLoading(false)
        }
    })

    if (loading) {
        return <i>loading...</i>
    }

    return <>{children}</>

}

export default AuthRoute