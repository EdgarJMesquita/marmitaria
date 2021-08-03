
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
      <a href="geo:0,0?q=2010%2CRua+Olyntho+Arruda%2CSapiranga+Coité%2C60833322" target="_blank" rel="noreferrer">click</a>
      <a href="http://maps.google.com/maps?q=2010+olyntho+arruda+sapiranga">click</a>
      <a href="https://api.whatsapp.com/send?phone=5585991871212">Whats</a>
      <Form />
      <GoBackButton />
      <Basket />
    </>
  )
}

