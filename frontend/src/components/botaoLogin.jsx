const Botao = ({texto, onClick}) =>{
    return ( 
        <div>
            <button onClick={onClick} className="mainButton" >
                {texto}
            </button>
        </div> 
        );
}


export default Botao;