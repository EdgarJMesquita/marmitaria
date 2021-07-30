// Components
import { Basket } from '../../components/basket';
import { UserForm } from './form';
import { SignIn } from './signIn';
import { Signed } from './signed';
import { Voltar } from './voltarButton';

// Hooks
import { useOrder } from '../../hooks/useOrder';
import { useAuth } from '../../hooks/useAuth';

export function Cadastro(){
  const { userAuth } = useAuth();
  const { menu } = useOrder();
 
  return(
    <>
      {!userAuth? 
        <SignIn /> : 
        <Signed name={userAuth.name} avatar={userAuth.avatar}/>
      }
      <UserForm />
      <Voltar />
      <Basket order={menu}/>
    </>
  )
}

