import googleLogo from '../../../assets/images/googleLogo.svg';
import { useUser } from '../../../hooks/useUser';
import './style.scss';

export function SignIn(){
  const { signInWithGoogle } = useUser();
  return(
    <div className="login-button-container">
      <button onClick={signInWithGoogle} >
        <img src={googleLogo} alt="google logo" />
        <span>Login com Google</span>
      </button>
      <p>Efetue o login para salvar seu endereço para entregas futuras.</p>
      <div className="separador">
        ou
      </div>
    </div>
  )
}