// https://axios-http.com/ptbr/docs/intro

// Libs
import axios from 'axios'
import { toast } from 'sonner'
import Cookies from 'js-cookie'

// Essa é uma instância de axios personalizada para meu uso pessoal.
// Sua funcionalidade é compatível com as API's que desenvolvo.

// ====== EXEMPLO DE UTILIZAÇÃO ======
// import { APIInstance } from '?'
// const res = await APIInstance(navigate, false).get('?')

export const APIInstance = (navigate?: (path: string)=> void, success_toast = true)=> {

    const instance = axios.create({
        baseURL: 'https://hp-api.onrender.com',
        timeout: 10000,
    })

    instance.interceptors.response.use(
        response=> {

            success_toast && toast.success(`${response?.data?.message} (${response?.status})`, {id: 'server-success-feedback'})

            return response

        },
        error=> {

            if(error?.code === 'ECONNABORTED' && error?.message.includes('timeout')) {

                toast.error('Servidor indisponível.', {id: 'timeout'})

            }else if(error?.response?.status){

                if(error.response.status === 401){
                    navigate && navigate('/')
                    Cookies.remove('access')
                }

                toast.warning(`${error.response?.data?.message} (${error.response.status})`, {id: 'server-error-feedback'})

            }else{

                toast.error('Houve um erro.', {id: 'unknown-error'})

            }

            console.error(error)

            return Promise.reject(error)

        }
    )

    return instance
}
