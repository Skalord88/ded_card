import { useState } from "react";

function App (){

    const [name, setName] = useState('Paulina');

    const [count, setCont] = useState(0);

    const [countDwa, setContDwa] = useState(0);

    const handleChangeName = () => {
        setName('Oscar');
    };

    const handleContPlus = () => {
        setCont(count+1);
    };

    const handleContMinus = () => {
        setCont(count-1);
    };

    return (
        <>
            <p>{name}</p>
            <button onClick={handleChangeName}>Change Name</button>

            <p>{count}</p>
            <p>
                <button onClick={handleContMinus}>-</button>
                <button onClick={handleContPlus}>+</button>
            </p>

            <p>{countDwa}</p>
            <p>
                <button onClick={() => setContDwa(countDwa => countDwa - 1)}>-</button>
                <button onClick={() => setContDwa(countDwa + 1)}>+</button>
            </p>
        </>
    )
        
}
export default App;

