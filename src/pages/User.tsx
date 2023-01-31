import AddUserForm from '../components/AddUserForm'
import React, { useEffect, useState } from "react"
import { Table } from "antd"
import { FC } from "react"
import { axiosRequest } from "../utils/functions"
import { UsersUrl } from "../utils/network"

interface UserProps {
    id: number
    key?: number
    created_at: string
    email: string
    fullname: string
    is_active: string
    last_login: string
    role: string
}

const User: FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFetchingTableData, setIsFetchingTableData] = useState(true)
    const [users, setUsers] = useState<UserProps[]>()



    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Nome',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Ativo',
            dataIndex: 'is_active',
            key: 'is_active',
        },
        {
            title: 'Último acesso',
            dataIndex: 'last_login',
            key: 'last_login',
        },
        {
            title: 'Cargo',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Data criação',
            dataIndex: 'created_at',
            key: 'created_at',
        },
    ];

    const getUsers = async () => {

        const response = await axiosRequest<UserProps[]>({
            url: UsersUrl,
            hasAuth: true,
            showError: false
        })

        setIsFetchingTableData(false)

        if (response) {
            const data = response.data.map(item => ({
                ...item,
                key: item.id,
                is_active: item.is_active.toString() ? "Sim" : "Não"
            }))
            setUsers(data)
            setIsFetchingTableData(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const onCreateUser = () => {
        setIsModalOpen(false)
        setIsFetchingTableData(true)
        getUsers()
    }

    return (
        <>
            <div className="card">
                <div className="cardHeader">
                    <h1 className="headerContent">Lista de usuários</h1>
                    <div className="rightContent">
                        <div className="searchInput">
                            <input type="text" />
                        </div>
                        <button onClick={() => setIsModalOpen(true)}>
                            Cadastrar novo usuário
                        </button>
                    </div>
                </div>
                <br />
                <Table
                    dataSource={users}
                    columns={columns}
                    loading={isFetchingTableData} />
            </div>
            <AddUserForm
                onSuccessCallBack={onCreateUser}
                modalState={isModalOpen}
                handleCancel={() => setIsModalOpen(false)}
            />
        </>
    )
}

export default User