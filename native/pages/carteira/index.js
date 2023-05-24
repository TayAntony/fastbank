import { View, Text } from "react-native";
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import { useSession } from "../home";

export default function Carteira(navigation) {
    const { user } = useSession(navigation);

    return ( 
    <View style={styles.container}>
    
        <View style={styles.header}>
                <LinearGradient
                    style={{
                        width: '100%',
                        flex: 1,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,

                    }}
                    colors={['#E30044', '#6A3A90']}
                    start={{ x: 2, y: 0 }}
                    end={{ x: 0, y: 2 }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: 30,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                        }}>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                            }}>
                            
                        </View>
                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        backgroundColor: 'white',
                        alignContent: 'center',
                        marginLeft: 28,
                        marginRight: 28,
                        borderRadius: 12,
                        }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: 30,
                            justifyContent: 'space-evenly',
                            alignItems: 'baseline'
                        }}>
                            <Text style={{ margin: 6 }}>
                                Saldo em conta
                            </Text>
                            <Text style={{ margin: 6 }}>
                                R$ {user.conta.saldo}
                            </Text>
                    </View>

                </View>

            </LinearGradient>
        </View>
        <Text style={{ fontWeight: 300, fontSize: 20, color: 'black', position: 'absolute', top: '35%' }}>
               Suas últimas movimentações!
            </Text>
    </View>
    )
}