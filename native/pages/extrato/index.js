import { View, Text } from "react-native";
import styles from './styles'

export default function Extrato() {
    
    return(
        <View style={styles.container}>
            <Text style={{ fontWeight: 600, fontSize: 24, color: 'black', position: 'absolute', top: 80 }}>
                Extrato
            </Text>

            {/* colocar as movimentações de verdade do usuário logado ou a mensagem caso não tenha nenhuma movimentação */}
            <Text style={{ fontWeight: 300, fontSize: 20, color: 'black', position: 'absolute', top: '20%' }}>
               Suas movimentações aparecerão aqui!
            </Text>
            
        </View>
    )
}