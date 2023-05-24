import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import BotaoAvancar from "../../components/botaoAvancar";
import styles from './styles'
import { useEffect } from "react";
import { BottomSheet } from "react-native-bottom-sheet";

export default function Transacao({navigation}) {
    const [listaDestinatarios, setListaDestinatarios] = useState([])
    const [camposValidados, setCamposValidados] = useState(false)
    const [modalVisivel, setModalVisivel] = useState(false)

    const [chaveTransferencia, setChaveTransferencia] = useState('')
    

    const abrirModalPagamento = () => {
        setModalVisivel(true)
    }
    const fecharModelPagamento = () => {
        setModalVisivel(false)
    }

    useEffect(() => {
        if (chaveTransferencia == ""){
            setCamposValidados(false)
        }else{
            setCamposValidados(true)
        }
    })


    const modalPagamento = ({isVisible, onClose}) => {
        const [valorPagamento, setValorPagamento] = useState('')

        const processarPagamento = ()=> {
            alert('valor do pagamento', valorPagamento);
            fechar();
        }
    }

    function transferir (){
        alert("tentando transferir")
    }

    
    function transacaoConta(){
        navigation.navigate('Transacao Conta')
    }
    
    
    return(
        <View style={styles.container}>

            {/* CONSERTAR O MODEL PARA DIGITAR O VALOR DO PAGAMENTO */}
            {/* <BottomSheet
                isVisible={isVisible}
                onClose={onClose}
            >
                <View>
                    <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                        Digite o valor do pagamento
                    </Text>
                    <TextInput
                        placeholder="R$ "
                        placeholderTextColor="black"
                        KeyboardType='text'
                        value={valorPagamento}
                        onChangeText={(e) => setValorPagamento(e)}
                        style={{backgroundColor: '#E9FFF2',
                         padding: 12,
                         width: '80%',
                         marginTop:24,
                         borderBottomLeftRadius: 0,
                         borderBottomRightRadius: 0,
                         borderWidth: 2,
                         borderColor: '#E9FFF2',
                         borderBottomColor: 'black',
                         borderStyle: "solid", 
                         }}/>
                         <Text>
                            Saldo dispoível: R$ 
                         </Text>
                         <Pressable onPress={fecharModelPagamento}>
                             <BotaoAvancar texto="Confirmar valor"/>
                         </Pressable>
                </View>
            </BottomSheet> */}

            
            <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                Transação
            </Text>
             {/* pesquisar no banco de dados se existe algum usuário com aquela chave de transferência, descontar do saldo se existir e aumentar o saldo do outro usuário */}
            <TextInput
                 placeholder="CPF ou e-mail"
                 placeholderTextColor="black"
                 KeyboardType='text'
                 value={chaveTransferencia}
                 onChangeText={(e) => {setChaveTransferencia(e)}}
                 style={{backgroundColor: '#E6E6E6',
                         padding: 12,
                         width: '80%',
                         marginTop:24,
                         borderBottomLeftRadius: 0,
                         borderBottomRightRadius: 0,
                         borderWidth: 2,
                         borderColor: '#E6E6E6',
                         borderBottomColor: 'black',
                         borderStyle: "solid", 
                         }}/>
            <Pressable onPress={transacaoConta}>
                <Text style={{color:'#949494', fontSize: 12, }}>
                    Não tem chave? Use os dados de agência e conta.
                </Text>
            </Pressable>

            <Pressable disabled={!camposValidados} onPress={abrirModalPagamento}>
                <BotaoAvancar texto='Avançar' validacao={camposValidados} />
            </Pressable>
        </View> 
    )
}