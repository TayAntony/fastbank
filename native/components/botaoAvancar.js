
import { Text, View } from "react-native";

export default function BotaoAvancar(props) {
    return (
        
        <View style={{
            opacity: 1,
            height: 60,
            width: 240,
            marginTop: 20,
            borderStyle: 'solid',
            borderColor: 'white',
            borderRadius: 12,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.validacao ? 'green' : 'grey',
            padding: 12}}>
            <Text style={{ color: '#FFF', fontSize: 20, alignItems: 'center'}}>
                {props.texto}
            </Text>
        </View>
    )
}
