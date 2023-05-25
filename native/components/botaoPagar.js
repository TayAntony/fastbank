import { View } from "react-native";
import {FontAwesome} from '@expo/vector-icons'

export default function BotaoPagar(props) {
    return ( 
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <View style={{
                height: 60,
                width: 70,
                marginTop: 20,
                borderStyle: 'solid',
                borderColor: 'white',
                borderRadius: 12,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: props.validacao ? 'green' : 'grey',
                elevation: 5}}>
                <FontAwesome name={props.icone} size={30} color={'#fff'}/>
            </View>
        </View>
    )
}
