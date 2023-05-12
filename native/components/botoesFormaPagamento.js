import { Text, View, StyleSheet } from "react-native";
import {FontAwesome} from '@expo/vector-icons'

export default function BotoesFormaPagamento(props) {
    return ( 
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <View style={styles.botao}>
                <FontAwesome name={props.icone} size={30} color={'#fff'}/>
            </View>

            <Text style={{color: '#7A7A7A', 
                          fontSize: 16,
                          width: 70,
                          }}>
                    {props.texto}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    botao: {
        height: 50,
        width: 70,
        marginTop: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DD0028',
        elevation: 5
    },
});