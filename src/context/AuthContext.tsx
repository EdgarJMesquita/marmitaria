import { createContext, useEffect, useState } from 'react';
import { firebase, auth } from '../services/firebase';
import { ChildrenProps } from '../types';
import Swal from 'sweetalert';

type UserProps = {
  id: string;
  name: string;
  avatar: string;
} | undefined;

type AuthContextProps = {
  userAuth: UserProps;
  signInWithGoogle: ()=>void;
  signOut:()=>void;
}

const AuthContext = createContext({} as AuthContextProps);

function AuthContextProvider({children}:ChildrenProps){
  const [ userAuth, setUserAuth ] = useState<UserProps>();

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const resultado = await auth.signInWithPopup(provider);

    if(resultado.user){
      const { displayName, photoURL, uid } = resultado.user;
      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.');
      }
      setUserAuth({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  async function signOut(){
    const res = await Swal('Deseja mesmo deslogar?','','warning', {buttons:['Voltar','Confirmar'],dangerMode:true});
    if(res){
      auth.signOut();
      setUserAuth(undefined);
      Swal('Você se desconectou','','success');
    }

  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user=>{
      if(user){
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account.');
        }

        setUserAuth({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    })
    return ()=>{
      unsubscribe();
    }
  }, []);
  
  return(
    <AuthContext.Provider value={{
      userAuth,
      signInWithGoogle,
      signOut
    }}>
    {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }