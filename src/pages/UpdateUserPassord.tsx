import AuthComponent from '../components/AuthComponent'
import React, { useContext } from 'react';
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks';
import { DataProps } from '../utils/types';
import { store } from '../utils/store';

const UpdateUserPassword: FC = () => {

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

        // const response = await axiosRequest<CheckUserProps>({
        //     method: "post",
        //     url: LoginUrl,
        //     payload: { ...values, is_new_user: true }
        // })

        // if (response) {
        //     dispatch({
        //         type: ActionTypes.UPDATE_PASSWORD_USER_ID,
        //         payload: response.data.user_id
        //     })
        //     // history("/")
        // }
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

export default UpdateUserPassword