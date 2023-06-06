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
import IconPhone from '../assets/icons/phone-solid.svg'

import { ip } from "./login";

import chip from '../assets/cartoes/chip.svg';
import background1 from '../assets/cartoes/bg1.svg';
import background2 from '../assets/cartoes/bg2.svg';
import background3 from '../assets/cartoes/bg3.svg';
import background4 from '../assets/cartoes/bg4.svg';
import background5 from '../assets/cartoes/bg5.svg';
import background6 from '../assets/cartoes/bg6.svg';
import background7 from '../assets/cartoes/bg7.svg';
import background8 from '../assets/cartoes/bg8.svg';
import background9 from '../assets/cartoes/bg9.svg';
import background10 from '../assets/cartoes/bg10.svg';
import { Card } from 'react-pay-card'

function Homepage() {
    const backgrounds = [
        background1,
        background2,
        background3,
        background4,
        background5,
        background6,
        background7,
        background8,
        background9,
        background10
    ]
    
    const randomIndexBg = Math.floor(Math.random() * backgrounds.length);
    const bgRandom = backgrounds[randomIndexBg];

    const [user, setUser] = useState();
    const [divVisivel, setDivVisivel] = useState(false);

    const [cvvWeb, setCvv] = useState("");
    const [bandeira, setBandeira] = useState("Mastercard")
    const [numeroCartao, setNumeroCartao] = useState("");
    const [dataVencimentoMes, setDataVencimentoMes] = useState("");
    const [dataVencimentoAno, setDataVencimentoAno] = useState("");
    const [nomeTitular, setNomeTitular] = useState("");
    

    const navigate = useNavigate();
    useEffect(() => {
        AOS.init({
          duration: 1000, // tempo de duração da animação
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


        const res = await axios.get(`${ip}/auth/users/me/`, {
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

    //verificar se existe um usuário logado e chamar a função de carregar cartão
    useEffect(() => {
        if (user){
            loadCard()
        }
        
    }, [user])

    const loadCard = () => {
        if (!user) return;
        axios.get(`${ip}/contas/cartao/${user.id}/`)
        .then(res => {
            setNumeroCartao(res.data.numero_cartao)
            setCvv(res.data.cvv)
            setBandeira(res.data.bandeira)
            setNomeTitular(res.data.nome)
            setDataVencimentoMes(res.data.data_vencimento_mes)
            setDataVencimentoAno(res.data.data_vencimento_ano)
            setDivVisivel(true)
        })
        .catch(_err => {})
    }

    const gerarCartao = async () => {
        if (!user) return;
        const idUsuario = user.id;
        
        const res = await axios.post(`${ip}/contas/create-cartao/`, { id: idUsuario });
        console.log(res.status);
    
        setNumeroCartao(res.data.cartao.numero_cartao)
        setCvv(res.data.cartao.cvv)
        setBandeira(res.data.cartao.bandeira)
        setNomeTitular(res.data.cartao.nome)
        setDataVencimentoMes(res.data.cartao.data_vencimento_mes)
        setDataVencimentoAno(res.data.cartao.data_vencimento_ano)
        
        if(res.status == 201 || res.status == 200){
            Swal.fire({
                icon: 'success',
                title: 'Parabéns',
                text: 'Seu cartão de débito foi gerado com sucesso!',
                confirmButtonText: 'Quero ver!',
                confirmButtonColor: '#700097',
            });
        }

        
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Ocorreu um erro ao criar seu cartão!',
                confirmButtonText: 'Tente novamente!',
                confirmButtonColor: '#c9083e',
            });
        }

        
        setDivVisivel(true)
    }

    return (
        <>
        <div className='bg-fundo_home bg-center h-[1700px]'>
            <div className='backdrop-blur-xl opacity-100'>
                <div className='flex justify-between items-center xs:mx-28 mx-12 '>
                    <LogoComponent/>

                    <div className='flex gap-4 '>
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
                    <img src={CelularImg} alt="App simulado" className='w-64 xs:mr-28 m-auto my-8'/>
                </div>

                <CardInformacoes/>


                <div className='relative xs:m-8 h-[500px]'>
                    <div className='absolute w-80 xs:w-3/6 left-[15vw] xs:left-[30vw] xs:top-[13vh] top-[5vh]'><img src={CartoesImg} alt="Cartões" data-aos="flip-right" data-aos-duration="7000"/></div>

                    {/* COMENTÁRIOS */}

                    <div className='absolute top-0 left-0 right-0 bottom-0'>
                        <div className='absolute top-[5vh] left-[35vw] xs:w-64 hidden xs:block'><img src={ComentarioVanessa} alt="" data-aos="zoom-in" data-aos-duration="4000"/></div>

                        <div className='absolute top-[12vh] left-[64vw] xs:w-64  hidden xs:block'><img src={ComentarioRaissa} alt="" data-aos="zoom-in" data-aos-duration="7000" /></div>

                        <div className='absolute top-[28vh] left-[68vw] xs:w-64  hidden xs:block '>
                        <img src={ComentarioAmanda} alt="" data-aos="zoom-in" data-aos-duration="5500"/></div>

                        
                        <div className='hidden xs:block xs:w-80 absolute top-[43vh] left-[65vw]'><img src={ComentarioEmoji} alt="" data-aos="zoom-in" data-aos-duration="6500"/></div>

                        <div className='absolute top-[54vh] left-[34vw] xs:w-64  hidden xs:block'><img src={ComentarioCintia} alt="" data-aos="zoom-in" data-aos-duration="1000"/></div>

                        <div className='absolute hidden xs:block xs:w-64 top-[49vh] left-[20vw]'><img src={ComentarioCoracao} alt="" data-aos="zoom-in" data-aos-duration="7500"/></div>

                        <div className='absolute top-[35vh] left-[5vw] xs:w-64  hidden xs:block '><img src={ComentarioGustavo} alt="" data-aos="zoom-in" data-aos-duration="6000"/></div>

                        <div className='absolute top-[24vh] left-[15vw] hidden xs:block xs:w-64'><img src={ComentarioDinheiro} alt="" data-aos="zoom-in" data-aos-duration="1000"/></div>

                        <div className='absolute top-[14vh] left-[8vw] xs:w-64  hidden xs:block'><img src={ComentarioViktor} alt="" data-aos="zoom-in" data-aos-duration="4500"/></div>
                    </div>
                </div>


                <div className='flex justify-center flex-col items-center '>
                    {divVisivel == false ? <button className="bg-gradient-to-r from-[#7611A6] to-[#DA4C5DF8] drop-shadow-[6px_5px_5px_rgba(0,0,0,0.40)] rounded-2xl p-6 font-semibold text-xl border-2 border-solid max-w-xs transition duration-150 ease-in-out xs:mt-24 mt-[-160px]" onClick={gerarCartao}>Peça já o seu cartão!</button> : <p></p> }

                    {divVisivel && (
                        <div className='xs:my-20'>
                            <Card
                                chipIcon={chip}
                                brandIcon='ToDo'
                                backgroundImage={bgRandom}
                                cardHolder={nomeTitular}
                                cardNumber={numeroCartao}
                                cardMonth={dataVencimentoMes}
                                cardYear={dataVencimentoAno}
                                cardCvv={cvvWeb.toString()}
                                />
                        </div>
                    )}
                </div> 
            </div>

            <footer className='bg-gradient-to-r from-[#B455FF] to-[#FF5A5A] h-auto rounded-t-3xl mt-3 p-2 backdrop-blur-xl opacity-100' >
                
                    <div className='flex xs:flex-row justify-around mt-4 flex-col items-center gap-9 '>
                        <div className='w-3/5 m-1 text-center xs:w-1/5 items-center align-middle'>
                            <p className='text-xl font-bold mb-2'>Follow Us</p>
                            <div className='flex items-center flex-row gap-5 xs:justify-between ml-6'>
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