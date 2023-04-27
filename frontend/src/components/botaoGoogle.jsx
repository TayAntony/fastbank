import Google from '../assets/icons/google.svg'

const BotaoGoogle = ({texto, onClick}) =>{
    return ( 
        <div>
            <button onClick={onClick} className="mainButton textoCadastro flex items-center justify-around">
            
            <img src={Google} alt="logo" className='min-w-min'/>
                {texto}
            </button>
            
        </div> 
        );
}

export default BotaoGoogle;