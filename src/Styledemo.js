import React, {useState} from 'react';

const Styledemo = () => {

    const [showBorder, setShowBorder] = useState(false);

    const divStyle = {
        color: 'red',
        backgroundColor: '#bfa',
        fontSize: 20,
        borderRadius: 12,
        border: showBorder?'2px red solid':'none'
    };

    const toggleBorderHandler = ()=> {
      setShowBorder(prevState => !prevState);
    };

    return (
        <div style={divStyle}>
            我是Div
            <button onClick={toggleBorderHandler}>切换边框</button>
        </div>
    );
};

export default Styledemo;