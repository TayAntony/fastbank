import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

            <Header />
            <p>{dados.login}</p>
            <div className='p-4'>
                <MyComponent />
                <h1 className="text-black font-bold mt-5 ml-7">Ofertas Imperdíveis!</h1>
                <p className="text-black ml-7">Aproveite</p>
                <div className='flex xs:flex-nowrap flex-wrap justify-between'>
                    {lista.map((item) => (
                        <CardProduto item={item}/>
                    ))}
                </div>
            </div>
        </>);
}

export default Homepage;