import { useOrder } from '../../hooks/useOrder';
import userIcon from '../../assets/images/user.svg';
import checkIcon from '../../assets/images/check.svg';
import basketIcon from '../../assets/images/basket.svg';
import './styles.scss';
import { useHistory } from 'react-router-dom';


export function Footer(){
  const history = useHistory();
  const { menu } = useOrder();

  return(
    <footer>
      <img onClick={()=>history.push('/cadastro')} src={userIcon} alt="user" />
      <img src={checkIcon} alt="check" />
      <div>
        <img onClick={()=>history.push('/')} src={basketIcon} alt="cestinha" />
        {menu.length > 0 && (
          <span>{menu.length}</span>
        )}
      </div>
    </footer>
  )
}
