import { View, Text, ImageBackground, TextInput, Pressable } from "react-native";
import styles from './styles'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import BotaoLogin from "../../components/botaoLogin";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from "../home";
import { useEffect } from "react";
import { Timer } from 'react-native-stopwatch-timer'


export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('');

    const [senhaIncorreta, setSenhaIncorreta ] = useState(2)
    const [contaBloqueada, setContaBloqueada] = useState(false)
    const [duracaoBloqueio, setDuracaoBloqueio] = useState(5000)
    const [resetTimer, setResetTimer] = useState(false)

    const [camposValidados, setCamposValidados] = useState(false)


    useEffect(() => {
    if (email == "" || senha == ""){
        setCamposValidados(false)
    }else{
        setCamposValidados(true)
    }}, [email, senha])
   
    const goCadastro = () => {
        navigation.navigate("Cadastro")
    }
    

    const logar = async () => {
        console.log("iniciando logar")
        try {
            const response = await axios.post(`${ip}/auth/token/login`,{ email: email, password: senha});
            console.log("request ok")

            if (response.status === 200) {
            // Salvar token no AsyncStorage
            await AsyncStorage.setItem("token", response.data.auth_token);
            alert("Login realizado com sucesso!")
            // Redirecionar para a página Home
            navigation.navigate("Home")
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert('Não foi possível logar')
            }else{
                alert(`E-mail ou senha incorretos! ${senhaIncorreta} tentativas restantes`)
                setSenhaIncorreta(senhaIncorreta-1)
                if (senhaIncorreta === 0) {
                    setContaBloqueada(true)
                }
                return
            }
        }
    }
    
    return (
        <View style={styles.container}>
            {contaBloqueada && (
                <Timer
                totalDuration={duracaoBloqueio}
                msecs
                start={contaBloqueada}
                reset={resetTimer}
                handleFinish={() => {
                    alert('Acesso desbloqueado');
                    setContaBloqueada(false)
                    setSenhaIncorreta(2)
                }}
                getTime={(time) => {
                    alert(`Conta bloqueada por ${time} segundos...`);
                }}
                
            />
            )}
            

            <ImageBackground
                source={require('../../assets/fundo.png')}
                style={{ width: 800, height: 840, position: 'absolute' }}
            />
            
            
            <View>
                <Text style={styles.txt1}>Insira suas informações para realizar o login </Text>
            
                <View style={styles.card}>
                    <View style={{ flex: 1, alignItems: 'center' }}>

                            {/* INPUT DIGITAR USUÁRIO */}
                        <View style={styles.iconeInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu e-mail"
                                placeholderTextColor="gray"
                                KeyboardType='text'
                                value={email}
                                onChangeText={(e) => { setEmail(e) }}
                            />
                            <MaterialCommunityIcons name={'account'} size={15} color={'#fff'} style={styles.icone} />
                        </View>

                            {/* INPUT DIGITAR SENHA */}
                        <View style={styles.alinhar}>
                            <View style={styles.iconeInput}>
                                <TextInput secureTextEntry={true}
                                    style={styles.input} 
                                    placeholder="Digite sua senha"
                                    placeholderTextColor="gray"
                                    value={senha}
                                    onChangeText={(e) => { setSenha(e) }}
                                    
                                />
                                <Ionicons name={'eye'} size={15} color={'#fff'} style={styles.icone} />
                            </View>
                        </View>


                        <Text style={styles.esqueceuSenha}>
                            Esqueceu sua senha?
                        </Text>

                        <View style={{display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'space-between'}}>
                            <Pressable disabled={!camposValidados} onPress={() => logar()} >
                                <BotaoLogin texto='Logar' validacao={camposValidados}/>
                            </Pressable>
                            <View style={{display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexDirection: 'row'}}>

                                <Text style={{fontSize: 12,
                                              color: 'grey',
                                              fontWeight: 700,
                                              
                                              }}>
                                    Não possui uma conta?
                                </Text>
                                <Pressable onPress={goCadastro}>
                                        <Text style={{color: 'red', marginLeft: 10}}>Cadastre-se</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    )
}