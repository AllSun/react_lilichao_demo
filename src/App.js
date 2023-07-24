import {useReducer} from 'react';

const reducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch(action.type){
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
    }
};

function App() {

    const [count, countDispath] = useReducer(reducer,1);

    return (
        <div className="App">
            {count}

            <div>
                <button onClick={()=>countDispath({type:'sub'})}>-</button>
                <button onClick={()=>countDispath({type:'add'})}>+</button>
            </div>
        </div>
    );
}

export default App;