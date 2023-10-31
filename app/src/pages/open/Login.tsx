// MUI
import { Stack, Button } from "@mui/material"
// Components
import { CustomTextField } from '../../components/widgets/CustomTextField'
import { PageCard } from '../../components/containers/PageCard'
// Libs
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { object } from 'yup'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
// React
import { useContext } from 'react'
import { AppContext } from '../../App'
// Scripts
import { cpf, string_required } from '../../scripts/yupModules'

export const Login = ()=> {

    const { setLoading } = useContext(AppContext)!

    const navigate = useNavigate()

    // Schema de validação
    const validacao_login = object({
        cpf: cpf,
        password: string_required
    })

    // Hook form
    type Inputs = {
        cpf: string,
        password: string
    }

    const { handleSubmit, control } = useForm<Inputs>({
        resolver: yupResolver(validacao_login),
        defaultValues: {
          'cpf': '',
          'password': ''
        }
      })

    // onSubmit
    const login = async(/*data: Inputs*/)=> {
        setLoading({render: true, text: 'Logging in'})
        setTimeout(()=>{
            setLoading({render: false})
            Cookies.set('access', 'access')
            navigate('/entity')
        },1500)
    }

    return (

        <PageCard
            max_width={280}
            title={'Login'}
            caption={'Welcome!'}
            link={{text: "Don't have an account?", path: '/register', label: 'Register now!'}}>

            <Stack spacing={2}>

                <CustomTextField
                    control={control}
                    name={'cpf'}
                    label={'CPF'}
                    placeholder={'Type the CPF'}
                    mask_props={{mask:'000.000.000-00'}}/>

                <CustomTextField
                    control={control}
                    name={'password'}
                    label={'Password'}
                    placeholder={'Type the password'}
                    password={true}/>

                <Button
                    type={'submit'}
                    onClick={handleSubmit((/*data*/)=>login())}>
                        Login
                </Button>

            </Stack>

        </PageCard>

    )
}
