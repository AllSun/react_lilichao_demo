import './Button.css';


const Button = (props) => {

    const clickHandler = ()=> {
        alert('你点我干嘛');
    };
    return <button onClick={clickHandler} style={{backgroundColor:props.bgColor, color:props.color}}>{props.children}</button>;
};
export default Button;