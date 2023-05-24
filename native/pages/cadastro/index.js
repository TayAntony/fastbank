import BotaoLogin from "../../components/botaoLogin";
import axios from "axios";
// import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { View, ImageBackground, TextInput, Pressable } from "react-native";
import styles from './styles'
import { useState } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from 'react-native-datepicker';

export default function Cadastro({ navigation }) {
    const dataAtual = new Date();

    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cep, setCep] = useState('');

    const handleNome = (text) => {
        setNome(text)
    }
    // FAZER LÓGICA QUE SEMPRE DESLOGA DO BANCO QUANDO SE FECHA O APP (USAR TOKEN?)

    const cadastrar = async () => {
        if (senha.length < 8) {
            alert('A senha deve ser maior que 8 dígitos')
            return
        }
        else if (!email.includes("@") || !email.includes(".com")) {
            alert('O e-mail é inválido')
            return
        }
    }

    const btnCadastro = async () => {
        const infoDoCadastro = { nome_cliente: nome, cpf_cnpj: cpf, email: email, data_nascimento_criacao: dataNascimento, password: senha, cep: cep }
        if (senha.length < 8) {
            alert('A senha deve ser maior que 8 caracteres')
            return
        }
        else if (!email.includes("@") || !email.includes(".com")) {
            alert('O e-mail é inválido')
            return
        } else if (cpf.length != 8) {
            alert('O CPF é inválido')
            return
        } else if (cep.length != 8) {
            alert('O CEP é inválido')
            return
        } else if (nome.length === 0) {
            alert('Digite seu nome')
            return
        }

        try {
            const retornoRequisicaoCadastro = await axios.post(`http://${ip}/auth/users/`, infoDoCadastro);
            const idUserCadastrado = retornoRequisicaoCadastro.data.id;

            const retornoRequisicaoCriarConta = await axios.post(`http://${ip}/contas/create-conta/`, { id: idUserCadastrado });

            alert("Você foi cadastrado com sucesso e sua conta do banco criada. Aproveite!")
            navigation.navigate("Login");
        } catch (error) {
            if (error.response.status === 404) {
                alert("Esse E-mail já pertence a um usuário...")
            } else {
                alert("Não foi possível realizar o cadastro!")
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
                            KeyboardType='text'
                            value={nome}
                            onChangeText={(e) => { setNome(e) }}
                        />
                        <MaterialCommunityIcons name={'user'} size={15} color={'#fff'} style={styles.icone} />
                    </View>

                    {/* INPUT DIGITAR EMAIL */}
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

                    {/* INPUT DIGITAR CPF */}
                    <View style={styles.iconeInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu CPF"
                            KeyboardType='number'
                            value={cpf}
                            onChangeText={(e) => { setCpf(e) }}
                        />
                        <MaterialCommunityIcons name={'email'} size={15} color={'#fff'} style={styles.icone} />
                    </View>

                    {/* INPUT DIGITAR DATA DE NASCIMENTO */}
                    <View style={styles.iconeInput}>
                        <DatePicker
                            style={styles.input}
                            date={dataNascimento}
                            mode="date"
                            placeholder="Selecione sua data de nascimento"
                            // MUDAR O FORMATO DA DATA DE ACORDO COM O BANCO
                            format="DD-MM-YYYY"
                            minDate="01-01-1950"
                            maxDate={dataAtual.toISOString().split("T"[0])}
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"
                        />
                        <MaterialCommunityIcons name={'calendar'} size={15} color={'#fff'} style={styles.icone} />
                    </View>

                    {/* INPUT DIGITAR CEP */}
                    <View style={styles.iconeInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu CEP"
                            KeyboardType='number'
                            value={cep}
                            onChangeText={(e) => { setCep(e) }}
                        />
                        <MaterialCommunityIcons name={'email'} size={15} color={'#fff'} style={styles.icone} />
                    </View>

                    {/* INPUT DIGITAR SENHA */}
                    <View style={styles.alinhar}>
                        <View style={styles.iconeInput}>
                            <TextInput secureTextEntry={true}
                                style={styles.input} placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => { setSenha(e) }}
                                onChangeText={(e) => { setSenha(e) }}
                            />
                            <MaterialCommunityIcons name={'eye'} size={15} color={'#fff'} style={styles.icone} />
                        </View>
                    </View>

                    <Pressable onPress={() => cadastrar(username, senha, email)} style={styles.botao} >
                        <BotaoLogin texto="Cadastrar" onPress={() => btnCadastro(nome, email, senha)} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
