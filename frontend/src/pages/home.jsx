import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LogoComponent from '../components/logo'
import CelularImg from '../assets/imagens/celular.png'
import CardInformacoes from '../components/cardInformacoes'

function Homepage() {
    const dados = JSON.parse(localStorage.getItem("dados"))

    const [lista, setLista] = useState([])
    
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/loja/produtos", { headers: { "Content-Type": "aplication/json" } })
            .then((res) => {
                setLista(res.data)
                console.log(res.data)
            })
    }, [])
    let navigate = useNavigate()

    return (
        <>

            <div className='bg-fundo_home bg-cover'>
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
                    
                </div>
            </div>

            <CardInformacoes/>
            
            <div className='bg-fundo_home_invertido bg-cover'>
                <div className='backdrop-blur-xl'>
                    <p>conteudo de cartao</p>
                </div>
                    
            </div>
           
        </>);
}

export default Homepage;