import {
    View,
    Text,
    useWindowDimensions,
    Image, ImageBackground
} from "react-native";
// import { BlurView, VibrancyView } from "@react-native-community/blur";

import styles from './styles'
import React, { useState } from 'react';
import BotaoLogin from "../../components/botaoLogin";
import { TouchableOpacity } from "react-native-web";

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
                        <TouchableOpacity onPress={cadastro}>
                            <BotaoLogin texto="Sou novo" />
                        </TouchableOpacity>

                        <Text onPress={login} style={styles.link}>
                            Já possui uma conta?
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}