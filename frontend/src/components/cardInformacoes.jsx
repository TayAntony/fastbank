function CardInformacoes() {
    return ( 
    <>
    <div className=" bg-gradient-to-r from-[#B455FF] to-[#FF5A5A] xs:flex xs:flex-row p-8 justify-around items-center rounded-xl xs:mx-24 flex flex-col gap-1">
        <div className=" flex flex-col items-center">
            <h1 className="xs:text-4xl text-xl">+200mil</h1>
            <p className="underline decoration-solid">usuários</p>
        </div>
        <div className="flex flex-col items-center ">
            <h1 className="xs:text-4xl text-xl">+40mil</h1>
            <p className="underline decoration-solid">cartões criados</p>
        </div>
        <div className="flex flex-col items-center">
            <h1 className="xs:text-4xl text-xl">+5</h1>
            <p className="underline decoration-solid">anos no mercado</p>
        </div>
        <div className="flex flex-col items-center">
            <h1 className="xs:text-4xl text-xl">+10mil</h1>
            <p className="underline decoration-solid">empréstimos mensais</p>
        </div>
    </div>
    </> );
}

export default CardInformacoes;