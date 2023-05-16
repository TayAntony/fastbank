import { View, Text, Pressable,  } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import BotaoAvancar from "../../components/botaoAvancar";
import styles from './styles'
import { useEffect } from "react";


export default function Emprestimo() {
    const [valorEmprestado, setValorEmprestado] = useState()
    const [mesesPagar, setMesesPagar] = useState()
    const [validarCampos, setValidarCampos] = useState(false)
    const [valorParcela, setValorParcela] = useState()
    const [totalPagarJuros, setTotalPagarJuros] = useState()
    const [porcentagemJuros, setPorcentagemJuros] = useState()
    //criar use state para sempre atualizar os inputs quando o usuário digitar algo (recalcular os valores)

    useEffect(() => {
        if (valorEmprestado != "" && mesesPagar != ""){
            setValidarCampos(true)
        }else{
            setValidarCampos(false)
        }
    }, [valorEmprestado, mesesPagar])

    function juros() {
        valorP = valorEmprestado / mesesPagar
        if(valorP < 1000 ){
            valorJuros = (valorP / 100) * 5
            setPorcentagemJuros = 5
        }else if(valorP > 1000 && valorP < 5000){
            valorJuros = (valorP / 100) * 10
            setPorcentagemJuros = 10
        }
        else if(valorP > 5000 && valorP < 15000){
            valorJuros = (valorP / 100) * 15
            setPorcentagemJuros = 15
        }
        else if(valorP > 15000 && valorP < 50000){
            valorJuros = (valorP / 100) * 25
            setPorcentagemJuros = 25
        }
        else if(valorP > 50000 && valorP < 200000){
            valorJuros = (valorP / 100) * 30
            setPorcentagemJuros = 30
        }
        else {
            alorJuros = (valorP / 100) * 40
            setPorcentagemJuros = 40
        }

        totalPagarJuros = valorP + valorJuros  

    }

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                Solicitar empréstimo
            </Text>

            <TextInput
                placeholder="Valor emprestado R$"
                placeholderTextColor="black"
                KeyboardType='number'
                value={valorEmprestado}
                onChangeText={(e) => { setValorEmprestado(e) }}
                style={styles.input} />

            <View style={styles.input}>
                <Text style={{color: 'grey'}}>
                    Valor das parcelas: <Text style={{fontWeight: 700, color: 'green'}}> {valorParcela}</Text>
                </Text>
                
            </View>

            <View style={{display: 'flex', flexDirection: 'row', gap:36}}>
                <TextInput
                    placeholder="Meses para pagar"
                    placeholderTextColor="black"
                    keyboardType="number"
                    value={mesesPagar}
                    onChangeText={(e) => { setMesesPagar(e) }}
                    style={styles.inputCompartilhado} />
                <View style={styles.inputCompartilhado}>
                    <Text style={{color: 'grey'}}>
                        %juros  <Text style={{fontWeight: 700, color: 'green'}}>{porcentagemJuros}</Text>
                    </Text>
                </View>
            </View>

            <View style={{
                backgroundColor: '#E9FFF2',
                padding: 12,
                width: '80%',
                marginTop:24,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderWidth: 2,
                borderColor: '#E9FFF2',
                borderBottomColor: 'black',
                borderStyle: "solid",
                }}>
                <Text style={{color: 'grey', fontWeight: 700}}>
                    Total a pagar com juros: R$ <Text style={{fontWeight: 700, color: 'green'}}>{totalPagarJuros}</Text>
                </Text>
            </View>

            <Pressable>
                <BotaoAvancar texto='Avançar'  validacao={validarCampos}/>
            </Pressable>
        </View>
    )
}
