import { useAuth } from '../../hooks/useAuth';
import './style.scss';



export function DesktopHeader(){
  const { userAuth, signOut } = useAuth();

  return(
    <header>
     <h3>The Logo</h3>
     {userAuth && <img onClick={signOut} src={userAuth.avatar} alt={userAuth.name}/>}
    </header>
  )
}