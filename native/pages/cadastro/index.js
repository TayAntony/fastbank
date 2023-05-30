import BotaoLogin from "../../components/botaoLogin";
import axios from "axios";
import { View, ImageBackground, TextInput, Pressable } from "react-native";
import styles from './styles'
import { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from "react";
import {ip} from '../home'

export default function Cadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cep, setCep] = useState('');

    const [camposValidados, setCamposValidados] = useState(false)

    useEffect(() => {
    if (email == "" || senha == "" || cpf == "" || dataNascimento == "" || cep == "" || nome == ""){
        setCamposValidados(false)
    }else{
        setCamposValidados(true)
    }})

    const btnCadastro = async () => {
        const infoDoCadastro = { nome_cliente: nome, cpf_cnpj: cpf, email: email, data_nascimento_criacao: dataNascimento, password: senha, cep: cep }
        if (senha.length < 8) {
            alert('A senha deve ser maior que 8 caracteres')
            return
        }
        else if (!email.includes("@") || !email.includes(".com")) {
            alert('O e-mail é inválido')
            return
        } else if (cpf.length != 11) {
            alert('O CPF é inválido')
            return
        } else if (cep.length != 8) {
            alert('O CEP é inválido')
            return
        } else if (nome.length === 0) {
            alert('Digite seu nome')
            return
        } else if(dataNascimento.length != 10 || !dataNascimento.includes("-")){
            alert("Escreva a data de nascimento em um formato válido: AAAA-MM-DD")
        }

        try {
            const retornoRequisicaoCadastro = await axios.post(`${ip}/auth/users/`, infoDoCadastro)

            const idUserCadastrado = retornoRequisicaoCadastro.data.id;

            const retornoRequisicaoCriarConta = await axios.post(`${ip}/contas/create-conta/`, { id: idUserCadastrado });
            

            alert("Você foi cadastrado com sucesso e sua conta do banco criada. Aproveite!")
            navigation.navigate("Login");
            
        } catch (error) {
            if (error.response.status === 401) {
                alert("Esse E-mail já pertence a um usuário...")
            } else {
                alert("Não foi possível realizar o cadastro!")
                console.log(error.response)
            }
        }

    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/fundo.png')}
                style={{ width: 800, height: 840, position: 'absolute' }}
            />

            <View style={styles.card}>
                <View style={{ flex: 1, alignItems: 'center' }}>

                    {/* INPUT DIGITAR NOME */}
                    <View style={styles.iconeInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu nome completo"
                            placeholderTextColor="gray"
                            KeyboardType='text'
                            value={nome}
                            onChangeText={(e) => { setNome(e) }}
                        />
                        <MaterialCommunityIcons name={'account'} size={15} color={'#fff'} style={styles.icone} />
                    </View>

                    {/* INPUT DIGITAR EMAIL */}
                    <View style={styles.iconeInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu E-mail"
                            placeholderTextColor="gray"
                            KeyboardType='email'
                            value={email}
                            onChangeText={(e) => { setEmail(e) }}
                        />
                        <MaterialCommunityIcons name={'email'} size={15} color={'#fff'} style={styles.icone} />
                    </View>

                    {/* INPUT DIGITAR CPF */}
                    <View style={styles.iconeInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu CPF"
                            placeholderTextColor="gray"
                            KeyboardType='number'
                            value={cpf}
                            onChangeText={(e) => { setCpf(e) }}
                        />
                        <MaterialCommunityIcons name={'numeric'} size={15} color={'#fff'} style={styles.icone} />
                    </View>

                    {/* INPUT DIGITAR DATA DE NASCIMENTO */}
                    <View style={styles.iconeInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="AAAA-MM-DD"
                            placeholderTextColor="gray"
                            
                            value={dataNascimento}
                            onChangeText={(e) => { setDataNascimento(e) }}
                        />
                        <MaterialCommunityIcons name={'calendar-blank'} size={15} color={'#fff'} style={styles.icone} />
                        
                    </View>


                    {/* INPUT DIGITAR CEP */}
                    <View style={styles.iconeInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu CEP"
                            placeholderTextColor="gray"
                            KeyboardType='number'
                            value={cep}
                            onChangeText={(e) => { setCep(e) }}
                        />
                        <MaterialCommunityIcons name={'home'} size={15} color={'#fff'} style={styles.icone} />
                    </View>

                    {/* INPUT DIGITAR SENHA */}
                    <View style={styles.alinhar}>
                        <View style={styles.iconeInput}>
                            <TextInput secureTextEntry={true}
                                style={styles.input} placeholder="Digite sua senha"
                                placeholderTextColor="gray"
                                value={senha}
                                onChange={(e) => { setSenha(e) }}
                                onChangeText={(e) => { setSenha(e) }}
                            />
                            <MaterialCommunityIcons name={'eye'} size={15} color={'#fff'} style={styles.icone} />
                        </View>
                    </View>

                    <Pressable onPress={() => btnCadastro()} disabled={!camposValidados}>
                        <BotaoLogin texto="Cadastrar" validacao={camposValidados} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
