import Botao from '../components/botaoLogin'
import BotaoGoogle from '../components/botaoGoogle'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Input from '../components/input'
import axios from 'axios'

function Cadastrar() {

    let navigate = useNavigate();
    const goHomepage = () => {
        navigate("/homepage")}

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')

    const goLogin = () => {
        navigate("/login");
    }

    const cadastrar = async (evt) => {
        evt.preventDefault();
        const infoDoCadastro = {username: username, password: senha, email: email, cpf:cpf}
        if(senha.length < 8){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Senha deve ter no mínimo 8 caracteres, incluindo números e letras',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#D51317',
            });
            return
        }else if (!email.includes("@") || !email.includes(".com")){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'O E-mail digitado não é válido!',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#D51317',
            });
            return
        }
        else if (!cpf.length == 11){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'O CPF digitado não é válido!',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#D51317',
            });
            return
        }

        try {
            await axios.post('http://127.0.0.1:8000/auth/users/', infoDoCadastro);
            Swal.fire({
                icon: 'success',
                title: 'Parabéns',
                text: 'Você foi cadastrado com sucesso!',
                confirmButtonText: 'Redirecionar para o login...',
                confirmButtonColor: '#00B318',
            });
            navigate("/login")
        } catch (err) {
            console.log(JSON.stringify(err));
            if(err.response && err.response.status === 400){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuário já cadastrado!',
                    confirmButtonText: 'Tentar novamente',
                    confirmButtonColor: '#D51317',
                });
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Não foi possível cadastrar',
                    confirmButtonText: 'Tentar novamente',
                    confirmButtonColor: '#D51317',
                });
            } 
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
            
                <form onSubmit={cadastrar} className='flex flex-col p-6 items-center border-solid backdrop-blur-md border-2 border-white rounded-xl m-10 box-border text-center gap-8 justify-center py-14'>
                    <p className='paragrafos max-w-xs text-justify'>Preencha com as suas informações para realizar o cadastro!</p>
                    
                    <div className='flex items-end flex-col gap-4'>
                        <Input placeholder='E-mail' tipo='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Input placeholder='Nome completo' tipo='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <Input placeholder='CPF' tipo='text' value={cpf} onChange={(e) => setCpf(e.target.value)}/>

                        <div className='flex items-end flex-col'>/
                        <Input  placeholder='Senha' tipo='password' value={senha} onChange={(e) => setSenha(e.target.value)}/>
                        </div>
                    </div>
                        <Botao texto='Cadastrar' />
                        <BotaoGoogle onClick={cadastrandoGoogle} texto='Cadastrar com Google' />
                    <div className=''>
                        <p className='opacity-80 flex text-red'>Já possui uma conta? </p>
                        <a href="javascript:void(0)" onClick={goLogin} className="text-red-600 font-semibold">Login</a>
                    </div>
                </form>
            
    </div>

    )
}

export default Cadastrar;