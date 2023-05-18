import { View, Text, TextInput, Pressable } from "react-native";
import styles from './styles'
import { useState } from "react";
import BotaoAvancar from "../../components/botaoAvancar";

export default function Cartao() {
    const [rendaMensal, setRendaMensal] = useState('')
    const [cpf, setCpf] = useState('')
    const [limite, setLimite] = useState('')

    const [validarCampos, setValidarCampos] = useState(false)

    function solicitarCartao(){
        if (rendaMensal < limite){
            alert('Sua conta não cumpre os requisitos para solicitar um cartão de crédito!')
        }else{
            alert('Cartão solicitado com sucesso!')
        }
    }
    
    return(
        // ao solicitar cartão de crédto pelo app é possível escolher o limite, ao solicitar pelo site é apenas cartão de débito e não da pra escolher nada

        <View style={styles.container}>
            <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                Solicitar cartão de crédito
            </Text>

            <TextInput
                placeholder="Sua renda mensal"
                placeholderTextColor="black"
                KeyboardType='number'
                value={rendaMensal}
                onChangeText={(e) => { setRendaMensal(e) }}
                style={styles.input} />

            <TextInput
                placeholder="CPF"
                placeholderTextColor="black"
                KeyboardType='number'
                value={cpf}
                onChangeText={(e) => { setCpf(e) }}
                style={styles.input} />

            <View style={{display: 'flex', justifyContent: 'space-evenly', }}>
                <Text style={{ fontWeight: 300, fontSize: 16, color: 'black'}}>
                   Escolha o limite do seu cartão
                </Text>
                <TextInput
                    placeholder="Limite"
                    placeholderTextColor="black"
                    KeyboardType='number'
                    value={limite}
                    onChangeText={(e) => { setLimite(e) }}
                    style={styles.input} />
            </View>

            <Pressable onPress={solicitarCartao}>
                <BotaoAvancar texto='Avançar'  validacao={validarCampos}/>
            </Pressable>
            
        </View>
    )
}