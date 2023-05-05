import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient';

import {FontAwesome} from '@expo/vector-icons'

export default function Home() {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    style={{
                    width: 400,
                    flex: 0.4,
                
                }}
                    colors={['#6A3A90','#E30044']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}>
                </LinearGradient>
            </View>

            <View style={styles.menu}>
                <View style={styles.icon}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>

                        <FontAwesome name={'user'} size={30} color={'#000'}/>
                        
                    </TouchableOpacity>
                </View>
            </View>
                <View style={styles.conteudo}>
            </View>
        </View>
    )
}