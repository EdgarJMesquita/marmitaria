
import { createContext, FormEvent, useEffect, useState } from 'react';
import { useOrder } from '../hooks/useOrder';
import { firebase, auth, database } from '../services/firebase';
import { OrderContextProviderProps } from '../types';
import { useHistory } from 'react-router';
import Swal from 'sweetalert';


type UserProps = {
  id: string;
  name: string;
  avatar: string;
};
type UserContextProps = {
  user: UserProps | undefined;
  name: string;
  setName: (arg:string)=>void;
  cep: string;
  setCep: (arg:string)=>void;
  rua: string;
  setRua: (arg:string)=>void;
  numero: string;
  setNumero: (arg:string)=>void;
  bairro: string;
  setBairro: (arg:string)=>void;
  hasFailed: boolean;
  handleSendOrder: (event:FormEvent)=>void;
  signInWithGoogle: ()=>void;
};
type CepProps = {
  street: string;
  neighborhood: string;
};

const UserContext = createContext({} as UserContextProps)

function UserContextProvider(props:OrderContextProviderProps){
  const {menu, clearOrder} = useOrder();
  const [name, setName] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [user, setUser] = useState<UserProps>();
  const [hasFailed, setHasFailed] = useState(false);

  const history = useHistory();

  
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user=>{
      if(user){
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });

        setName(displayName);

        const userRef = database.ref(`users/${user.uid}`);
        userRef.once('value',(snap)=>{
          const data = snap.val();
          const { bairro, cep, numero, rua }:Record<string,string> = data;
          setRua(rua);
          setNumero(numero);
          setBairro(bairro);
          setCep(cep);
        })
      }
    })

    return ()=>{
      unsubscribe();
    }
  }, []);



  async function signInWithGoogle(){

    const provider = new firebase.auth.GoogleAuthProvider();
    const resultado = await auth.signInWithPopup(provider);

    if(resultado.user){

      const { displayName, photoURL, uid } = resultado.user;

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  useEffect(() => {
  const getCep = async()=>{
    if(cep.length === 8 ){
      const url = `https://brasilapi.com.br/api/cep/v1/${cep}`;
      const promise = await fetch(url);
      const { street, neighborhood }:CepProps = await promise.json();

      if(promise.status===200){
        street && setRua(street);
        neighborhood &&  setBairro(neighborhood);
      }
    }
  }
    getCep();
  }, [cep]);

  function handleSendOrder(event:FormEvent){
    event.preventDefault();

    const selected = menu.filter(item=>item.isSelected);

    if(selected.length < 1) Swal({
      title:'Sua cestinha está vazia',
      text: 'Você ainda não escolheu seu prato, deseja ir ao menu?',
      icon: 'info',
      buttons: {
        cancel:{
          text:'Voltar',
          value: null,
          visible: true
        },
        confirm:{
          text: 'Ir para o menu',
          value: true,
          
        }
      }
    }).then(res=>res && history.push('/'));

    if(name && rua && numero && bairro && selected.length > 0) {
      
      const orderRef = database.ref('orders');
      orderRef.push({
        order: selected.map(item=>item.content),
        name,
        cep,
        rua,
        numero,
        bairro
      });

      if(orderRef.key){
        Swal('Pedido enviado!','','success');
        history.push('/');
        clearOrder();
      } 

      if(user){
        const userRef = database.ref(`users/${user?.id}`);
        userRef.update({
          id: user?.id,
          cep,
          rua,
          numero,
          bairro
        });

        userRef.key && console.log('Usuário cadastrado!');
        
      }

    }else{
      setHasFailed(true);
    }
  }

  return(
    <UserContext.Provider value={{
      user,
      name,
      setName,
      cep,
      setCep,
      rua,
      setRua,
      numero,
      setNumero,
      bairro,
      setBairro,
      hasFailed,
      handleSendOrder,
      signInWithGoogle
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider} 