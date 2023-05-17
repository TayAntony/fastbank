import axios from 'axios'
import LogoComponent from '../components/logo'
import CelularImg from '../assets/imagens/celular.png'
import CardInformacoes from '../components/cardInformacoes'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

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



function Homepage() {
    useEffect(() => {
        AOS.init({
          duration: 1000, // tempo de duração da animação
          easing: "ease-in-out", // curva de animação
          once: true, // animação acontece apenas uma vez
          mirror: true, // animação acontece na ida e na volta
        });
      }, []);

    const gerarCartao = () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNjYyNDIzLCJqdGkiOiJlZTM1NWEzNmNlYjE0NzQwOGIyMmExNDFjNmFhYTUzNSIsInVzZXJfaWQiOjF9.fjtq9sB0nM-5ZwCNaOfKWF30QkIzhq_YIx4uyhn_2t4"
        console.log("geranod cartao")
        axios.post("http://127.0.0.1:8000/contas/clientes/", [{}], {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    }
    return (
        <>

            <div className='bg-fundo_home bg-center'>
                <div className='backdrop-blur-xl opacity-100'>
                    <div className='flex justify-between items-center xs:mx-28 mx-12'>
                        <LogoComponent/>
                        <a href="#" className='text-black underline decoration-solid font-medium '>
                            <p className='text-sm xs:text-lg'>Download App</p>
                        </a>
                    </div>

                    <div className='xs:flex '>
                        <div className='xs:ml-28 flex flex-col gap-2 ml-12 xs:gap-14'>
                            <h1 className='text-black font-michroma xs:text-4xl xs:w-auto leading-normal text-3xl xs:mt-36'>Para fazer acontecer</h1>
                            <p className='text-[#8F8F8F] xs:w-2/4 text-lg text-justify w-3/4'>Com o nosso aplicativo você pode fazer transações de contas, empréstimos, efetuar pagamentos online, pedir seu próprio cartão e muito mais!</p>
                        </div>
                        <img src={CelularImg} alt="App simulado" className='w-64 xs:mr-28 m-12'/>
                    </div>

                    <CardInformacoes/>

                    <div className='flex flex-wrap relative'>
                        <img src={CartoesImg} alt="Cartões" data-aos="flip-right" data-aos-duration="1500" className='xs:w-2/6 w-3/5'/>

                        <img src={ComentarioVanessa} alt="" data-aos="zoom-in" data-aos-duration="2000" className='relative w-2/5 xs:w-1/5 top-2/3'/>

                        <img src={ComentarioAmanda} alt="" data-aos="zoom-in" 
                        data-aos-duration="4000" className='relative w-2/5 xs:w-1/5'/>

                        <img src={ComentarioCintia} alt="" data-aos="zoom-in" data-aos-duration="2000" className='relative w-2/5 xs:w-1/5'/>

                        <img src={ComentarioCoracao} alt="" data-aos="zoom-in" data-aos-duration="1000" className='relative w-1/12'/>

                        <img src={ComentarioDinheiro} alt="" data-aos="zoom-in" data-aos-duration="4500" className='relative w-1/12'/>

                        <img src={ComentarioEmoji} alt="" data-aos="zoom-in" data-aos-duration="2500" className='relative w-1/12'/>

                        <img src={ComentarioGustavo} alt="" data-aos="zoom-in" data-aos-duration="1500" className='relative w-2/5 xs:w-1/5'/>
                        
                        <img src={ComentarioRaissa} alt="" data-aos="zoom-in" data-aos-duration="1500" className='relative w-2/5 xs:w-1/5'/>
                        <img src={ComentarioViktor} alt="" data-aos="zoom-in" data-aos-duration="3500" className='relative w-2/5 xs:w-1/5'/>
                    </div>

                    <button className="bg-gradient-to-r from-[#7611A6] to-[#DA4C5DF8] drop-shadow-[6px_5px_5px_rgba(0,0,0,0.40)] rounded-3xl p-6 font-semibold text-2xl border-2 border-solid" onClick={gerarCartao}>Peça já o seu cartão!</button>
                    
                </div>

                
                
            </div>
           
        </>);
}

export default Homepage;