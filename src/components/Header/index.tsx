import { useAuth } from '../../hooks/useAuth';
import './style.scss';

export function Header(){
  const { userAuth, signOut } = useAuth();

  return(
    <header>
     <h3>The Logo</h3>
      {userAuth && 
        <div>
          <span>{userAuth.name}</span>
          <img onClick={signOut} src={userAuth.avatar} alt={userAuth.name}/>
        </div>
      }
      
    </header>
  )
}