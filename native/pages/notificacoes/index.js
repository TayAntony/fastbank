import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import styles from './styles'

export default function Notificacoes() {
    const [chaveTransferencia, setChaveTransferencia] = useState('')
    
    return(
        <View style={styles.container}>
            <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                Notificações
            </Text>

            {/* colocar as notificações de movimentação (recebeu transação, gastou com transação, solicitou cartão, trocou foto, pagou qr code)*/}
            <Text style={{ fontWeight: 300, fontSize: 20, color: 'black', position: 'absolute', top: '20%' }}>
               Suas notificações aparecerão aqui!
            </Text>
            
        </View>
    )
}