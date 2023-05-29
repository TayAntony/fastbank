import Botao from '../components/botaoLogin'
import BotaoGoogle from '../components/botaoGoogle'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Input from '../components/input'
import axios from 'axios'

export const ip = "http://127.0.0.1:8000"
// http://127.0.0.1:8000/
// https://todobank.azurewebsites.net

function Login() {
    let navigate = useNavigate()

    const goCadastro = () => {
        navigate("/cadastrar");
    }

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const logar = async (evt) => {
        console.log("clicou")
        evt.preventDefault()
        const infoDoLogin = {email: email, password: senha}
        try{
            console.log("try")
            const res = await axios.post(`${ip}/auth/token/login/`, infoDoLogin) //endpoint para verificar se o login está correto e gerar o token
            console.log("fez requisição")
            localStorage.setItem('token', res.data.auth_token)
            navigate("/homepage")
        } catch(err){
            console.log(err)
            if(err.response.status == 401){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'E-mail ou senha incorretos',
                    confirmButtonText: 'Tentar novamente',
                    confirmButtonColor: '#D51317',
                });
            }
            
            else{
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: `Não foi possível logar, erro: ${err.response.status}`,
                    confirmButtonText: 'Tentar novamente mais tarde',
                    confirmButtonColor: '#D51317',
                });
            }
        }
    }

    const esqueciSenha = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Que pena né?',
            text: 'Infelizmente você se *****',
            confirmButtonText: 'OK 😢',
            confirmButtonColor: '#FEB800',
        })
    }

    const logandoGoogle = () => {
        let timerInterval
        Swal.fire({
            title: 'Redirecionando...',
            html: 'Você será redirecionado para realizar o login',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    }

    return (
        <>
            <div className="imgBackground">
            <div className='xs:absolute xs:top-0 xs:left-0 m-36 hidden'>
                <h1 className="text-6xl font-poppins xs:text-8xl font-bold ">ToDo</h1>
                <p className='text-lg font-michroma xs:font-normal xs:text-2xl'>Onde você faz acontecer!</p>
                
            </div>

                    <form onSubmit={logar} className='flex flex-col p-6 items-center border-solid backdrop-filter backdrop-blur-lg border-2 border-white rounded-xl m-10 box-border text-center gap-8 justify-center py-14 xs:absolute xs:top-[5vh] xs:right-[20vw]'>
                    <p className='paragrafos max-w-xs text-justify'>Insira suas informações para realizar o login!</p>

                        <Input placeholder='E-mail' tipo='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div className='flex items-end flex-col'>
                            <Input placeholder='Senha' tipo='password' value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <div className='flex items-end flex-col' />
                            <a href="javascript:void(0)" className='esqueciSenha' onClick={esqueciSenha} >Esqueci a senha</a>
                        </div>
                        <Botao texto='Logar' />
                        <BotaoGoogle onClick={logandoGoogle} texto='Entrar com Google' />

                        <div>
                            <p className='opacity-80 flex text-red'>Não possui uma conta? </p>
                            <a href="javascript:void(0)" onClick={goCadastro} className="text-red-600 font-semibold">Cadastre-se</a>
                        </div>
                    </form>
            </div>

        </>
    );
}

export default Login;
