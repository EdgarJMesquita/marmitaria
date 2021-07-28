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
  const { user } = useAuth();
  const { menu } = useOrder();
 
  return(
    <>
      {!user? 
        <SignIn /> : 
        <Signed name={user.name} avatar={user.avatar}/>
      }
      <UserForm />
      <Voltar />
      <Basket order={menu}/>
    </>
  )
}

