import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import BotaoAvancar from "../../components/botaoAvancar";
import styles from './styles'

export default function Transacao() {
    const [listaDestinatarios, setListaDestinatarios] = useState([])
    const route = useRoute()

    const [chaveTransferencia, setChaveTransferencia] = useState('')

    // const valorTransferencia = route.params.valor
    // const nomeDestinatario = route.params.nome
    // const emailDestinatario = route.params.email
    // const idTransferencia = route.params.id
    // const informacoesUsuario = route.params.informacoesUsuario
    
    
    return(
        <View style={styles.container}>
            <TextInput
                 placeholder="E-mail ou usuário"
                 placeholderTextColor="black"
                 KeyboardType='text'
                 value={chaveTransferencia}
                 onChangeText={(e) => {setChaveTransferencia(e)}}
                 style={{backgroundColor: '#E6E6E6',
                         padding: 12,
                         width: '80%',
                         marginTop:24,
                         borderRadius: 6,
                         borderBottomColor: 'black'
                         }}/>
            <Text style={{color:'#949494', fontSize: 12, }}>
                Não tem chave? Use os dados de agência e conta.
            </Text>

            <View style={{display:'flex', 
                         flexDirection: 'row', 
                         justifyContent: 'space-around'}}>
                <Text style={{}}>
                    Recentes
                </Text>
                <Text>
                    Favoritos
                </Text>
            </View>

            <Pressable>
                <BotaoAvancar texto='Avançar'/>
            </Pressable>
        </View>
    )
}