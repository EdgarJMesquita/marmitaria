import { useHistory } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import './style.scss';

export function Header(){
  const { userAuth, signOut } = useAuth();
  const history = useHistory();

  return(
    <header>
     <h3 onClick={()=>history.push('/')} title="Ir para home">The Logo</h3>
      {userAuth && 
        <div onClick={signOut}>
          <span>{userAuth.name}</span>
          <img src={userAuth.avatar} alt={userAuth.name}/>
        </div>
      }
    </header>
  )
}