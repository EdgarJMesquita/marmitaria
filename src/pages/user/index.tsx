import { Footer } from '../../components/footer';
import { UserForm } from '../../components/form';
import googleLogo from '../../assets/images/googleLogo.svg';
import './style.scss';

export function User(){
  return(
    <>
      <div className="user-container">
        <div className="login-button-container">
          <button>
            <img src={googleLogo} alt="google logo" />
            <span>Login com Google</span>
          </button>
          <p>Efetue o login para salvar seu endereço para entregas futuras.</p>
        </div>
        <div className="separador">
          ou
        </div>
        <UserForm />
      </div>
      <Footer />
    </>
  )
}

