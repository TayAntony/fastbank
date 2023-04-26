import { StyleSheet } from 'react-native';


export default function Seta(){
  function voltar(){
    navigation.navigate(-1)
  }
    return (
      <svg style={styles.posicionar}  onClick={() => voltar()} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g transform="rotate(180 12 12)"><path fill="white" d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.3 8.15q-.3-.3-.3-.713t.3-.712q.3-.3.713-.3t.712.3L19.3 11.3q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.687.275t-.713-.3Z" /></g></svg>
)      
}

const styles = StyleSheet.create({
  posicionar:{
    top: 0,
    left: 10,
    right: 0,
    bottom: 20
  }

})
