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
        height: 50,
        width: 220,
        borderBottomColor: 'white',
        borderStyle: "solid", 
        borderWidth: 1,
        margin: 10,
        alignItems: 'center',
        borderRadius:6,
        padding: 10,
        fontSize: 16,
        color: 'white',
        
    },
    txt1:{
        fontSize: 18,
        color: 'white',
        margin: 20,
        width: 250,
        
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
        flex: 0.9,
        borderColor: 'white',
        borderStyle: "solid", 
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'black',
        height: 700
    },

    link:{
        fontSize: 12,
        marginTop: 20,
        color: 'grey',
    },

    iconeInput:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    esqueceuSenha:{
        fontSize: 12,
        color: 'grey',
        fontWeight: 700

    },

})

export default styles