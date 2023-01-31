import React from 'react'
import AuthComponent from '../components/AuthComponent'
import { FC, useState } from 'react'
import { DataProps } from '../utils/types'
import { LoginUrl } from '../utils/network'
import { tokenName } from '../utils/data'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/hooks'
import { axiosRequest } from '../utils/functions'


interface LoginDataProps {
    access: string
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

        const response = await axiosRequest<LoginDataProps>({
            method: 'post',
            url: LoginUrl,
            payload: values,
            errorObject: {
                message: "Erro ao acessar"
            }
        })

        if (response) {
            localStorage.setItem(tokenName, response.data.access);
            history("/")
        }
        setLoading(false)
    }

    return <AuthComponent onSubmit={onSubmit} loading={loading} />
}

export default Login