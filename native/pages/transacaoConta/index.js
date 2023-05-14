import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import BotaoAvancar from "../../components/botaoAvancar";
import styles from './styles'
import { Picker } from '@react-native-picker/picker';

export default function TransacaoConta() {
    const [listaDestinatarios, setListaDestinatarios] = useState([])
    const route = useRoute()

    const [agencia, setAgencia] = useState()
    const [conta, setConta] = useState()
    const [tipoConta, setTipoConta] = useState();

    const [chaveTransferencia, setChaveTransferencia] = useState('')

    // const valorTransferencia = route.params.valor
    // const nomeDestinatario = route.params.nome
    // const emailDestinatario = route.params.email
    // const idTransferencia = route.params.id
    // const informacoesUsuario = route.params.informacoesUsuario


    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                Dados bancários
            </Text>

            <Picker
                selectedValue={tipoConta}
                onValueChange={(itemValue) =>
                    setTipoConta(itemValue)
                } style={styles.input}>
                <Picker.Item label="Conta corrente" value="cc" />
                <Picker.Item label="Conta poupança" value="cp" />
                <Picker.Item label="Conta salário" value="cs" />
            </Picker>

            <TextInput
                placeholder="Agência"
                placeholderTextColor="black"
                KeyboardType='number'
                value={agencia}
                onChangeText={(e) => { setAgencia(e) }}
                style={styles.input} />

            <TextInput
                placeholder="Conta com dígito"
                placeholderTextColor="black"
                KeyboardType='number'
                value={conta}
                onChangeText={(e) => { setConta(e) }}
                style={styles.input} />

            <Pressable>
                <BotaoAvancar texto='Avançar' />
            </Pressable>
        </View>
    )
}
