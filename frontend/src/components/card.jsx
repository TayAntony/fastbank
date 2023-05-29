import chip from '../assets/cartoes/chip.svg';
import brand from '../assets/cartoes/logo.svg';
import mastercard from '../assets/cartoes/mastercard.svg';
import aproximacao from '../assets/cartoes/aproximacao.svg';
import background1 from '../assets/cartoes/bg1.svg';
import background2 from '../assets/cartoes/bg2.svg';
import background3 from '../assets/cartoes/bg3.svg';
import background4 from '../assets/cartoes/bg4.svg';
import background5 from '../assets/cartoes/bg5.svg';
import background6 from '../assets/cartoes/bg6.svg';
import background7 from '../assets/cartoes/bg7.svg';
import background8 from '../assets/cartoes/bg8.svg';
import background9 from '../assets/cartoes/bg9.svg';
import background10 from '../assets/cartoes/bg10.svg';



function Card(){
    const backgrounds = [
        background1,
        background2,
        background3,
        background4,
        background5,
        background6,
        background7,
        background8,
        background9,
        background10
    ]
    
    const randomIndexBg = Math.floor(Math.random() * backgrounds.length);
    const bgRandom = backgrounds[randomIndexBg];

return(
    <>
        <Card
            chipIcon={chip} /* SVG Icon*/
            brandIcon={brand} /* SVG Icon*/
            backgroundImage={bgRandom} /*PNG, JPEG, etc...*/
        />
    </>
    
)
} 
export default Card;