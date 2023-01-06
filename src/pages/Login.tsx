import { FC, useState } from 'react'
import AuthComponent from '../components/AuthComponent'
import { CustomAxiosError, DataProps } from '../utils/types'
import axios from 'axios'
import { LoginUrl } from '../utils/network'
import { notification } from 'antd'
import { tokenName } from '../utils/data'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/hooks'


interface LoginDataProps {
    data: {
        access: string
    }
}

const Login: FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const history = useNavigate()

    useAuth({
        successCallback: () => {
            history("/")
        }
    })

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        const response: LoginDataProps = await axios.post(LoginUrl, { ...values }).catch(
            (e: CustomAxiosError) => {
                notification.error({
                    message: "Ocorreu um erro!",
                    description: e.response?.data.error
                })
            }
        ) as LoginDataProps
        if (response) {
            localStorage.setItem(tokenName, response.data.access);
            history("/")
        }
        setLoading(false)
    }

    return <AuthComponent onSubmit={onSubmit} loading={loading} />
}

export default Login