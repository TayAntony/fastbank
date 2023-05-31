import { View, Text } from "react-native";
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import { useSession, ip } from "../home";
import axios from 'axios';
import { useState, useEffect } from "react"

export default function Carteira(navigation) {
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


    return ( 
    <View style={styles.container}>
    
        <View style={styles.header}>
                <LinearGradient
                    style={{
                        width: '100%',
                        flex: 1,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,

                    }}
                    colors={['#E30044', '#6A3A90']}
                    start={{ x: 2, y: 0 }}
                    end={{ x: 0, y: 2 }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: 30,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                        }}>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                            }}>
                            
                        </View>
                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        backgroundColor: 'white',
                        alignContent: 'center',
                        marginLeft: 28,
                        marginRight: 28,
                        borderRadius: 12,
                        }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: 30,
                            justifyContent: 'space-evenly',
                            alignItems: 'baseline'
                        }}>
                            <Text style={{ margin: 6 }}>
                                Saldo em conta
                            </Text>
                            {/* quando entra na carteira as vezes da erro undefined */}
                            <Text style={{ margin: 6 }}>
                                R$ {user.conta.saldo}.00
                            </Text>
                    </View>

                </View>

            </LinearGradient>
        </View>
        <Text style={{ fontWeight: 300, fontSize: 20, color: 'black', position: 'absolute', top: '35%' }}>
               Suas últimas movimentações!
        </Text>
        <View style={{ fontWeight: 300, fontSize: 20, color: 'black', position: 'absolute', top: '40%' }}>
               {extrato.map(move => (
                <View style={{margin: 10}}>
                    <Text>
                    {move.data_hora}
                    </Text>

                    <Text style={{fontWeight: 'bold'}}>
                    {move.texto.toUpperCase()} 
                    </Text>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 10}}>
                    </View>

                </View>

               ))}
            </View>

    </View>
    )
}