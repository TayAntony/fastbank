import { View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import BotaoAvancar from "../../components/botaoAvancar";
import styles from './styles'
import BotaoPagar from "../../components/botaoPagar";
import { useSession, ip } from "../home";
import axios from 'axios';

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


    const verificarConta = async ()  => {
        try{
            const response = await axios.get(`${ip}/contas/info-conta/?agencia=${agencia}&numero_conta=${conta}`)

            if (response.status===200){
                setSessaoInfosConta(false)
                setSessaoPagamento(true)
                setNomeRecebedor(response.data.nome)
            }
        } catch (err){
            if (err.response && err.response.status === 401 || err.response.status === 404) {
                alert('Não existe nenhuma conta com essas informações!')  
            }else{
                alert('Não foi possível completar a transação!')
            }
        }    
    }

    const transferir = async () => {
        try {
            const response = await axios.post(`${ip}/contas/movimentacao/`, {numero_conta: conta, agencia, valor: valorTranferencia, id_conta_sender: user.conta.id})

            if(response.status === 202){
                // redirecionar efetivamente para a home
                alert("Transação realizada com sucesso!")
                navigation.navigate("Home")
                
                
            }

        }catch (err){
            if (err.response.status === 403){
                alert("Saldo insuficiente!")
            }else{
                console.log(err.response.status)
                alert("Não foi possível realizar a transação")
            }
        }
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                Dados bancários
            </Text>
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
                        placeholder="Número da conta"
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
                    <Text>Transferir para: {nomeRecebedor.toUpperCase()}</Text>
                    <View style={{display: 'flex', flexDirection: "row", justifyContent: 'space-around', alignItems: 'center',}}>
                        <TextInput
                            placeholder="Valor da transferência"
                            placeholderTextColor="black"
                            KeyboardType='number'
                            value={valorTranferencia}
                            onChangeText={(e) => { setValorTransferencia(e) }}
                            style={styles.input} />

                        {/* VALIDAR O SALDO PARA REALIZAR A TRANSAÇÃO */}
                        <Pressable disabled={!campoPagamentoValidado} style={{ margin: 24}} onPress={transferir}>
                            <BotaoPagar validacao={campoPagamentoValidado} icone={"paper-plane"}/>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    )
}
