import { useOrder } from '../../hooks/useOrder';
import userIcon from '../../assets/images/user.svg';
import checkIcon from '../../assets/images/check.svg';
import basketIcon from '../../assets/images/basket.svg';
import './styles.scss';
import { useHistory } from 'react-router-dom';


export function Footer(){
  const { count } = useOrder();
  const history = useHistory();



  return(
    <footer>
      <img onClick={()=>history.push('/user')} src={userIcon} alt="user" />
      <img src={checkIcon} alt="check" />
      <div>
        <img onClick={()=>history.push('/')} src={basketIcon} alt="cestinha" />
        {count > 0 && (
          <span>{count}</span>
        )}
      </div>
    </footer>
  )
}