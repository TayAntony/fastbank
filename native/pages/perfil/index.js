import { View, Text,Pressable} from "react-native";
import styles from './styles'
import { FontAwesome } from '@expo/vector-icons'

export default function Perfil() {
    function editarFoto(){
        alert("Editar")
    }
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
                {/* colocar a conta de verdade do usuário logado */}
                <Text>
                    1234-5
                </Text>
            </View>
            <View>
                <Text style={{ fontWeight: 300, fontSize: 20, color: '#505050'  }}>
                    Agência
                </Text>
                {/* colocar a agencia de verdade do usuário logado */}
                <Text>
                    1234
                </Text>
            </View>
        </View>

        <View style={{backgroundColor: 'grey', borderRadius:100, width: 200, height: 200, position: 'absolute', top: '35%', left: "25%"}}>
        <Pressable style={{alignItems: 'center', top: '80%', left: '40%'}} onPress={editarFoto}>
            <FontAwesome name="pencil" size={40} color={'#000'}/>
        </Pressable>
        </View>

        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', top: "60%", gap: 24, left: '16%'}}>
            <View style={{display: 'flex', flexDirection: 'column', }}>
                <Text style={{ fontWeight: 300, fontSize: 20, color: '#505050' }}>
                    E-mail
                </Text>
                {/* colocar o email de verdade do usuário logado */}
                <Text>
                    tayssaantoniasse123@gmail.com
                </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', }}>
                <Text style={{ fontWeight: 300, fontSize: 20, color: '#505050' }}>
                    Data de nascimento
                </Text>
                {/* colocar a data de nascimento de verdade do usuário logado */}
                <Text>
                    02/12/2003
                </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', }}>
                <Text style={{ fontWeight: 300, fontSize: 20, color: '#505050' }}>
                    CPF
                </Text>
                {/* colocar o CPF de verdade do usuário logado */}
                <Text>
                    123.123.123-12
                </Text>
            </View>
        </View>
        
    </View>
    )
}