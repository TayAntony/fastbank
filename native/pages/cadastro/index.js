import { View, Text, Alert, Image, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import styles from './styles'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import BotaoGoogle from "../../components/botaoGoogle";
import BotaoLogin from "../../components/botaoLogin";
import Seta from "../../components/seta";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FancyAlert } from 'react-native-expo-fancy-alerts';


export default function Cadastro({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('');
    const [errou, setErrou] = useState(false)
    const [visibleSucesso, setVisibleSucesso] = useState(false);
    const [visibleUserErro, setVisibleUserErro] = useState(false);
    const [visibleEmailErro, setVisibleEmailErro] = useState(false);
    const [visibleSenhaErro, setVisibleSenhaErro] = useState(false);
    const [visibleCadastroErro, setVisibleCadastroErro] = useState(false);

    //função para fechar o alerta quando apertar no botão
    const handleCloseAlert = () => {
        setVisibleSucesso(false);
        setVisibleEmailErro(false);
        setVisibleSenhaErro(false);
        setVisibleUserErro(false);
        setVisibleCadastroErro(false)

      };
    
    const cadastrar = async () => {
        if(senha.length < 8){
            setVisibleSenhaErro(true)
            return
        }
        else if(!email.includes("@") || !email.includes(".com")){
            setVisibleEmailErro(true)
            return
        }

        try{
            const response = await axios.post("http://127.0.0.1:8000/auth/users/",{ username: username, email: email, password: senha });
    
            if (response.status === 201) {
                setVisibleSucesso(true) // mostrar alerta de cadastro efetuado com sucesso
              // Salvar token no AsyncStorage
              await AsyncStorage.setItem("token", response.data.access);

              // Redirecionar para a página de login
              navigation.navigate("Login");
                return
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 400){
                setVisibleUserErro(true)
            }else{
                setVisibleCadastroErro(true)
            }   
        }
        
    }
    const btnGoogle = ()=> {
        Alert.alert("Cadastrando com o Google...")
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/fundo.png')}
                style={{ width: 800, height: 840, position: 'absolute' }}
            />

        {/* ALERTA DE NÃO FOI POSSÍVEL REALIZAR O CADASTRO */}
        <FancyAlert
            visible={visibleCadastroErro}
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
            <Text style={{ marginTop: -16, marginBottom: 32 }}>Não foi possível realizar o cadastro!</Text>
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
        </FancyAlert>

        {/* ALERTA DE CADASTRADO COM SUCESSO E REDIRECIONANDO AO LOGIN */}
        <FancyAlert
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
            <Text style={{ marginTop: -16, marginBottom: 32 }}>Parabéns! Você foi cadastrado com sucesso</Text>
            <TouchableOpacity onPress={handleCloseAlert}>
                <View style={{
                    marginTop: 10,
                    marginBottom: 10,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    backgroundColor: '#007AFF',
                    borderRadius: 12,
                }}>
                    <Text style={{ color: '#FFF' }}>Redirecionar para o login!</Text>
                </View>
            </TouchableOpacity>
        </FancyAlert>

        {/* ALERTA DE USUÁRIO JÁ CADASTRADO */}
        <FancyAlert
            visible={visibleUserErro}
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
            <Text style={{ marginTop: -16, marginBottom: 32 }}>Usuário já cadastrado!</Text>
            <TouchableOpacity onPress={handleCloseAlert}>
                <View style={{
                    marginTop: 10,
                    marginBottom: 10,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    backgroundColor: 'red',
                    borderRadius: 12,
                }}>
                    <Text style={{ color: '#FFF' }}>Tentar novamente</Text>
                </View>
            </TouchableOpacity>
        </FancyAlert>

        {/* ALERTA DE EMAIL INVÁLIDO */}
        <FancyAlert
            visible={visibleEmailErro}
            icon={<View style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E58D0E',
            borderRadius: 50,
            width: '100%',
            }}>
            <Text>❕</Text></View>}
            style={{ backgroundColor: 'white' }}>
            <Text style={{ marginTop: -16, marginBottom: 32 }}>O E-mail digitado é inválido!</Text>
            <TouchableOpacity onPress={handleCloseAlert}>
                <View style={{
                    marginTop: 10,
                    marginBottom: 10,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    backgroundColor: '#E58D0E',
                    borderRadius: 12,
                }}>
                    <Text style={{ color: '#FFF' }}>Tente novamente</Text>
                </View>
            </TouchableOpacity>
        </FancyAlert>

        {/* ALERTA DE SENHA INVÁLIDA */}
        <FancyAlert
            visible={visibleSenhaErro}
            icon={<View style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E58D0E',
            borderRadius: 50,
            width: '100%',
            }}>
            <Text>❕</Text></View>}
            style={{ backgroundColor: 'white' }}>
            <Text style={{ marginTop: -16, marginBottom: 32}}>A senha deve conter pelo menos 8 caracteres incluindo números e letras</Text>
            <TouchableOpacity onPress={handleCloseAlert}>
                <View style={{
                    marginTop: 10,
                    marginBottom: 10,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    backgroundColor: '#E58D0E',
                    borderRadius: 12,
                }}>
                    <Text style={{ color: '#FFF' }}>Tente novamente</Text>
                </View>
            </TouchableOpacity>
        </FancyAlert>

            <View>
                <View>
                    <Seta/>
                    <Text style={styles.txt1}>Preencha com seus dados para efetuar o cadastro!</Text>
                </View>
                <View style={styles.card}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        
                        {/* INPUT DIGITAR USUÁRIO */}
                        <View style={styles.iconeInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu usuário"
                                KeyboardType='text'
                                value={username}
                                onChangeText={(e) => {setUsername(e)}}
                            />
                            <MaterialCommunityIcons name={'account'} size={15} color={'#fff'} style={styles.icone} />
                        </View>

                            {/* INPUT DIGITAR EMAIL */}
                        <View style={styles.iconeInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu E-mail"
                                KeyboardType='email'
                                value={email}
                                onChangeText={(e) => {setEmail(e)}}
                            />
                            <MaterialCommunityIcons name={'email'} size={15} color={'#fff'} style={styles.icone} />
                        </View>

                            {/* INPUT DIGITAR SENHA */}
                        <View style={styles.alinhar}>
                            <View style={styles.iconeInput}>
                                <TextInput secureTextEntry={true}
                                    style={styles.input} placeholder="Digite sua senha"
                                    value={senha}
                                    onChangeText= {(e) => { setSenha(e) }}   
                                />
                                <Ionicons name={'eye'} size={15} color={'#fff'} style={styles.icone} />
                            </View>
                        </View>

                        <View style={styles.alinharError}>
                                {errou &&
                            <Text style={styles.error}>
                                Usuário já cadastrado
                            </Text>}
                
                        </View>

                        <TouchableOpacity onPress={() => cadastrar(username,senha, email )} style={styles.botao} >
                            <BotaoLogin texto='Cadastrar' />
                        </TouchableOpacity>

                        <BotaoGoogle texto='Cadastrar com Google' onPress={() => btnGoogle()}/>
                    </View>
                </View>
            </View>

        </View>
    )
}