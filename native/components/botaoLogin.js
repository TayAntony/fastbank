import { StyleSheet } from 'react-native';
import { Text, View } from "react-native";

export default function BotaoLogin(props) {
    return (
        
        <View style={{
            opacity: 1,
            height: 60,
            width: 240,
            marginTop: 20,
            borderStyle: 'solid',
            borderColor: props.validacao ? "white" : "#353535",
            borderRadius: 12,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "black",
            padding: 12}}>
            <Text style={{ 
                color: props.validacao ? "white" : "#353535", 
                fontSize: 20, alignItems: 'center'}}>
                {props.texto}
            </Text>
        </View>
    )
}
