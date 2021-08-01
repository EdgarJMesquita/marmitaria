// Customs Hooks
import { useAuth } from '../../../hooks/useAuth';
// Styles
import './style.scss';

export function Signed(){
  const { userAuth } = useAuth();
  return(
    <div className="user-logged">
      <img src={userAuth?.avatar} alt="avatar" />
      <span>{userAuth?.name}</span>
    </div>
  )
}