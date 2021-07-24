import { createContext } from 'react';
import { firebase, auth } from '../services/firebase';

const AuthContext = createContext({}as any);

function AuthContextProvider(){

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const resultado = await auth.signInWithPopup(provider);
    console.log(resultado.user);
  }
  return(
    <AuthContext.Provider value={{
      signInWithGoogle
    }}>

    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }