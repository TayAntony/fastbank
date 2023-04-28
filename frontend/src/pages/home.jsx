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

            <div className='bg-fundo_home'>
                <div className='backdrop-blur-md'>
                    <img src="../assets/cartao.png" alt="" className='bg-center'/>
                    <div className='flex justify-between items-center mx-28'>
                        <LogoComponent/>
                        <a href="#" className='text-black underline decoration-solid font-medium'>
                            <p>Download App</p>
                        </a>
                    </div>

                    <div className='flex'>
                        <div className='ml-28'>
                            <h1 className='text-black font-michroma text-5xl w-96 leading-normal'>Para fazer acontecer</h1>
                            <p className='text-[#8F8F8F] w-2/4 text-2xl text-justify'>Com o nosso aplicativo você pode fazer transações de contas, empréstimos, efetuar pagamentos online e pedir seu próprio cartão!</p>
                        </div>
                        <img src={CelularImg} alt="App simulado" className='w-64 mr-28'/>
                    </div>
                    <CardInformacoes/>
                </div>
            </div>
           
        </>);
}

export default Homepage;