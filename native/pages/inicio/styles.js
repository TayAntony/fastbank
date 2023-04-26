import { StyleSheet, useWindowDimensions } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
        display: "flex",
        alignItems: "center",
    },

    card:{
        width: "100%",
        height: "auto",
        marginTop: 48,
        borderColor: 'white',
        borderStyle: "solid", 
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'black',
        opacity: 0.8,
        alignItems: 'center',
    },

    txt1:{
        fontSize: 20,
        color: 'white',
        fontWeight: 600,
        marginTop: 50,
        margin: 20,
        width: 250,
    },
    logo:{
        width: 180,
        height:130,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 10
    },
    link:{
        fontSize: 16,
        marginTop: 20,
        color: 'grey',
        margin: 50,
        fontWeight: 600,
    },

    slogan:{
        fontSize: 16,
        color: 'white',
        marginTop: 20,
        marginLeft: 30,
    },
})

export default styles