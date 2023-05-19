function Input({ placeholder, tipo, onChange}) {
    return (
        <>
            <input type={tipo} placeholder={placeholder} onChange={onChange} className="min-w-[300px] bg-transparent border-b-2 border-white border-solid p-2" />
        </>
    );
}

export default Input;