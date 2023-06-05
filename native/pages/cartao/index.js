import { View, Text, TextInput, Pressable, Image } from "react-native";
import styles from './styles'
import { useState } from "react";
import BotaoAvancar from "../../components/botaoAvancar";
import Slider from '@react-native-community/slider';
import { useEffect } from "react";
import { useSession, ip } from "../home";
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

import chip from '../../assets/cartoes/chip.png';
import logo from '../../assets/cartoes/logo.png'
import aproximacao from '../../assets/cartoes/aproximacao.png';
import mastercard from '../../assets/cartoes/mastercard.png'


export default function Cartao(navigation) {
    const { user } = useSession(navigation);
    const [rendaMensal, setRendaMensal] = useState('')
    const [limite, setLimite] = useState(0)
    const [mexeuLimite, setMexeuLimite] = useState(0)

    const [temCartao, setTemCartao] = useState(false)

    const [bandeira, setBandeira] = useState("Mastercard")
    const [numeroCartao, setNumeroCartao] = useState("");
    const [dataVencimentoMes, setDataVencimentoMes] = useState("");
    const [dataVencimentoAno, setDataVencimentoAno] = useState("");
    const [nomeTitular, setNomeTitular] = useState("");

    const [camposValidados, setCamposValidados] = useState(false)
    const [divVisivel, setDivVisivel] = useState(false);


    function mexeuNoLimite(limite){
        setLimite(limite)
    }

    useEffect(() => {
        if (rendaMensal == "" || limite == 0){
            setCamposValidados(false)
        }else{
            setCamposValidados(true)
        }
    }, [rendaMensal, limite])

    const solicitarCartao = async () => {
        if (!user) return;
        const idUsuario = user.id;

        const res = await axios.post(`${ip}/contas/create-cartao/`, { id: idUsuario });
        console.log(res.status);

        if(rendaMensal > limite){
            if(res.status == 201 || res.status == 200){
                alert('Cartão solicitado com sucesso!')

                setNumeroCartao(res.data.cartao.numero_cartao)
                setBandeira(res.data.cartao.bandeira)
                setNomeTitular(res.data.cartao.nome)
                setDataVencimentoMes(res.data.cartao.data_vencimento_mes)
                setDataVencimentoAno(res.data.cartao.data_vencimento_ano)
                setDivVisivel(true)
            }
            else{
                alert("Não foi possível solicitar o cartão agora!")
            }
        }else{
            alert("Sua conta não cumpre os requisitos para solicitar um cartão de crédito")
        }
        
    }

    useEffect(() => {
        if (user){
            loadCard()
        }
        
    }, [user])

    const loadCard = () => {
        if (!user) return;
        axios.get(`${ip}/contas/cartao/${user.id}/`)
        .then(res => {
            setNumeroCartao(res.data.numero_cartao)
            setCvv(res.data.cvv)
            setBandeira(res.data.bandeira)
            setNomeTitular(res.data.nome)
            setDataVencimentoMes(res.data.data_vencimento_mes)
            setDataVencimentoAno(res.data.data_vencimento_ano)
            setDivVisivel(true)
        })
        .catch(_err => {})
    }
    
    return(
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

            { divVisivel == false ? <Pressable disabled={!camposValidados} onPress={solicitarCartao}>
                <BotaoAvancar texto='Avançar'  validacao={camposValidados}/>
            </Pressable> : <Text></Text>
            }

            {/* CARTÃO DEPOIS DE SOLICITADO */}
            {divVisivel && (
            <LinearGradient
                    style={{
                        width: 350,
                        flex: 0.45,
                        borderRadius: 20,
                        margin: 20
                    }}

                    colors={['#E30044', '#6A3A90']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>

                <View style={{display: 'flex', flexDirection: 'column', padding: 6, justifyContent: 'space-between', gap: 15}}>
                    
                    <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                        <Image
                        style={{width: 150, height: 40}}
                        source={logo}
                        />

                        <Text style={{color:'white', fontSize: 18, fontWeight: 700,}}>
                        CREDITO
                        </Text>
                    </View>

                    
                    
                    <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                        <Text style={{fontWeight: 700, color: 'white', fontSize: 18}}>
                            {numeroCartao}
                        </Text>
                        <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: 6}}>
                            <Image
                                style={{width: 40, height: 30}}
                                source={chip}
                            />
                            <Image
                                style={{width: 30, height: 30}}
                                source={aproximacao}
                            />
                        </View>
                    </View>

                    <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 700, color: 'white', fontSize: 16}}>
                            {nomeTitular.toUpperCase()}
                        </Text>
                        <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>

                            <View>
                                <Text style={{fontWeight: 700, color: 'white', fontSize: 14}}>
                                    Venc.
                                </Text>
                                <Text style={{fontWeight: 700, color: 'white', fontSize: 14}}>
                                    {dataVencimentoMes}/{dataVencimentoAno}
                                </Text>
                            </View>

                            <Image
                            style={{width: 62, height: 35}}
                            source={mastercard}
                            />
                        </View>
                    </View>
                
                </View>
            </LinearGradient>
            )}
            
        </View>
    )
}
