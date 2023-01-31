import AuthComponent from '../components/AuthComponent'
import React, { useContext, useEffect } from 'react';
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks';
import { ActionTypes, DataProps } from '../utils/types';
import { store } from '../utils/store';
import { axiosRequest } from '../utils/functions';
import { UpdatePasswordUrl } from '../utils/network';
import { notification } from 'antd';

const UpdateUserPassword: FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const { state: { updatePasswordUserId }, dispatch } = useContext(store)

    const history = useNavigate()

    useEffect(() => {
        if (!updatePasswordUserId) {
            history("/")
        }
    }, [])

    useAuth({
        successCallback: () => {
            history("/")
        }
    })

    const onSubmit = async (values: DataProps) => {
        if (values["password"] !== values["password_confirm"]) {
            notification.error({
                message: "Senha inválida",
                description: "Utilize a mesma senha para confirmar"
            })
            return
        }
        setLoading(true)
        const response = await axiosRequest({
            method: "post",
            url: UpdatePasswordUrl,
            payload: { ...values, user_id: updatePasswordUserId }
        })

        if (response) {
            dispatch({
                type: ActionTypes.UPDATE_PASSWORD_USER_ID,
                payload: null
            })
            notification.success({
                message: "Operação realizada com sucesso",
                description: "Sua senha foi atualizada"
            })
            history("/login ")
        }
        setLoading(false)
    }
    return <AuthComponent
        titleText="Criar senha"
        buttonText="Atualizar"
        linkText="Voltar"
        linkPath="/check-user"
        isUpdatePassword={true}
        loading={loading}
        onSubmit={onSubmit}
    />
}

export default UpdateUserPassword