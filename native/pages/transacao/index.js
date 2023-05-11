import { View, Text, Pressable } from "react-native";
import {FontAwesome} from '@expo/vector-icons'
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import BotaoAvancar from "../../components/botaoAvancar";
import styles from './styles'

export default function Transacao() {
    const [listaDestinatarios, setListaDestinatarios] = useState([])
    const route = useRoute()

    const [chaveTransferencia, setChaveTransferencia] = useState('')

    const valorTransferencia = route.params.valor
    const nomeDestinatario = route.params.nome
    const emailDestinatario = route.params.email
    const idTransferencia = route.params.id
    const informacoesUsuario = route.params.informacoesUsuario
    
    
    return(
        <View style={styles.container}>
            <Text>
                Transação
            </Text>

            <TextInput
                 placeholder="E-mail ou usuário"
                 placeholderTextColor="gray"
                 KeyboardType='text'
                 value={chaveTransferencia}
                 onChangeText={(e) => {setChaveTransferencia(e)}}
            />
            <Text>
                Não tem chave? Use os dados de agência e conta.
            </Text>

            <Pressable>
                <BotaoAvancar texto='Avançar'/>
            </Pressable>

            
        
            <View style={styles.header}>transação</View>
        </View>
    )
}