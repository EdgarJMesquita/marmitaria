import { useAuth } from "../../../hooks/useAuth"
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../../../services/firebase";
import { Container } from "../../../components/Container";
import googleLogo from '../../../assets/images/googleLogo.svg';
import './style.scss'

export function Login(){
  const { userAuth, signInWithGoogle } = useAuth();
  const history = useHistory();

  useEffect(()=>{

    if(userAuth){
      database.ref('checkPermission/uga').update({uga:'buga'},(err)=>{
        if(!err){
          history.push('/admin/new-orders');
        }else{
          history.push('/');
          console.log(err);
        }
      })
    }
    
  }, [userAuth, history])

  

  return(
    <Container classname="main">
      <Container classname="admin-login">
        <h3>Efetue o Login para continuar</h3>
        <button onClick={signInWithGoogle} >
          <img src={googleLogo} alt="google logo" />
          <span>Login com Google</span>
        </button>
      </Container>
    </Container>
  )
}