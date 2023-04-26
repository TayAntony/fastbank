import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black' ,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#fff',
    },
    input:{
        height: 40,
        width: 220,
        borderColor: 'transparent',
        borderBottomColor: 'white',
        borderStyle: "solid", 
        borderWidth: 1,
        margin: 10,
        alignItems: 'center',
        borderRadius:6,
        padding: 10,
        fontSize: 12,
        outlineStyle: "solid",
        outlineColor: "transparent",
        outlineWidth: 1,
        color: 'white'
        
    },
    txt1:{
        fontSize: 14,
        color: 'white',
        margin: 20,
        width: 200,
        
    },
    logo:{
        width: 130,
        height:90,
        alignItems: "center",
        justifyContent: 'center',
        margin: 20,
    },
    card:{
        minWidth: 300,
        maxWidth: 300,
        margin: 40,
        flex: 1,
        borderColor: 'white',
        borderStyle: "solid", 
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'black',
    },
    link:{
        fontSize: 12,
        marginTop: 20,
        color: 'grey',
    },
    google:{
        width: 20,
        height: 20,
        margin: 10,
    },
    botaoGoogle:{
        display: 'flex', 
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconeInput:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icone:{
        alignSelf: 'center',

    }
    
})

export default styles