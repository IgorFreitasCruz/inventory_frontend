import { FC } from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { DataProps } from '../utils/types'

interface AuthComponentProps {
    titleText?: string
    isPassword?: boolean
    buttonText?: string
    linkText?: string
    linkPath?: string
    onSubmit: (values: DataProps) => void
    loading?: boolean
}

const AuthComponent: FC<AuthComponentProps> = ({
    titleText = "Acessar",
    isPassword = true,
    buttonText = "Acessar",
    linkText = "Novo usuário?",
    linkPath = "/check-user",
    onSubmit,
    loading = false,
}) => {
    return (
        <div className='login'>
            <div className="inner">
                <div className="header">
                    <h3>{titleText}</h3>
                    <h2>MyShop</h2>
                </div>

                <Form layout="vertical" autoComplete='off' onFinish={onSubmit}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Por favor, insira seu email." }]}
                    >
                        <Input placeholder="email@email.com" type='email' />
                    </Form.Item>
                    {isPassword && <Form.Item
                        label="Senha"
                        name="password"
                        rules={[{ required: true, message: "Por favor, insira sua senha." }]}>
                        <Input placeholder="********" type='password' />

                    </Form.Item>}
                    <Form.Item>
                        <Button htmlType='submit' type="primary" block loading={loading}>{buttonText}</Button>
                    </Form.Item>
                </Form>
                <Link className='linkTo' to={linkPath}>{linkText}</Link>
            </div>
        </div>)
}

export default AuthComponent