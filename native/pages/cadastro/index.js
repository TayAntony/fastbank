import { View, Text, Alert, Image, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import styles from './styles'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import BotaoGoogle from "../../components/botaoGoogle";
import BotaoLogin from "../../components/botaoLogin";
import Seta from "../../components/seta";


export default function Cadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('');
    const [errou, setErrou] = useState(false)
    

    const btnCadastro = async () => {
        try{
            await firebase.auth().createUserWithEmailAndPassword(email, senha);
            const user = firebase.auth().currentUser;
            await user.updateProfile({
                displayName: nome
            });
            Alert.alert("Você foi cadastrado com sucesso!")
        } catch(error){
            Alert.alert("Esse e-mail já pertence a um usuário...")
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
            <View>
                <View>
                    <Seta/>
                    <Text style={styles.txt1}>Preencha com seus dados para efetuar o cadastro!</Text>
                </View>
                <View style={styles.card}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        
                        <View style={styles.iconeInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite seu nome"
                                    
                                    value={nome}
                                    onChange={(e) => {setNome(e)}}
                                />
                                <MaterialCommunityIcons name={'account'} size={15} color={'#fff'} style={styles.icone} />
                        </View>

                        <View style={styles.iconeInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu E-mail"
                                KeyboardType='email'
                                value={email}
                                onChange={(e) => {setEmail(e)}}
                            />
                            <MaterialCommunityIcons name={'email'} size={15} color={'#fff'} style={styles.icone} />
                        </View>

                        <View style={styles.alinhar}>
                            <View style={styles.iconeInput}>
                                <TextInput secureTextEntry={true}
                                    style={styles.input} placeholder="Digite sua senha"
                                    value={senha}
                                    onChange ={(e) => { setSenha(e) }}   
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

                        <BotaoLogin texto="Cadastrar" onPress={() => btnCadastro(nome,email, senha)}/>
                        <BotaoGoogle texto='Cadastrar com Google' onPress={() => btnGoogle()}/>
                    </View>
                </View>
            </View>

        </View>
    )
}