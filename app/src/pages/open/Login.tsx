// MUI
import { Stack, Button } from '@mui/material'
// Components
import { CustomTextField } from '../../components/widgets/CustomTextField'
import { PageCard } from '../../components/containers/PageCard'
// Libs
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
// React
import { useContext } from 'react'
import { AppContext } from '../../App'
// Scripts
import { cpf, string_required } from '../../scripts/zodModules'

export const Login = () => {
    const { setLoading } = useContext(AppContext)!

    const navigate = useNavigate()

    // Schema de validação
    const validation = z.object({
        cpf: cpf,
        password: string_required
    })

    const { handleSubmit, control } = useForm<z.infer<typeof validation>>({
        resolver: zodResolver(validation),
        defaultValues: {
            cpf: '',
            password: ''
        }
    })

    // onSubmit
    const login = async (/*data: Inputs*/) => {
        setLoading({ render: true, text: 'Entrando' })
        setTimeout(() => {
            setLoading({ render: false })
            Cookies.set('access', 'access')
            navigate('/entity')
        }, 1500)
    }

    return (
        <PageCard
            max_width={280}
            title={'Login'}
            caption={'Seja bem vindo!'}
            link={{ text: 'Ainda não é cadastrado?', path: '/register', label: 'Cadastre-se!' }}>
            <form onSubmit={handleSubmit((/*data*/) => login())}>
                <Stack spacing={2}>
                    <CustomTextField
                        control={control}
                        name={'cpf'}
                        label={'CPF'}
                        placeholder={'Digite o CPF'}
                        mask_props={{ mask: '000.000.000-00' }}
                    />

                    <CustomTextField
                        control={control}
                        name={'password'}
                        label={'Senha'}
                        placeholder={'Digite a senha'}
                        password={true}
                    />

                    <Button type={'submit'}>Login</Button>
                </Stack>
            </form>
        </PageCard>
    )
}
