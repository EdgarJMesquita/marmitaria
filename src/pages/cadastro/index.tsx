
// Components
import { Basket } from '../../components/basket';
import { Form } from './form';
import { SignIn } from './signIn';
import { Signed } from './signed';
import { GoBackButton } from './goBackButton';

// Hooks
import { useAuth } from '../../hooks/useAuth';

export function Cadastro(){
  const { userAuth } = useAuth();

  return(
    <>
      {!userAuth? <SignIn /> : <Signed />}
      <Form />
      <GoBackButton />
      <Basket />
    </>
  )
}

