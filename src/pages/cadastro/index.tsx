import { Basket } from '../../components/basket';
import { UserForm } from './form';
import googleLogo from '../../assets/images/googleLogo.svg';
import backArrow from '../../assets/images/backArrow.svg';

import './style.scss';
import { useUser } from '../../hooks/useUser';
import { useOrder } from '../../hooks/useOrder';
import { useHistory } from 'react-router-dom';

export function Cadastro(){
  const { user, signInWithGoogle } = useUser();
  const { order } = useOrder();
  const history = useHistory();
 
  return(
    <>
      <div className="user-container">
        {!user? (
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
        ):(
          <div className="user-logged">
            <img src={user.avatar} alt="avatar" />
            <span>{user.name}</span>
          </div>
        )}
        <UserForm />
      </div>
      <div onClick={()=>history.push('/')} className="voltar">
        <img src={backArrow} alt="voltar"/>
        <span>Voltar</span>
      </div>
      <Basket order={order}/>
    </>
  )
}

