// Components
import { Basket } from '../../components/Basket';
import { Form } from './Form';
import { SignIn } from './SignIn';
import { Signed } from './Signed';
import { GoBackLink } from '../../components/GoBackLink';
//import { Container } from '../../components/Container';
// Hooks
import { useAuth } from '../../hooks/useAuth';
import { Container } from '../../components/Container';

export function Cadastro(){
  const { userAuth } = useAuth();

  return(
      <Container classname="main">
        <Container>
          {!userAuth && <SignIn/>}
          {userAuth && <Signed/>}
          <Form />
        <GoBackLink />
        </Container>
        <Basket />
      </Container>
  )
}
/* <Container classname="cadastro">
        <GoBackLink />
        {!userAuth && <SignIn/>}
        {userAuth && <Signed/>}
        <Form />
      </Container>
      <Basket /> */