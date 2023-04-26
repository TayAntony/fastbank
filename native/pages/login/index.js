import { View, Text, Alert, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import styles from './styles'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import BotaoGoogle from "../../components/botaoGoogle";
import BotaoLogin from "../../components/botaoLogin";
import Seta from "../../components/seta";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";


export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('');
    const [errou, setErrou] = useState(false)



    const btnLogin = (email, senha) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                navigation.navigate('Home')
                Alert.alert("Usuário logado com sucesso!")
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                Alert.alert("Credenciais incorretas...")
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }
    const btnGoogle = () => {
        console.log('tentou cadastrar com google')

    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/fundo.png')}
                style={{ width: 800, height: 840, position: 'absolute' }}
            />
            <View>
                <View>
                    <Seta />
                    <Text style={styles.txt1}>Insira suas informações para realizar o login </Text>
                </View>
                <View style={styles.card}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={styles.iconeInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu E-mail"
                                KeyboardType='email'
                                value={email}
                                onChangeText={(e) => { setEmail(e) }}
                            />
                            <MaterialCommunityIcons name={'email'} size={15} color={'#fff'} style={styles.icone} />
                        </View>
                        <View style={styles.alinhar}>
                            <View style={styles.iconeInput}>
                                <TextInput secureTextEntry={true}
                                    style={styles.input} placeholder="Digite sua senha"
                                    onChangeText={(e) => { setSenha(e) }}
                                    value={senha}
                                />
                                <Ionicons name={'eye'} size={15} color={'#fff'} style={styles.icone} />
                            </View>
                        </View>
                        <Text style={styles.esqueceuSenha}>
                            Esqueceu sua senha?
                        </Text>
                        <TouchableOpacity onPress={() => btnLogin(email,senha )} style={styles.botao} >
                            <BotaoLogin texto='Logar' />
                        </TouchableOpacity>
                        <BotaoGoogle texto='Logar com Google' onPress={() => btnGoogle()} />
                    </View>
                </View>
            </View>

        </View>
    )
}