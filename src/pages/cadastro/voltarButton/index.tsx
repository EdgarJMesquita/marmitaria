import { useHistory } from "react-router-dom"
import backArrow from '../../../assets/images/backArrow.svg';
import './style.scss';

export function Voltar(){
  const history = useHistory();
  return(
    <div onClick={()=>history.push('/')} className="voltar">
      <img src={backArrow} alt="voltar"/>
      <span>Voltar</span>
    </div>
  )
}