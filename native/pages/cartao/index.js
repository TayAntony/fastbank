import { View, Text, TextInput, Pressable } from "react-native";
import styles from './styles'
import { useState } from "react";
import BotaoAvancar from "../../components/botaoAvancar";
import Slider from '@react-native-community/slider';
import { useEffect } from "react";

export default function Cartao() {
    const [rendaMensal, setRendaMensal] = useState('')
    const [limite, setLimite] = useState(0)
    const [mexeuLimite, setMexeuLimite] = useState(0)

    const [validarCampos, setValidarCampos] = useState(false)


    function mexeuNoLimite(limite){
        setLimite(limite)
    }

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


            <View style={{display: 'flex', justifyContent: 'space-around', gap: 24}}>
                <Text style={{ fontWeight: 400, fontSize: 16, color: 'black', marginTop: 48}}>
                   Escolha o limite do seu cartão: {limite.toFixed(0)}
                </Text>
                    <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>
                            R$0
                        </Text>
                        <Text>
                            R$5000
                        </Text>
                    </View>
                <Slider
                    style={{width: 315, height: 20, backgroundColor: 'white', borderRadius: 12}}
                    value={mexeuLimite}
                    onValueChange = {(limite) => mexeuNoLimite(limite)}
                    minimumValue={0}
                    maximumValue={5000}
                    thumbTintColor= "red"
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="black"
                    trackStyle = {{height: 30, borderRadius: 12}}
                    thumbStyle = {{ height: 40,
                                    width: 40,
                                    color: 'red'}}
                    
                />

            </View>

            <Pressable onPress={solicitarCartao}>
                <BotaoAvancar texto='Avançar'  validacao={validarCampos}/>
            </Pressable>
            
        </View>
    )
}
