import googleLogo from '../../../assets/images/googleLogo.svg';
import { useAuth } from '../../../hooks/useAuth';
import './style.scss';

export function SignIn(){
  const { signInWithGoogle } = useAuth();
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