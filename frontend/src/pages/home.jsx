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

            <p className='text-black'>ola</p>
           
        </>);
}

export default Homepage;