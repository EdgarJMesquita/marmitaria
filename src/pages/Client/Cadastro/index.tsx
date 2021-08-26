// Components
import { Basket } from '../../../components/Basket';
import { Form } from './Form';
import { SignIn } from './SignIn';
import { GoBackLink } from '../../../components/GoBackLink';
// Hooks
import { useAuth } from '../../../hooks/useAuth';
import { Container } from '../../../components/Container';
import { Header } from '../../../components/Header';

export function Cadastro(){
  const { userAuth } = useAuth();

  return(
    <Container classname="main">
      <Header />
      <Container classname="cadastro">
        {!userAuth && <SignIn/>}
        <Form />
        <GoBackLink />
      </Container>
      <Basket />
    </Container>
  )
}