import { View, Text, ImageBackground, TextInput, Pressable } from "react-native";
import styles from './styles'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import BotaoLogin from "../../components/botaoLogin";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { FancyAlert } from 'react-native-expo-fancy-alerts';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('');
   
    const goCadastro = () => {
        navigation.navigate("Cadastro")
    }

    const logar = async () => {
        //LEMBRAR DE TROCAR A URL SE FOR RODAR EM OUTRO PC OU SE O IP DO PC ATUAL TROCAR (MUDAR O IP) LEMBRAR DE RODAR O BACKEND COM O IP E A PORTA
        axios.post("http://10.109.72.4:8000/auth/jwt/create",{ email: email, password: senha})
        .then((response) => {
            
            console.log(response)
            if (response.status === 200) {
              // Salvar token no AsyncStorage
              AsyncStorage.setItem("token", response.data.access);
              // Redirecionar para a página Home
              navigation.navigate("Home")
            }
        })
        .catch (err => {
            if (err.response.status === 401) {
                alert('E-mail ou senha incorretos!')  
            }else{
                alert('nao foi possível logar')
            }
        })  
    }
    

    return (
        <View style={styles.container}>
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
                            <Pressable onPress={() => logar(email,senha)} >
                                <BotaoLogin texto='Logar' />
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