import { View, Text, ImageBackground, TextInput, TouchableOpacity, Pressable } from "react-native";
import styles from './styles'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import BotaoLogin from "../../components/botaoLogin";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FancyAlert } from 'react-native-expo-fancy-alerts';


export default function Login({ navigation }) {
    const [username, setUsername] = useState('')
    const [senha, setSenha] = useState('');
    const [visibleSucesso, setVisibleSucesso] = useState(false);
    const [visibleErro, setVisibleErro] = useState(false);
    const [visibleLogin, setVisibleLogin] = useState(false);

    //função para fechar o alerta quando apertar no botão
    const handleCloseAlert = () => {
        setVisibleSucesso(false);
        setVisibleErro(false);
        setVisibleLogin(false);
      };

    const logar = async () => {
        
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/jwt/create",{ username: username, password: senha }
            );
            alert('fez a requisição')
      
            if (response.status === 200) {
                setVisibleSucesso(true) // mostrar alerta de logado com sucesso
              // Salvar token no AsyncStorage
              await AsyncStorage.setItem("token", response.data.access);
      
              // Redirecionar para a página Home
              navigation.navigate("Home")
            }
          } catch (err) {
            console.log(err);
      
            if (err.response.status === 401) {
                setVisibleErro(true) // mostrar alerta de senha/email incorretos
              
            }setVisibleLogin(true)
          }
        }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/fundo.png')}
                style={{ width: 800, height: 840, position: 'absolute' }}
            />

            {/* ALERTA DE NÃO FOI POSSÍVEL REALIZAR O LOGIN */}
            {/* <FancyAlert
                visible={visibleLogin}
                icon={<View style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                borderRadius: 50,
                width: '100%',
                }}>
                <Text>💤</Text></View>}
                style={{ backgroundColor: 'white' }}>
                <Text style={{ marginTop: -16, marginBottom: 32 }}>Não foi possível realizar o login!</Text>
                <TouchableOpacity onPress={handleCloseAlert}>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        backgroundColor: 'red',
                        borderRadius: 12,
                    }}>
                        <Text style={{ color: '#FFF' }}>Tente novamente mais tarde</Text>
                    </View>
                </TouchableOpacity>
            </FancyAlert> */}

            {/* ALERTA DE LOGADO COM SUCESSO */}
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
                <Text style={{ marginTop: -16, marginBottom: 32 }}>Parabéns! Logado com sucesso</Text>
                <TouchableOpacity onPress={handleCloseAlert}>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        backgroundColor: '#007AFF',
                        borderRadius: 12,
                    }}>
                        <Text style={{ color: '#FFF' }}>OK</Text>
                    </View>
                </TouchableOpacity>
            </FancyAlert> */}

            {/* ALERTA DE SENHA/USUARIO INCORRETO */}
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
                <Text>❕</Text></View>}
                style={{ backgroundColor: 'white' }}>
                <Text style={{ marginTop: -16, marginBottom: 32 }}>Usuário ou senha incorretos</Text>
                <TouchableOpacity onPress={handleCloseAlert}>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        backgroundColor: 'red',
                        borderRadius: 12,
                    }}>
                        <Text style={{ color: '#FFF' }}>Tentar novamente!</Text>
                    </View>
                </TouchableOpacity>
            </FancyAlert> */}

            <View>
                {/* <Text style={styles.txt1}>Insira suas informações para realizar o login </Text> */}
            
                <View style={styles.card}>
                    <View style={{ flex: 1, alignItems: 'center' }}>

                            {/* INPUT DIGITAR USUÁRIO */}
                        <View style={styles.iconeInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu usuário"
                                placeholderTextColor="gray"
                                KeyboardType='text'
                                value={username}
                                onChangeText={(e) => { setUsername(e) }}
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

                        <View style={{display: 'flex', alignItems: 'center', gap: 24}}>
                            <Pressable onPress={() => logar(username,senha)} >
                                <BotaoLogin texto='Logar' />
                            </Pressable>
                            <Text style={styles.esqueceuSenha}>
                                Não possui uma conta? <Text style={{color: 'red'}}>Cadastre-se</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    )
}