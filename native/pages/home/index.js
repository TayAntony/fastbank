import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient';

import {FontAwesome} from '@expo/vector-icons'

export default function Home({navigation}){
    return(
        <View style={styles.container}>
            

            <View style={styles.banner}>
                <Text>
                    Carrossel de Anúncios
                </Text>
            </View>

            <View style={styles.menu}>
                <View style={styles.subMenu}>
                    <Text>
                        Opção 1
                    </Text>

                    <Text>
                        Opção 2
                    </Text>

                    <Text>
                        Opção 3
                    </Text>
                </View>

                <View style={styles.icon}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>

                        <FontAwesome name={'user'} size={30} color={'#000'}/>
                        
                    </TouchableOpacity>
                </View>
            </View>
                <View style={styles.conteudo}>
            </View>

            <LinearGradient 
                style={{
                width: 400,  
                flex: 1,
                
            }}
                colors={['#26BAE0','#367DF7']}>
            </LinearGradient>
           
            
        </View>
    )
}