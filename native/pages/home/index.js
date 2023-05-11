import { View, Text, Pressable } from "react-native";
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient';

import {FontAwesome} from '@expo/vector-icons'

export default function Home({navigation}) {
    function login(){
    navigation.navigate('Login')
    }    
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    style={{
                    width: 'auto',
                    flex: 1,
                    borderBottomEndRadius: 20,
                    borderBottomLeftRadius: 20,
                
                }}
                    colors={['#6A3A90','#E30044']}
                    start={{ x: 0, y: 4 }}
                    end={{ x: 2, y: 2 }}>
                <View>
                    <Text>
                        Nome do Usuário
                    </Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', alignContent: 'center', margin: 30, borderRadius: 20, }}>
                        <View style={{display: 'flex', flexDirection: 'column', margin: 30}}>
                            <Text>
                                Saldo em conta
                            </Text>
                            <Text>
                                R$1981,56
                            </Text>
                        </View>
                    <View style={{display: 'flex', flexDirection: 'column', margin: 30}}>
                        <Pressable>
                            <Text>olho</Text>
                        </Pressable>
                        <Pressable>
                            <Text>extrato</Text>
                        </Pressable>
                    </View>
                </View>
                
                </LinearGradient>
                
            </View>

            <View style={styles.menu}>
                <View style={styles.icon}>
                    <Pressable onPress={login}>
                        <FontAwesome name={'user'} size={30} color={'#000'}/>
                    </Pressable>
                </View>
            </View>
                <View style={styles.conteudo}>
            </View>
        </View>
    )
}