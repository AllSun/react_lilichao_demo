import React, {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(1);

    const clickHandler = ()=> {
        setTimeout(()=>{
            setCount(Count => Count+1);
        }, 1000);
    }

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={clickHandler}>+1</button>
        </div>
    );
};

export default Counter;