import { useHistory } from "react-router-dom"
//import backArrow from '../../assets/images/backArrow.svg';
import goBackIcon from '../../assets/images/goBackIcon.svg';
import './style.scss';

export function GoBackLink(){
  const history = useHistory();
  return(
    <div onClick={()=>history.goBack()} className="voltar">
      <img src={goBackIcon} alt="voltar"/>
    </div>
  )
}