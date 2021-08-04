import { useHistory } from "react-router-dom"
import backArrow from '../../assets/images/backArrow.svg';
import './style.scss';

export function GoBackLink(){
  const history = useHistory();
  return(
    <div onClick={()=>history.goBack()} className="voltar">
      <img src={backArrow} alt="voltar"/>
    </div>
  )
}