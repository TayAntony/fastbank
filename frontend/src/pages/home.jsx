import axios from 'axios'
import LogoComponent from '../components/logo'
import CelularImg from '../assets/imagens/celular.png'
import CardInformacoes from '../components/cardInformacoes'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import "../index.css"

import CartoesImg from '../../public/cartao.svg'
import ComentarioVanessa from '../assets/comentarios/comentarioVanessa.svg'
import ComentarioAmanda from '../assets/comentarios/comentarioAmanda.svg'
import ComentarioCintia from '../assets/comentarios/comentarioCintia.svg'
import ComentarioGustavo from '../assets/comentarios/comentarioGustavo.svg'
import ComentarioRaissa from '../assets/comentarios/comentarioRaissa.svg'
import ComentarioViktor from '../assets/comentarios/comentarioViktor.svg'
import ComentarioDinheiro from '../assets/comentarios/comentarioDinheiro.svg'
import ComentarioEmoji from '../assets/comentarios/comentarioEmoji.svg'
import ComentarioCoracao from '../assets/comentarios/comentarioCoracao.svg'
import { useNavigate } from 'react-router-dom';

import IconGithub from '../assets/icons/github.svg'
import IconInstagram from '../assets/icons/instagram.svg'
import IconLinkedin from '../assets/icons/linkedin.svg'
import { ip } from "./login";

import IconPhone from '../assets/icons/phone-solid.svg'


function Homepage() {
    // FUNÇÃO DE RODAR ANIMAÇÃO
    


    const [user, setUser] = useState();
    const [divVisivel, setDivVisivel] = useState(false);

    const [cvv, setCvv] = useState("");
    const [bandeira, setBandeira] = useState("");
    const [numeroCartao, setNumeroCartao] = useState("");
    const [dataVencimento, setDataVencimento] = useState("");
    const [nomeTitular, setNomeTitular] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        AOS.init({
          duration: 1500, // tempo de duração da animação
          easing: "ease-in-out", // curva de animação
          once: true, // animação acontece apenas uma vez
          mirror: true, // animação acontece na ida e na volta
        });
    }, []);

    const getSession = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return navigate("/login");
        }

        //LEMBRAR DE TROCAR O IP NO LOGIN

        const res = await axios.get(`http://${ip}/auth/users/me/`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        });

        return res.data;
    }

    useEffect(() => {
        getSession()
            .then(user => setUser(user))
            .catch(_err => navigate("/login"));
    }, []);

    const gerarCartao = async () => {
        if (!user) return;
        const idUsuario = user.id;
        setDivVisivel(true)

        setNumeroCartao(user.numero_cartao)
        setCvv(user.cvv)
        setDataVencimento(user.data_vencimento)
        setBandeira(user.bandeira)
        setNomeTitular(user.nome)

        const res = await axios.post(`http://${ip}/contas/create-cartao/`, { id: idUsuario });
        console.log(res.data);
        Swal.fire({
            icon: 'success',
            title: 'Parabéns',
            text: 'Seu cartão de débito foi gerado com sucesso!',
            confirmButtonText: 'Quero ver!',
            confirmButtonColor: '#700097',
        });
    }

    return (
        <>
            <div className='bg-fundo_home bg-center h-[1700px]'>
                <div className='backdrop-blur-xl opacity-100'>
                    <div className='flex justify-between items-center xs:mx-28 mx-12 '>
                        <LogoComponent/>
                        <div className='flex gap-4 '>
                            {/* COLOCAR CONDIÇÃO PARA O NOME DO USUÁRIO LOGADO FICAR EMBAIXO DA LOGO E DO DOWNLOAD APP*/}
                            <p className='text-black text-sm xs:text-lg'>Bem-vindo(a), {user ? user.nome_cliente.toUpperCase() :"Carregando..."}</p>
                            <a href="#" className='text-black underline decoration-solid font-medium '>
                                <p className='text-sm xs:text-lg'>Download App</p>
                            </a>
                        </div>
                    </div>

                    <div className='xs:flex '>
                        <div className='xs:ml-28 flex flex-col gap-2 ml-12 xs:gap-14'>
                            <h1 className='text-black font-michroma xs:text-4xl xs:w-auto leading-normal text-3xl xs:mt-36'>Para fazer acontecer</h1>
                            

                            <div className='text-[#636363] xs:w-4/5 text-lg text-justify w-3/4 leading-10'>
                            <p>Com o nosso aplicativo você pode:</p>
                                <li>Fazer transações de contas</li>
                                <li>Empréstimos</li>
                                <li>Efetuar pagamentos online</li>
                                <li>Pedir seu próprio cartão e muito mais!</li>
                            </div>

                        </div>
                        <img src={CelularImg} alt="App simulado" className='w-64 xs:mr-28 m-12'/>
                    </div>

                    <CardInformacoes/>

                    {/* RODAR A ANIMAÇÃO SÓ QUANDO O USUÁRIO SCROOLAR */}

                    <div className='relative xs:m-8 h-[500px]'>
                        <div className='absolute w-80 xs:w-3/6 left-[30vw] top-[13vh]'><img src={CartoesImg} alt="Cartões" data-aos="flip-right" data-aos-duration="7000"/></div>

                        {/* COMENTÁRIOS */}

                        <div className='absolute top-0 left-0 right-0 bottom-0'>
                            <div className='absolute top-[5vh] left-[35vw] xs:w-64 hidden xs:block'><img src={ComentarioVanessa} alt="" data-aos="zoom-in" data-aos-duration="6000"/></div>

                            <div className='absolute top-[12vh] left-[64vw] xs:w-64  hidden xs:block'><img src={ComentarioRaissa} alt="" data-aos="zoom-in" data-aos-duration="7000" /></div>

                            <div className='absolute top-[28vh] left-[68vw] xs:w-64  hidden xs:block '>
                            <img src={ComentarioAmanda} alt="" data-aos="zoom-in" data-aos-duration="5500"/></div>

                            
                            <div className='hidden xs:block xs:w-80 absolute top-[43vh] left-[65vw]'><img src={ComentarioEmoji} alt="" data-aos="zoom-in" data-aos-duration="6500"/></div>

                            <div className='absolute top-[54vh] left-[34vw] xs:w-64  hidden xs:block'><img src={ComentarioCintia} alt="" data-aos="zoom-in" data-aos-duration="5500"/></div>

                            <div className='absolute hidden xs:block xs:w-64 top-[49vh] left-[20vw]'><img src={ComentarioCoracao} alt="" data-aos="zoom-in" data-aos-duration="7500"/></div>

                            <div className='absolute top-[35vh] left-[5vw] xs:w-64  hidden xs:block '><img src={ComentarioGustavo} alt="" data-aos="zoom-in" data-aos-duration="6000"/></div>

                            <div className='absolute top-[24vh] left-[15vw] hidden xs:block xs:w-64'><img src={ComentarioDinheiro} alt="" data-aos="zoom-in" data-aos-duration="5500"/></div>

                            <div className='absolute top-[14vh] left-[8vw] xs:w-64  hidden xs:block'><img src={ComentarioViktor} alt="" data-aos="zoom-in" data-aos-duration="4500"/></div>
                        </div>
                    </div>


                    <div className='flex justify-center flex-col items-center '>
                        <button className="bg-gradient-to-r from-[#7611A6] to-[#DA4C5DF8] drop-shadow-[6px_5px_5px_rgba(0,0,0,0.40)] rounded-2xl p-6 font-semibold text-xl border-2 border-solid max-w-xs transition duration-150 ease-in-out mt-24 " onClick={gerarCartao}>Peça já o seu cartão!</button>
                        {divVisivel && (
                            <div className='text-black m-4'>
                                <p>Número cartão: {numeroCartao}</p>
                                <p>....</p>
                                <p>CVV: {cvv}</p>
                                <p>Data de vencimento: {dataVencimento}</p>
                                <p>Nome do titular: {nomeTitular}</p>
                                <p>Bandeira {bandeira}</p>
                            </div>
                        )}
                    </div> 
                </div>

                <footer className='bg-gradient-to-r from-[#B455FF] to-[#FF5A5A] h-auto rounded-t-3xl mt-3 p-2 backdrop-blur-xl opacity-100' >
                    
                        <div className='flex xs:flex-row justify-around mt-4 flex-col items-center gap-9'>
                            <div className='w-4/5 m-1 text-center xs:w-1/5 items-center'>
                                <p className='text-xl font-bold mb-2'>Follow Us</p>
                                <div className='flex justify-evenly flex-row gap-5'>
                                    <div className=' xs:w-11 w-36'>
                                        <a href="https://github.com/TayAntony" target='_blank'><img src={IconGithub} alt="icone github"  /></a>
                                    </div>
                                    <div className=' xs:w-10 w-32 '>
                                        <a href="https://www.linkedin.com/in/tayssa-antoniasse-724373190/" target='_blank'><img src={IconLinkedin} alt="icone linkedin" /></a>
                                    </div>
                                    <div className=' xs:w-11 w-36'>
                                        <a href="https://www.instagram.com/tay.antony/" target='_blank'><img src={IconInstagram} alt="icone instagram" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className='w-4/5 m-1 text-center xs:w-1/5'>
                                <p className='text-xl font-bold mb-2'>Call Us</p>
                                <div className='flex justify-center flex-row color-white'>
                                    <div className=' w-6'>
                                        <img src={IconPhone} alt="icone telefone" class='text-white'/>
                                    </div>
                                    <p className='text-base font-normal ml-4'>0800 1234 4321 4556</p>
                                </div>
                            </div>
                        </div>
                            <div className='mt-5 text-sm'>
                                    <div className='h-[1px] bg-white w-11/12 m-auto'>
                                    </div>
                                    <div className='flex flex-row justify-between mx-12 mt-4'>
                                        <p>2023 © Copyright</p>
                                        <p>Tayssa Antoniasse</p>
                                    </div>
                            </div>
                    
                </footer>
            </div>
           
        </>);
}

export default Homepage;