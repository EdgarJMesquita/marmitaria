import { useAuth } from "../../../hooks/useAuth"
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../../../services/firebase";
import { Container } from "../../../components/Container";
import googleLogo from '../../../assets/images/googleLogo.svg';
import Swal from "sweetalert";
import './style.scss'

export function Login(){
  const { userAuth, signInWithGoogle, signOut } = useAuth();
  const history = useHistory();

  useEffect(()=>{
    if(userAuth){
      database.ref('orders').once('value',snap=>{
        if(snap){
          history.push('/admin/new-orders');

        } else {
          Swal('Permissão negada','Você não tem permissão para continuar','error',{ buttons:['Voltar','Ir para home']})
          .then((res:Response)=> res &&  history.push('/'));
            
        }
      })
    }
   /*  if(userAuth){
      database.ref('checkPermission/uga').update({uga:'buga'},(err)=>{
        if(!err){
          history.push('/admin/new-orders');
        }else{
          signOut();

          Swal('Permissão negada','','error',{buttons:['Voltar','Ir para home']})
            .then(res=>{res &&  history.push('/')});
        }
      })
    } */
  }, [userAuth, history, signOut]);
  

  function handleSignInWithGoogle(){
    if(!userAuth){
      signInWithGoogle();
    }
    /* if(userAuth){
      database.ref('checkPermission/uga').update({uga:'buga'},(err)=>{
        if(!err){
          history.push('/admin/new-orders');
        }else{
          Swal('Permissão negada','','error',{buttons:['Voltar','Ir para home']});
        }
      })
    }
    else{
      signInWithGoogle();
    } */
  }

  return(
    <Container classname="main">
      <Container classname="admin-login">
        <h3>Efetue o Login para continuar</h3>
        <button className="google-btn" onClick={handleSignInWithGoogle} >
          <img src={googleLogo} alt="google logo" />
          <span>Login com Google</span>
        </button>
      </Container>
    </Container>
  )
}