import { View, Text, Pressable,  } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import BotaoAvancar from "../../components/botaoAvancar";
import styles from './styles'
import { useEffect } from "react";
import { useSession, ip } from "../home";


export default function Emprestimo(navigation) {
    const { user } = useSession(navigation);
    
    const [camposValidados, setCamposValidados] = useState(false)

    const [valorEmprestado, setValorEmprestado] = useState(0)
    const [mesesPagar, setMesesPagar] = useState(0)
    const [valorParcela, setValorParcela] = useState(0)
    const [totalPagarJuros, setTotalPagarJuros] = useState(0)
    const [porcentagemJuros, setPorcentagemJuros] = useState(0)

    function solicitarEmprestimo(){
        if (valorEmprestado > 10000){
            alert('Sua conta não cumpre os requisitos para solicitar um empréstimo desse porte!')
        }
        else{
            alert('Seu empréstimo foi solicitado com sucesso!')
        }
    }

    useEffect(() => {
        let valorJuros = 0
        if (valorEmprestado == "" || mesesPagar == ""){
            setCamposValidados(false)
        }else{
            setCamposValidados(true)
            
            if(valorEmprestado < 1000 ){
                valorJuros = (valorEmprestado / 100) * 5
                setPorcentagemJuros(5)
            }else if(valorEmprestado > 1000 && valorEmprestado < 5000){
                valorJuros = (valorEmprestado / 100) * 10
                setPorcentagemJuros(10)
            }
            else if(valorEmprestado > 5000 && valorEmprestado < 15000){
                valorJuros = (valorEmprestado / 100) * 15
                setPorcentagemJuros(15)
            }
            else if(valorEmprestado > 15000 && valorEmprestado < 50000){
                valorJuros = (valorEmprestado / 100) * 25
                setPorcentagemJuros(25)
            }
            else if(valorEmprestado > 50000 && valorEmprestado < 200000){
                valorJuros = (valorEmprestado / 100) * 30
                setPorcentagemJuros(30)
            }
    
            else if(valorEmprestado > 200000){
                valorJuros = (valorEmprestado / 100) * 40
                setPorcentagemJuros(40.0)
            }
 
            //somando o valor emprestado com o juros
            let totalPagarComJuros = parseInt(valorEmprestado) + parseInt(valorJuros)

            //passando para o total a pagar com juros
            setTotalPagarJuros(totalPagarComJuros)

            //passando o valor da parcela com juros dividido pela quantidade de meses
            let calcPJ = parseFloat(totalPagarComJuros) / parseFloat(mesesPagar)
            setValorParcela(calcPJ)
        }
    }, [valorEmprestado, mesesPagar])

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
                        %juros  <Text style={{fontWeight: 700, color: 'green'}}> {porcentagemJuros}</Text>
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
                    Total a pagar com juros: R$ <Text style={{fontWeight: 700, color: 'green'}}>{totalPagarJuros.toFixed(2)}</Text>
                </Text>
            </View>

            <View style={styles.input}>
                <Text style={{color: 'grey'}}>
                    Valor das parcelas: <Text style={{fontWeight: 700, color: 'green'}}> {parseFloat(valorParcela.toFixed(2))}</Text>
                </Text>
            </View>
            <Pressable disabled={!camposValidados} onPress={solicitarEmprestimo} >
                <BotaoAvancar texto='Avançar'  validacao={camposValidados} />
            </Pressable>
        </View>
    )
}
