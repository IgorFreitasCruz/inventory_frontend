import AuthComponent from '../components/AuthComponent'
import React, { useContext } from 'react';
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosRequest } from '../utils/functions';
import { useAuth } from '../utils/hooks';
import { LoginUrl } from '../utils/network';
import { ActionTypes, DataProps } from '../utils/types';
import { store } from '../utils/store';


interface CheckUserProps {
    user_id: number
}

const CheckUser: FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const { dispatch } = useContext(store)

    const history = useNavigate()

    useAuth({
        successCallback: () => {
            history("/")
        }
    })

    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        const response = await axiosRequest<CheckUserProps>({
            method: "post",
            url: LoginUrl,
            payload: { ...values, is_new_user: true }
        })

        if (response) {
            dispatch({
                type: ActionTypes.UPDATE_PASSWORD_USER_ID,
                payload: response.data.user_id
            })
            history("/create-password")
        }
        setLoading(false)
    }
    return <AuthComponent
        titleText="Verifique sua conta"
        isPassword={false}
        buttonText="Enviar"
        linkText="Voltar"
        linkPath="/login"
        onSubmit={onSubmit}
        loading={loading}
    />
}

export default CheckUser