import { View, Text, Pressable } from "react-native";
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import BotoesFormaPagamento from "../../components/botoesFormaPagamento";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from "@react-navigation/native";

export const ip = "http://192.168.1.8:8000"
// todobank.azurewebsites.net

export function useSession(navigation) {
    const [user, setUser] = useState({
        nome_cliente: "Carregando...",
        conta: { 
            saldo: "Carregando...",
            numero_conta: "Carregando...",
            digito: "Carregando...",
            agencia: "Carregando...",
        },
        email: "Carregando...",
        cpf_cnpj: "Carregando...",
        data_nascimento_criacao: "Carregando...",
        foto: "Carregando...",
    });

    useFocusEffect(() => {
        AsyncStorage.getItem("token")
            .then(token => {
                if (!token) {
                    alert('Oops você não está logado!');
                    return navigation.navigate('Login');
                }

                axios.get(`${ip}/auth/users/me/`, {
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                })
                .then(res => {
                    axios.get(`${ip}/contas/conta/${res.data.id}/`)
                    .then(resConta => {
                        setUser({...res.data, conta: {...resConta.data}});
                    })
                })
            })
    });

    return { user };
}

export default function Home({ navigation }) {
    const { user } = useSession(navigation);
    async function login() {
        await AsyncStorage.removeItem("token");
        navigation.navigate('Login')
    }
    function perfil() {
        navigation.navigate('Perfil')
    }
    const [olhoAberto, setOlhoAberto] = useState(false)

    const verExtrato = () => {
        navigation.navigate('Extrato')
    }

    function transacao() {
        navigation.navigate('Transacao')
    }



    function qrCode() {
        alert('qrcode')
    }
    function boleto() {
        alert('boleto')
    }



    function pedirCartao() {
        navigation.navigate('Cartao')
    }
    function emprestimos() {
        navigation.navigate('Emprestimo')
    }
    function cashback() {
        alert('Operação indisponível no momento!')
    }
    function pix() {
        alert('Operação indisponível no momento!')
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    style={{
                        width: '100%',
                        flex: 1,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,

                    }}
                    colors={['#E30044', '#6A3A90']}
                    start={{ x: 2, y: 0 }}
                    end={{ x: 0, y: 2 }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: 30,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Pressable onPress={perfil}>
                                <FontAwesome name={'user-circle-o'} size={40} color={'#fff'} />
                            </Pressable>
                            <Text style={{ marginLeft: 10, color: 'white' }}>
                                {user.nome_cliente.toUpperCase()}
                            </Text>
                        </View>
        
                        <View style={styles.icon}>
                            <Pressable onPress={login}>
                                <FontAwesome name={'sign-out'} size={30} color={'#fff'} />
                            </Pressable>
                        </View>
                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        backgroundColor: 'white',
                        alignContent: 'center',
                        marginLeft: 28,
                        marginRight: 28,
                        borderRadius: 12,
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: 30,
                            justifyContent: 'space-evenly',
                            alignItems: 'baseline'
                        }}>
                            <Text style={{ margin: 6 }}>
                                Saldo em conta
                            </Text>
                            <Text style={{ margin: 6 }}>
                                {/* COLOCAR toFixed NO SALDO */}
                                R$ {olhoAberto ? user.conta.saldo.toFixed(2) : "*******"}
                            </Text>
                        </View>

                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: 28
                        }}>
                            <Pressable onPress={() => setOlhoAberto(!olhoAberto)}
                                style={{ alignItems: 'flex-end', margin: 6 }}>
                                <FontAwesome name={olhoAberto ? 'eye' : 'eye-slash'} size={20} color={'#000'} />
                            </Pressable>
                            <Pressable style={{
                                height: 40,
                                width: 100,
                                borderStyle: 'solid',
                                borderColor: 'white',
                                borderRadius: 12,
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#E1E1E1',
                                padding: 9,
                                margin: 6
                            }}
                                onPress={() => verExtrato()}>
                                <Text style={{ fontWeight: 700 }}>Extrato</Text>
                            </Pressable>
                        </View>
                    </View>

                </LinearGradient>
            </View>

            <View style={{ flex: 0.2 }}>
                <View style={{ margin: 12 }}>
                    <Text style={{ fontWeight: 700, fontSize: 16, }}>
                        Formas de pagamento
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Pressable onPress={emprestimos}>
                            <BotoesFormaPagamento icone='money' texto='Empréstimo' />
                        </Pressable>
                        {/* criar a tela de scanear o qrcode e boleto e descontar do saldo o valor do pagamento */}
                        <Pressable onPress={qrCode}>
                            <BotoesFormaPagamento icone='qrcode' texto='QR Code' />
                        </Pressable>
                        <Pressable onPress={boleto}>
                            <BotoesFormaPagamento icone="barcode" texto='Boleto' />
                        </Pressable>
                        <Pressable onPress={transacao}>
                            <BotoesFormaPagamento icone='users' texto='Pagar Pessoas' />
                        </Pressable>
                    </View>
                </View>

                <View style={{ margin: 12 }}>
                    <Text style={{ fontWeight: 700, fontSize: 16, }}>
                        Seus cartões
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                         {/* puxar o cartão se tiver sido solicitado pelo site, ou se tiver sido solicitado com sucesso pelos botões do app */}

                        <Text style={{ fontWeight: 500, fontSize: 16, }}>
                            Você não possui nenhum cartão!
                        </Text>
                        <Pressable onPress={pedirCartao}>
                            <BotoesFormaPagamento icone='plus' texto='' />
                        </Pressable>
                    </View>
                </View>

                <View style={{ margin: 12 }}>
                    <Text style={{ fontWeight: 700, fontSize: 16, }}>
                        Sugestões para você!
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 20}}>
                        <Pressable onPress={pix}>
                            <BotoesFormaPagamento icone='paypal' texto='Pix' />
                        </Pressable>
                        <Pressable onPress={pedirCartao}>
                            <BotoesFormaPagamento icone="credit-card" texto='Pedir cartão' />
                        </Pressable>
                        <Pressable onPress={cashback}>
                            <BotoesFormaPagamento icone='arrow-down' texto='Cashback' />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}