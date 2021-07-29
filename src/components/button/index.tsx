import './style.scss';

type ButtonProps = {
  text: string;
  type: 'button' | 'submit';
  clickFunction: ()=>void;
}

export function Button({ text, type, clickFunction}:ButtonProps){  
  return(
    <div className="btn-con">
      <button onClick={clickFunction} type={type}>{text}</button>
    </div>
  )
}


