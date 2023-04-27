import Botao from '../components/botaoLogin'
import BotaoGoogle from '../components/botaoGoogle'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Input from '../components/input'

function Cadastrar() {

    let navigate = useNavigate();
    const goHomepage = () => {
        navigate("/homepage")}

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const goLogin = () => {
        navigate("/login");
      }
    const cadastrar = () => {
        // localStorage.setItem()
        if (nome != "" && email != "" && senha != "") {
            navigate("/homepage")
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuário já cadastrado',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#D51317',
              })
        }
        
    }


    const cadastrandoGoogle = ()=> {
        let timerInterval
        Swal.fire({
        title: 'Redirecionando...',
        html: 'Você será redirecionado para realizar o cadastro',
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
  
    return(
        <div className="imgBackground">
            <h1 className="font-poppins text-8xl font-bold">ToDo</h1>
            <p className='font-michroma font-normal text-2xl '>Onde você faz acontecer!</p>
            <div className='flex flex-col p-6 items-center border-solid backdrop-blur-md border-2 border-white rounded-xl m-10 box-border text-center gap-8 justify-center py-14'>
                <p className='paragrafos max-w-xs text-justify'>Preencha com as suas informações para realizar o cadastro!</p>
                    
                <div className='flex items-end flex-col gap-4'>
                    <Input placeholder='E-mail' tipo='text' onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder='Nome completo' tipo='text' onChange={(e) => setNome(e.target.value)}/>
                    <div className='flex items-end flex-col'>
                    <Input  placeholder='Senha' tipo='password' onChange={(e) => setSenha(e.target.value)}/>
                    </div>
                </div>

                    <Botao onClick={cadastrar} texto='Cadastrar' />


                    <BotaoGoogle onClick={cadastrandoGoogle} texto='Cadastrar com Google' />
            
                <div className=''>
                    <p className='opacity-80 flex text-red'>Já possui uma conta? </p>
                    <a href="javascript:void(0)" onClick={goLogin} className="text-red-600 font-semibold">Login</a>
                </div>
            
        </div>

            
    </div>

    )
}

export default Cadastrar;