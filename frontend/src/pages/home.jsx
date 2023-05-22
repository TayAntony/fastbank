import axios from 'axios'
import LogoComponent from '../components/logo'
import CelularImg from '../assets/imagens/celular.png'
import CardInformacoes from '../components/cardInformacoes'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

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



function Homepage() {
    const [user, setUser] = useState();
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

        const res = await axios.get("http://127.0.0.1:8000/auth/users/me/", {
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
        const res = await axios.post("http://127.0.0.1:8000/contas/create-cartao/", { id: idUsuario });
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
            <div className='bg-fundo_home bg-center'>
                <div className='backdrop-blur-xl opacity-100'>
                    <div className='flex justify-between items-center xs:mx-28 mx-12'>
                        <LogoComponent/>
                        <div className='flex gap-4'>
                            <p className='text-black text-sm xs:text-lg'>Bem-vindo(a), {user ? user.nome_cliente :"Carregando..."}</p>
                            <a href="#" className='text-black underline decoration-solid font-medium '>
                                <p className='text-sm xs:text-lg'>Download App</p>
                            </a>
                        </div>
                    </div>

                    <div className='xs:flex '>
                        <div className='xs:ml-28 flex flex-col gap-2 ml-12 xs:gap-14'>
                            <h1 className='text-black font-michroma xs:text-4xl xs:w-auto leading-normal text-3xl xs:mt-36'>Para fazer acontecer</h1>
                            <p className='text-[#8F8F8F] xs:w-2/4 text-lg text-justify w-3/4'>Com o nosso aplicativo você pode fazer transações de contas, empréstimos, efetuar pagamentos online, pedir seu próprio cartão e muito mais!</p>
                        </div>
                        <img src={CelularImg} alt="App simulado" className='w-64 xs:mr-28 m-12'/>
                    </div>

                    <CardInformacoes/>

                    <div className='relative'>
                        <div className='absolute w-3/5 xs:w-3/6 left-[30vw] top-[20vh]'><img src={CartoesImg} alt="Cartões" data-aos="flip-right" data-aos-duration="1500"/></div>

                        {/* COMENTÁRIOS */}

                    <div className='absolute top-0 left-0 right-0 bottom-0'>
                        <div className='absolute top-12 left-64 xs:w-64 hidden xs:block'><img src={ComentarioVanessa} alt="" data-aos="zoom-in" data-aos-duration="2000"/></div>
                        <div className='absolute top-72 right-12 xs:w-64  hidden xs:block '>
                        <img src={ComentarioAmanda} alt="" data-aos="zoom-in"
                                data-aos-duration="4000"/>
                        </div>
                        <div className='absolute top-96 left-64 xs:w-64  hidden xs:block'><img src={ComentarioCintia} alt="" data-aos="zoom-in" data-aos-duration="2000"/></div>
                        <div className='hidden xs:block xs:w-64 top-56'><img src={ComentarioCoracao} alt="" data-aos="zoom-in" data-aos-duration="1000"/></div>
                            <div className='hidden xs:block xs:w-64'><img src={ComentarioDinheiro} alt="" data-aos="zoom-in" data-aos-duration="4500"/></div>
                            <div className='hidden xs:block xs:w-64 '><img src={ComentarioEmoji} alt="" data-aos="zoom-in" data-aos-duration="2500"/></div>
                            <div className='absolute top-72 left-16 xs:w-64  hidden xs:block '><img src={ComentarioGustavo} alt="" data-aos="zoom-in" data-aos-duration="1500"/></div>
                        
                            <div className='absolute top-32 right-0 xs:w-64  hidden xs:block'><img src={ComentarioRaissa} alt="" data-aos="zoom-in" data-aos-duration="1500" /></div>

                            <div className='absolute top-32 left-0 xs:w-64  hidden xs:block'><img src={ComentarioViktor} alt="" data-aos="zoom-in" data-aos-duration="3500"/></div>
                    </div>
                    </div>


                    <button className="bg-gradient-to-r from-[#7611A6] to-[#DA4C5DF8] drop-shadow-[6px_5px_5px_rgba(0,0,0,0.40)] rounded-3xl p-6 font-semibold text-2xl border-2 border-solid" onClick={gerarCartao}>Peça já o seu cartão!</button>

                    {/*  */}
                    <div className='text-black'>
                        <p>Número cartão: {user ? user.numero_cartao :"Carregando número..."}</p>
                        <p>CVV: {user ? user.cvv : "Carregando cvv..."}</p>
                        <p>Data de vencimento: {user? user.data_vencimento : "Carregando data de vencimento"}</p>
                        <p>Nome do titular: {user ? user.nome : "Carregando nome..."}</p>
                    </div>
                    
                </div>

                
                
            </div>
           
        </>);
}

export default Homepage;