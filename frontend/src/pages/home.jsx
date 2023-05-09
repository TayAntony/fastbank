import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LogoComponent from '../components/logo'
import CelularImg from '../assets/imagens/celular.png'
import CardInformacoes from '../components/cardInformacoes'

import Cartao1 from '../../public/cartoes/cartao1.svg'

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

    const gerarCartao = () => {
        console.log("geranod cartao")
        axios.post("http://127.0.0.1:8000/contas/clientes/", [{
            
        }])
    }
    return (
        <>

            <div className='bg-fundo_home bg-center'>
                <div className='backdrop-blur-xl opacity-100'>
                    <img src="../assets/cartao.png" alt="" className='bg-center'/>
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

                    <div className='flex flex-wrap'>
                        <img src={CartoesImg} alt="Cartões" />
                        <img src={ComentarioVanessa} alt="" />
                        <img src={ComentarioAmanda} alt="" />
                        <img src={ComentarioCintia} alt="" />
                        <img src={ComentarioCoracao} alt="" />
                        <img src={ComentarioDinheiro} alt="" />
                        <img src={ComentarioEmoji} alt="" />
                        <img src={ComentarioGustavo} alt="" />
                        <img src={ComentarioRaissa} alt="" />
                        <img src={ComentarioViktor} alt="" />
                    </div>

                    <button className="bg-gradient-to-r from-[#7611A6] to-[#DA4C5DF8] drop-shadow-[6px_5px_5px_rgba(0,0,0,0.40)] rounded-3xl p-6 font-semibold text-2xl border-2 border-solid xs:w-4/12 " onClick={gerarCartao}>Peça já o seu cartão!</button>
                    
                </div>

                
                
            </div>
           
        </>);
}

export default Homepage;