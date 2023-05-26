import { View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import BotaoAvancar from "../../components/botaoAvancar";
import styles from './styles'
import BotaoPagar from "../../components/botaoPagar";
import { useSession } from "../home";

export default function TransacaoConta(navigation) {
    const { user } = useSession(navigation);
    const [nomeRecebedor, setNomeRecebedor] = useState("")

    const [camposValidados, setCamposValidados] = useState(false)
    const [campoPagamentoValidado, setCampoPagamentoValidado] = useState(false)

    const [sessaoInfosConta, setSessaoInfosConta] = useState(true)
    const [sessaoPagamento, setSessaoPagamento] = useState(false)

    const [agencia, setAgencia] = useState(0)
    const [conta, setConta] = useState(0)
    const [valorTranferencia, setValorTransferencia] = useState(0)

    useEffect(() => {
        if (agencia == "" || conta == ""){
            setCamposValidados(false)
        }else{
            setCamposValidados(true)
        }
    }, [agencia, conta])

    useEffect(() => {
        if (valorTranferencia == ""){
            setCampoPagamentoValidado(false)
        }else{
            setCampoPagamentoValidado(true)
        }
    }, [valorTranferencia])


    function verificarConta(){
        // CRIAR LÓGICA PARA PESQUISAR NO BANCO DE DADOS SE EXISTE UM USUÁRIO COM ESSA AGENCIA E CONTA
        axios.get(`https://${ip}/contas/info-conta/?agencia=${agencia}&numero_conta=${conta}`)
        //erros e acertos
        
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                Dados bancários
            </Text>

            {/* pesquisar no banco de dados se existe algum usuário com os dados bancários a seguir e realizar a transação caso exista*/}
            {sessaoInfosConta && (
                <View>
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
                    <Pressable disabled={!camposValidados} onPress={verificarConta}>
                        <BotaoAvancar texto='Avançar' validacao={camposValidados}/>
                    </Pressable>
                </View>
            )}
            
            {sessaoPagamento && (
                <View style>
                    {/* COLOCAR O NOME DO USUÁRIO DA CONTA DESTINATÁRIA */}
                    <Text>Transferir para: {nomeRecebedor}</Text>
                    <View style={{display: 'flex', flexDirection: "row", justifyContent: 'space-around', alignItems: 'center',}}>
                        <TextInput
                            placeholder="Valor da transferência"
                            placeholderTextColor="black"
                            KeyboardType='number'
                            value={valorTranferencia}
                            onChangeText={(e) => { setValorTransferencia(e) }}
                            style={styles.input} />

                        <Pressable disabled={!campoPagamentoValidado} style={{ margin: 24}}>
                            <BotaoPagar validacao={campoPagamentoValidado} icone={"paper-plane"}/>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    )
}
