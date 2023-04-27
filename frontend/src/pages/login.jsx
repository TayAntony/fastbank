import Botao from '../components/botaoLogin'
import BotaoGoogle from '../components/botaoGoogle'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Input from '../components/input'

function Login() {
    let navigate = useNavigate()
  
  
    const goCadastro = () => {
      navigate("/cadastrar");
    }

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const logar = () => {
        localStorage.setItem("dados", JSON.stringify({ login: email, senha: senha }))
        
        if (email == "tay" && senha == "123") {
            navigate("/homepage")
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'E-mail ou senha incorretos',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#D51317',
              })
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
            <h1 className="font-poppins text-8xl font-bold">ToDo</h1>
            <p className='font-michroma font-normal text-2xl '>Onde você faz acontecer!</p>
                <div className='flex flex-col p-6 items-center border-solid backdrop-blur-md border-2 border-white rounded-xl m-10 box-border text-center gap-8 justify-center py-14'>
                <p className='paragrafos max-w-xs text-justify'>Insira suas informações para realizar o login!</p>
                    <Input placeholder='E-mail' tipo='text' onChange={(e) => setEmail(e.target.value)}/>
                    <div className='flex items-end flex-col'>
                    <Input  placeholder='Senha' tipo='password' onChange={(e) => setSenha(e.target.value)}/>
                    <div className='flex items-end flex-col'/>

                        <a href="javascript:void(0)" className='esqueciSenha' onClick={esqueciSenha} >Esqueci a senha</a>
                    </div>


                    <Botao onClick={logar} texto='Logar' />


                    <BotaoGoogle onClick={logandoGoogle} texto='Entrar com Google' />
            
            <div className=''>
                <p className='opacity-80 flex text-red'>Não possui uma conta? </p>
                <a href="javascript:void(0)" onClick={goCadastro} className="text-red-600 font-semibold">Cadastre-se</a>
            </div>

            
                </div>

            </div>

        </>
    );
}

export default Login;