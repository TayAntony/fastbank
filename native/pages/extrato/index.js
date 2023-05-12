import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import styles from './styles'

export default function Extrato() {
    const route = useRoute()

    const [chaveTransferencia, setChaveTransferencia] = useState('')
    
    
    return(
        <View style={styles.container}>
            <TextInput
                 placeholder="E-mail ou usuário"
                 placeholderTextColor="gray"
                 KeyboardType='text'
                 value={chaveTransferencia}
                 onChangeText={(e) => {setChaveTransferencia(e)}}
            />
        </View>
    )
}