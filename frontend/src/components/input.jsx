function Input({placeholder, tipo}) {
    return ( 
    <>
    
    <input type={tipo} placeholder={placeholder} className="min-w-[300px] bg-transparent border-b-2 border-white border-solid p-2"/>
    </> );
}

export default Input;