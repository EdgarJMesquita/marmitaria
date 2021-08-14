// Customs Hooks
import { useAuth } from '../../../hooks/useAuth';
import signOutIcon from '../../../assets/images/signOutIcon.svg';
// Styles
import './style.scss';

export function Signed(){
  const { userAuth, signOut } = useAuth();
  return(
    <div className="user-logged">
      <img src={userAuth?.avatar} alt="avatar" />
      <span>{userAuth?.name}</span>
      <div onClick={signOut} className="logout">
        <img src={signOutIcon} alt="logout" />
      </div>
    </div>
  )
}