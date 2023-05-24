import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import BotaoAvancar from "../../components/botaoAvancar";
import styles from './styles'
import { Picker } from '@react-native-picker/picker';

export default function TransacaoConta() {
    const [listaDestinatarios, setListaDestinatarios] = useState([])

    const [camposValidados, setCamposValidados] = useState(false)

    const [agencia, setAgencia] = useState(0)
    const [conta, setConta] = useState(0)
    const [tipoConta, setTipoConta] = useState();

    useEffect(() => {
        if (agencia == "" || conta == ""){
            setCamposValidados(false)
        }else{
            setCamposValidados(true)
        }
    }, [agencia, conta])


    function fazerTransação(){
        if (agencia == "1111" || conta == "111111"){
            alert("transação concluída com sucesso")
        }else{
            alert("Não existe nenhuma conta com essas credenciais")
        }
    }


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

            {/* pesquisar no banco de dados se existe algum usuário com os dados bancários a seguir e realizar a transação caso exista*/}

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

            <Pressable disabled={!camposValidados} onPress={fazerTransação}>
                <BotaoAvancar texto='Avançar' validacao={camposValidados}/>
            </Pressable>
        </View>
    )
}
