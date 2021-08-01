import { useHistory } from "react-router-dom"
import backArrow from '../../../assets/images/backArrow.svg';
import './style.scss';

export function GoBackButton(){
  const history = useHistory();
  return(
    <div onClick={()=>history.push('/')} className="voltar">
      <img src={backArrow} alt="voltar"/>
    </div>
  )
}