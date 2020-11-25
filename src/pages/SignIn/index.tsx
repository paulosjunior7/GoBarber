import React , { useRef, useCallback }from 'react';
import { FiLogIn , FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Backgroud } from './styles'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationsErrors from '../../utils/getValidationsErros';

import barber from '../../assets/barber.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';

interface SignInFormData {
    email: string;
    password: string;
  }

const Login = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: Object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um E-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            })

            await schema.validate(data, {
                abortEarly: false
            });

        } catch (err) {

            const errors = getValidationsErrors(err);
            console.log(errors);
            formRef.current?.setErrors(errors);
        }
    }, [])

    return (
        <Container>
            <Content>
                <img src={barber} alt="Barber" />
                
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>

                </Form>
                <a href="signup">
                    <FiLogIn />
                    criar conta
                </a>
            </Content>
            <Backgroud />
        </Container>
    )
}

export default Login;