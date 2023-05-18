import { View, Text, Pressable,  } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import BotaoAvancar from "../../components/botaoAvancar";
import styles from './styles'
import { useEffect } from "react";
// import { FancyAlert } from 'react-native-expo-fancy-alerts';


export default function Emprestimo() {
    //puxar saldo real do usuario
    const saldoConta = 1234
    const [camposValidados, setCamposValidados] = useState(false)

    const [valorEmprestado, setValorEmprestado] = useState(0)
    const [mesesPagar, setMesesPagar] = useState(1)
    const [valorParcela, setValorParcela] = useState(0)
    const [totalPagarJuros, setTotalPagarJuros] = useState()
    const [porcentagemJuros, setPorcentagemJuros] = useState()

    const [botaoHabilitado, setBotaoHabilitado] = useState(true)

    //variáveis do fancy alert
    const [visibleSucesso, setVisibleSucesso] = useState(false);
    const [visibleErro, setVisibleErro] = useState(false);
    
    //função pra fechar o alerta
    const handleCloseAlert = () => {
        setVisibleSucesso(false);
        setVisibleErro(false);
        setValorEmprestado('')
        setMesesPagar('')
        setValorParcela('')
        setTotalPagarJuros('')
        setPorcentagemJuros('')

      };

    
    //criar função que desabilita o clique do botao quando ele está com os campos não preenchidos, e arrumar o preenchimento

    function solicitarEmprestimo(){
        if (valorEmprestado > saldoConta*3 ){
            //setVisibleErro(true)
            alert('Não foi possível solicitar o empréstimo!')
        }
        else{
            //setVisibleSucesso(true)
            alert('Seu empréstimo foi solicitado com sucesso!')

            //fazer os campos ficarem vazios após o empréstimo ter sido solicitado
            // setValorEmprestado()
            // setMesesPagar()
            // setValorParcela()
            // setTotalPagarJuros()
            // setPorcentagemJuros()
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
            valorParcelaComJuros = parseFloat(totalPagarComJuros) / parseFloat(mesesPagar)
            let calcPJ = parseFloat(totalPagarComJuros) / parseFloat(mesesPagar)
            setValorParcela(calcPJ)
        }
    }, [valorEmprestado, mesesPagar])

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                Solicitar empréstimo
            </Text>

            {/* ALERTA DE FOI POSSÍVEL SOLICITAR EMPRÉSTIMO */}
            {/* <FancyAlert
                visible={visibleSucesso}
                icon={<View style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
                borderRadius: 50,
                width: '100%',
                }}>
                <Text>✔</Text></View>}
                style={{ backgroundColor: 'white' }}>
                <Text style={{ marginTop: -16, marginBottom: 32 }}>Seu empréstimo foi solicitado com sucesso!</Text>
                <Pressable onPress={handleCloseAlert}>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        backgroundColor: 'green',
                        borderRadius: 12,
                    }}>
                        <Text style={{ color: '#FFF' }}>Aguardar análise</Text>
                    </View>
                </Pressable>
            </FancyAlert> */}

            {/* ALERTA DE NÃO FOI POSSÍVEL SOLICITAR EMPRÉSTIMO */}
            {/* <FancyAlert
                visible={visibleErro}
                icon={<View style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                borderRadius: 50,
                width: '100%',
                }}>
                <Text>✖</Text></View>}
                style={{ backgroundColor: 'white' }}>
                <Text style={{ marginTop: -16, marginBottom: 32 }}>Seu empréstimo foi negado devido a discrepâncias na sua conta bancária!</Text>
                <Pressable onPress={handleCloseAlert}>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        backgroundColor: 'red',
                        borderRadius: 12,
                    }}>
                        <Text style={{ color: '#fff' }}>Tente novamente mais tarde</Text>
                    </View>
                </Pressable>
            </FancyAlert> */}

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
                    Total a pagar com juros: R$ <Text style={{fontWeight: 700, color: 'green'}}>{totalPagarJuros}</Text>
                </Text>
            </View>

            <View style={styles.input}>
                <Text style={{color: 'grey'}}>
                    Valor das parcelas: <Text style={{fontWeight: 700, color: 'green'}}> {parseFloat(valorParcela.toFixed(2))}</Text>
                </Text>
            </View>
            <Pressable onPress={solicitarEmprestimo} >
                <BotaoAvancar texto='Avançar'  validacao={camposValidados} />
            </Pressable>
        </View>
    )
}
