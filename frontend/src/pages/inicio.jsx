import LogoComponent from "../components/logo";
import Botao from '../components/botaoLogin'
import { useNavigate } from 'react-router-dom'

function Card() {
  let navigate = useNavigate();
  
  const goLogin = () => {
    navigate("/login");
    
  }

  const goCadastro = () => {
    navigate("/cadastrar");
  }

    return ( 
      <>
      <div className="imgBackground ">
      <h1 className="text-6xl font-poppins xs:text-8xl font-bold">ToDo</h1>
      <p className='text-lg font-michroma xs:font-normal xs:text-2xl'>Onde você faz acontecer!</p>
        <div className='flex flex-col p-6 items-center border-solid backdrop-blur-md border-2 border-white rounded-xl m-10 box-border text-center gap-5 min-h-20 justify-center py-14'>
        <div className="flex flex-col ">
            <LogoComponent/>
            
          </div>
          <img src={LogoComponent} alt="" className="logo"/>
          <p className="text-lg max-w-xs text-justify">Seja bem vindo(a) ao ToDo, a minha plataforma de Digital Bank!</p>
          <a href="javascript:void(0)" onClick={goCadastro}>
            <Botao texto='Sou Novo!'/>
          </a>
          
          <a href="javascript:void(0)" onClick={goLogin} className="possuiConta">Já possui uma conta?</a>
        </div>
      </div>
      </>
        
    );
}

export default Card;
