import { View, Text } from "react-native";
import styles from './styles'
import { useSession, ip } from "../home";
import { useState, useEffect } from "react"
import axios from 'axios';

export default function Extrato(navigation) {
    const [extrato, setExtrato] = useState([])
    const { user } = useSession(navigation);

    const puxarExtrato = async () => {
        console.log("vou puxar extrato da conta", user.conta.id)
        
        try{
            const response = await axios.get(`${ip}/contas/extrato/?id=${user.conta.id}`)
            setExtrato(response.data.extrato)
        }
        catch(error){
            console.log("deu erro", error)
        }
    }

    useEffect(() => {
        if (user.conta.id){
            puxarExtrato()
        }

    }, [user.conta.id])


    
    return(
        <View style={styles.container}>
            <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                Extrato
            </Text>

            {/* colocar as movimentações de verdade do usuário logado ou a mensagem caso não tenha nenhuma movimentação */}
            <Text style={{ fontWeight: 300, fontSize: 20, color: 'black', position: 'absolute', top: '20%' }}>
               Suas movimentações aparecerão aqui!
            </Text>

            <View style={{ fontWeight: 300, fontSize: 20, color: 'black', position: 'absolute', top: '40%' }}>
               {extrato.map(move => (
                <Text>
                    {move.texto} {move.data_hora}
                </Text>
               ))}
            </View>
            
        </View>
    )
}