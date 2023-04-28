import Logo from '../../public/logo.svg'

function LogoComponent() {
    return ( 
        <div>
            <img src={Logo} alt="logo" className='p-2'/>
        </div>
     );
}

export default LogoComponent;