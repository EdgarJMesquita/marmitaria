import { useAuth } from "../../hooks/useAuth"
import googleLogo from '../../assets/images/googleLogo.svg';
import './style.scss'
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../../services/firebase";

export function Login(){
  const { signInWithGoogle } = useAuth();
  const history = useHistory();

  useEffect(()=>{
    database.ref('checkPermission/uga').update({uga:'buga'},(err)=>{
      if(!err){
        history.push('/admin/new-orders');
      }else{
        history.push('/');
        console.log(err);
      }

    })
    
  }, [history])
  return(
    <div className="admin-login">
      <h3>Efetue o Login para continuar</h3>
      <button onClick={signInWithGoogle} >
        <img src={googleLogo} alt="google logo" />
        <span>Login com Google</span>
      </button>
    </div>
  )
}