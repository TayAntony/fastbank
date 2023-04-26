import { StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity } from "react-native";

export default function BotaoLogin(props) {
    return (
        
        <View style={styles.botao}>
            <Text style={{ color: 'white', fontSize: 20}}>
                {props.texto}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    botao: {
        opacity: 1,
        height: 40,
        width: 240,
        marginTop: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        padding: 24,
    },
});