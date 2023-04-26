import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        alignItems: 'end',
        flex: 1,
    },
    icon:{
        margin:10,

    },
    banner:{
        width: '100%',
        height: 50,
        backgroundColor: '#1F88F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu:{
        display: "flex",
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    subMenu:{
        display: "flex",
        flexDirection: 'row',
        width: '80%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        margin: 20,
    }

})

export default styles