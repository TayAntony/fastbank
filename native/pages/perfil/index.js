import { View, Text,Pressable} from "react-native";
import styles from './styles'
import { FontAwesome } from '@expo/vector-icons'
import { useSession } from "../home";
import ImagePicker from 'react-native-image-picker';
import React, { useState } from 'react';


export default function Perfil(navigation) {
    const { user } = useSession(navigation);

    const [imagemPerfil, setImagemPerfil] = useState(null);

    //arrumar a função de escolher imagem

    const escolherImagemPerfil = () => {
        alert("Opção indisponível no momento!")
        // const options = {
        //     mediaType: 'photo',
        //     maxWidth: 200,
        //     maxHeight: 200,
        //     quality: 1,
        //   };
      
        // ImagePicker.launchImageLibrary(options, (response) => {
        //     if (response.didCancel) {
        //         console.log('Seleção de foto cancelada');
        //     } else if (response.error) {
        //         console.log('Erro: ', response.error);
        //     } else {
        //         const source = { uri: response.uri };
        //         setImagemPerfil(source);
        //     }
        // });
    };

    return ( 
    <View style={styles.container}>
        <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80, left: "40%" }}>
            Perfil
        </Text>

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', top: "40%"}}>
            <View style={{display: 'flex', flexDirection: 'column', }}>
                <Text style={{ fontWeight: 300, fontSize: 20, color: '#505050' }}>
                    Conta
                </Text> 
                <Text>
                    {user.conta.numero_conta}-{user.conta.digito}
                </Text>
            </View>

            <View>
                <Text style={{ fontWeight: 300, fontSize: 20, color: '#505050'  }}>
                    Agência
                </Text>
                <Text>
                    {user.conta.agencia}
                </Text>
            </View>
        </View>

        {/* MUDAR FOTO DE PERFIL */}
        <View style={{backgroundColor: 'grey', borderRadius:100, width: 200, height: 200, position: 'absolute', top: '35%', left: "25%"}}>
            
        </View>

        <View style={{backgroundColor: 'white', borderRadius:100, width: 200, height: 200, position: 'absolute', top: '35%', left: "25%"}}>
            <View>
                <FontAwesome name={'user-circle-o'} size={200} color={'#000'} />
                <Pressable style={{alignItems: 'center', top: '75%', left: '70%',  borderRadius: 100, width: 50, height: 50, backgroundColor: 'green', position: 'absolute', justifyContent: 'space-around'}} onPress={escolherImagemPerfil}>
                    <FontAwesome name="pencil" size={30} color={'white'}/>
                </Pressable>
            </View>
        </View>

        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', top: "60%", gap: 24, left: '16%'}}>
            <View style={{display: 'flex', flexDirection: 'column', }}>
                <Text style={{ fontWeight: 300, fontSize: 20, color: '#505050' }}>
                    E-mail
                </Text>
                
                <Text>
                    {user.email}
                </Text>

            </View>
            <View style={{display: 'flex', flexDirection: 'column', }}>
                <Text style={{ fontWeight: 300, fontSize: 20, color: '#505050' }}>
                    Data de nascimento
                </Text>
                
                <Text>
                    {user.data_nascimento_criacao}
                </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', }}>
                <Text style={{ fontWeight: 300, fontSize: 20, color: '#505050' }}>
                    CPF
                </Text>
                
                <Text>
                    {user.cpf_cnpj}
                </Text>
            </View>
        </View>
        
    </View>
    )
}