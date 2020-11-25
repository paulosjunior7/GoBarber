import React, { useCallback , useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web'
import getValidationsErrors from '../../utils/getValidationsErros';

import { Container, Content, Backgroud } from './styles'
import * as Yup from 'yup';

import barber from '../../assets/barber.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: Object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um E-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
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
            <Backgroud />
            <Content>
                <img src={barber} alt="Barber" />

                <Form  ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome" />

                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <a href="/">
                    <FiArrowLeft />
                    Voltar para logon
                </a>
            </Content>
        </Container>
    )
}

export default SignUp;