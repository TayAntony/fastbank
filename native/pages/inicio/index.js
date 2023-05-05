import {
    View,
    Text,
    useWindowDimensions,
    Image, ImageBackground
} from "react-native";
import { StatusBar } from 'react-native';
import styles from './styles'
import React, { useState } from 'react';
import BotaoLogin from "../../components/botaoLogin";
import { Pressable } from "react-native";

export default function Inicio({ navigation, props }) {
    const [tela, setTela] = useState(useWindowDimensions())

    function login() {
        navigation.navigate('Login')
    }
    function cadastro() {
        navigation.navigate('Cadastro')
    }
    return (
        
        <View style={styles.container}>
            <StatusBar
                barStyle = "dark-content"
                hidden = {true}
                networkActivityIndicatorVisible = {true}
/>
            <ImageBackground
                source={require('../../assets/fundo.png')}
                style={{ width: tela.width, height: tela.height, justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
                blurRadius={6}
            >
                <View style={{ width: tela.width - 0.2 * tela.width, height: tela.height - 0.1 * tela.height }}>
                    <View style={{ width: tela.width }}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo}></Image>
                        <Text style={styles.slogan}>
                            Onde você faz acontecer!
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.txt1}>Olá, seja bem vindo(a) ao ToDo, minha plataforma de Digital Bank! </Text>
                        <Pressable onPress={cadastro}>
                            <BotaoLogin texto={"Sou novo"} />
                        </Pressable>

                        <Pressable onPress={login} >
                            <Text style={styles.link}>Já possui uma conta?</Text>
                        </Pressable>

                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}