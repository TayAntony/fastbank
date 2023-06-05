import Botao from '../components/botaoLogin'
import BotaoGoogle from '../components/botaoGoogle'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Input from '../components/input'
import axios from 'axios'
import { ip } from "./login";

function Cadastrar() {

    let navigate = useNavigate();

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [cep, setCep] = useState('')

    const goLogin = () => {
        navigate("/login");
    }

    const cadastrar = async (evt) => {
        evt.preventDefault();
        const infoDoCadastro = {nome_cliente: nome, cpf_cnpj:cpf, email: email, data_nascimento_criacao: dataNascimento, password: senha, cep: cep} 

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
        else if (cpf.length !=11){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'O CPF digitado não é válido (max. 11 caracteres)',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#D51317',
            });
            return
        }
        else if (cep.length !=8){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'O CEP digitado não é válido (max. 8 caracteres)',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#D51317',
            });
            return
        }
        else if (nome.length===0){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Digite seu nome!',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#D51317',
            });
            return
        }

        try {
            //console.log("tentou cadastrar")
            const retornoRequisicaoCadastro = await axios.post(`${ip}/auth/users/`, infoDoCadastro);
            const idUserCadastrado = retornoRequisicaoCadastro.data.id;

            const retornoRequisicaoCriarConta = await axios.post(`${ip}/contas/create-conta/`, { id: idUserCadastrado });

            //console.log(retornoRequisicaoCriarConta.data);

            Swal.fire({
                icon: 'success',
                title: 'Parabéns',
                text: 'Você foi cadastrado com sucesso e sua conta do banco foi criada. Aproveite!',
                confirmButtonText: 'Redirecionar para o login...',
                confirmButtonColor: '#00B318',
            });
            goLogin();
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
        <div className="imgBackground xs:flex xs:flex-row">
            <div className='xs:absolute xs:top-0 xs:left-0 m-36 hidden'>
                <h1 className="text-6xl font-poppins xs:text-8xl font-bold ">ToDo</h1>
                <p className='text-lg font-michroma xs:font-normal xs:text-2xl'>Onde você faz acontecer!</p>
            </div>
            
                <form onSubmit={cadastrar} className='flex flex-col p-6 items-center border-solid backdrop-blur-md border-2 border-white rounded-xl m-10 box-border text-center gap-8 justify-center py-14 xs:absolute xs:top-[5vh] xs:right-[20vw]'>
                    <p className='paragrafos max-w-xs text-justify'>Preencha com as suas informações para realizar o cadastro!</p>
                    
                    <div className='flex items-end flex-col gap-4 overflow-y-auto max-h-44'>
                        <Input placeholder='Nome completo' tipo='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
                        <Input placeholder='E-mail' tipo='text' value={email} onChange={(e) => setEmail(e.target.value)}/>

                        <Input placeholder='CPF' tipo='number' value={cpf} onChange={(e) => setCpf(e.target.value)}/>

                        <Input placeholder='Data de nascimento' tipo='date' value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>

                        <Input placeholder='CEP' tipo='number' value={cep} onChange={(e) => setCep(e.target.value)}/>

                        <div className='flex items-end flex-col'>
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