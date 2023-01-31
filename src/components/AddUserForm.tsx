import { Button, Form, Input, Modal, Select } from "antd";
import { FC, useState } from "react";
import { axiosRequest} from "../utils/functions";
import { CreateUserUrl } from "../utils/network";
import { DataProps } from "../utils/types";

const { Option } = Select

interface AddUserFormProps {
    modalState?: boolean,
    onSuccessCallBack: () => void,
    handleCancel: () => void,
}

const AddUserForm: FC<AddUserFormProps> = ({
    modalState = false,
    onSuccessCallBack,
    handleCancel,
}) => {

    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        const response = await axiosRequest({ 
            method: "post",
            url: CreateUserUrl,
            payload: values, 
            hasAuth: true,
            errorObject: {
                message: "Operação realizada com sucesso!",
                description: "O usuário foi adicionado."
            }
        })

        setLoading(false)

        if (response) {
            onSuccessCallBack()
            form.resetFields()
        }
    }

    return (
        <Modal
            title="Criar novo usuário"
            open={modalState}
            onCancel={handleCancel}
            footer={false}
        >
            <Form layout="vertical" autoComplete='off' onFinish={onSubmit} form={form}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Por favor, insira seu email." }]}
                >
                    <Input placeholder="email@email.com" type='email' />
                </Form.Item>
                <Form.Item
                    label="Nome"
                    name="fullname"
                    rules={[{ required: true, message: "Por favor, insira seu nome." }]}
                >
                    <Input placeholder="Nome" type='text' />
                </Form.Item>
                <Form.Item
                    label="Cargo"
                    name="role"
                    rules={[{ required: true, message: "Por favor, selecione um cargo." }]}
                >
                    <Select placeholder="Selecione">
                        <Option value="admin">Administrador</Option>
                        <Option value="creator">Creator</Option>
                        <Option value="sales">Vendedor</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type="primary" block loading={loading}>Criar</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddUserForm;