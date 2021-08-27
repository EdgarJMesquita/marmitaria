// Components
import { Form } from './Form';
import { SignIn } from './SignIn';
import { GoBackLink } from '../../../components/GoBackLink';
import { Container } from '../../../components/Container';
// Hooks
import { useAuth } from '../../../hooks/useAuth';
import { UserContextProvider } from '../../../context/UserContext';
import { Basket } from '../../../components/Basket';

export function Cadastro(){
  const { userAuth } = useAuth();

  return(
    <UserContextProvider>
      <Container classname="cadastro">
        {!userAuth && <SignIn/>}
        <Form />
        <GoBackLink />
      </Container>
      <Basket />
    </UserContextProvider>
  )
}