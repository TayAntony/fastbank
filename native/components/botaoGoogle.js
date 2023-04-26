import { View, Text, Image,TouchableOpacity,} from "react-native";
import { StyleSheet } from 'react-native';

export default function BotaoGoogle(props) {
return(
    <TouchableOpacity style={styles.botao} onPress={() => props.reference.navigate(props.referenceTitle)}>

        <View style={styles.botaoGoogle}>
            <Text style={{ color: 'white', fontSize: 16, }}>
                {props.texto}
            </Text>
            <Image source={require('../assets/google.png')} style={styles.google} />
        </View>
    </TouchableOpacity>
)
}

export const styles = StyleSheet.create({
    botao:{
        height: 40,
        width: 240,
        marginTop: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        alignItems:'center',
        justifyContent: 'center',
        padding: 24
    },
    google:{
        width: 20,
        height: 20,
        margin: 10,
    },
    botaoGoogle:{
        display: 'flex', 
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
    },
  });