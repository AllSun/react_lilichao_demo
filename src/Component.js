import React, {useRef} from 'react';

const Component = () => {

    const divRef = useRef();

    const clickHandler = () => {
       console.log(divRef.current.innerText);
    };

    return (
            <div ref={divRef} onClick={clickHandler}>一个div</div>
           
    );
};

export default Component;