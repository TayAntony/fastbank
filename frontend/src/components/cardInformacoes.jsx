function CardInformacoes() {
    return ( 
    <>
    <div className=" bg-gradient-to-r from-[#B455FF] to-[#FF5A5A] xs:flex xs:flex-row p-12 justify-around items-center rounded-xl xs:my-0 xs:mx-24 flex flex-col gap-1 shadow-[0_20px_15px_-10px_rgba(0,0,0,0.4)] border-white border-[1px] border-solid">
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