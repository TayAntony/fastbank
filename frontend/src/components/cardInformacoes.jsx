function CardInformacoes() {
    return ( 
    <>
    <div className=" bg-gradient-to-r from-[#B455FF] to-[#FF5A5A] flex p-6  justify-around items-center rounded-xl mx-24">
        <div className=" flex flex-col items-center">
            <h1 className="text-4xl">+ 200mil</h1>
            <p className="underline decoration-solid">usuários</p>
        </div>
        <div className="flex flex-col items-center ">
            <h1 className="text-4xl">+40mil</h1>
            <p className="underline decoration-solid">cartões criados</p>
        </div>
        <div className="flex flex-col items-center">
            <h1 className="text-4xl">+5</h1>
            <p className="underline decoration-solid">anos no mercado</p>
        </div>
        <div className="flex flex-col items-center">
            <h1 className="text-4xl">+10mil</h1>
            <p className="underline decoration-solid">desenvolvedores</p>
        </div>
    </div>
    </> );
}

export default CardInformacoes;