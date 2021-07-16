import userIcon from '../../assets/images/user.svg';
import checkIcon from '../../assets/images/check.svg';
import basketIcon from '../../assets/images/basket.svg';
import './styles.scss';

type FooterProps = {
  count: number
}

export function Footer({count}:FooterProps){
  return(
      <footer>
        <img src={userIcon} alt="user" />
        <img src={checkIcon} alt="check" />
        <div>
          <img src={basketIcon} alt="cestinha" />
            <span>{count}</span>
        </div>
      </footer>
  )
}