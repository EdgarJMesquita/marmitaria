
import { createContext, FormEvent, useEffect, useState } from 'react';
import { useOrder } from '../hooks/useOrder';
import { database } from '../services/firebase';
import { OrderContextProviderProps } from '../types';
import { useHistory } from 'react-router';
import Swal from 'sweetalert';
import { useAuth } from '../hooks/useAuth';


type AddressProps = {
  name: string;
  cep:string;
  rua:string;
  numero:string;
  bairro:string;
}
type UserContextProps = {
  setAddress: (arg:AddressProps)=>void;
  handleInput: (pointer:string,data:string)=>void;
  address: AddressProps;
  hasFailed: boolean;
  handleSendOrder: (event:FormEvent)=>void;
};
type CepProps = {
  street: string;
  neighborhood: string;
};

const UserContext = createContext({} as UserContextProps)

function UserContextProvider(props:OrderContextProviderProps){
  const {menu, clearOrder} = useOrder();
 
  const { user } = useAuth();
  const [hasFailed, setHasFailed] = useState(false);
  const [ address, setAddress] = useState({
    name: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: ''
  });

  const history = useHistory();

  useEffect(() => {
    if(user){
      const userDataRef = database.ref(`users/${user.id}`)
      userDataRef.on('value',snap=>{
        const userData = snap.val();

        if(!userData) return

        const { cep, rua, numero, bairro }: AddressProps = userData;
        setAddress(prev=>({...prev,name:user.name,cep,rua,numero,bairro}))

      })
    }
  }, [user]);

  
  function handleInput(pointer:string,data:string){
    setAddress(prev=>({...prev,[pointer]:data}))
  }

  useEffect(() => {
  const getCep = async()=>{
    if(address.cep.length === 8 ){
      const url = `https://brasilapi.com.br/api/cep/v1/${address.cep}`;
      const promise = await fetch(url);
      const { street, neighborhood }:CepProps = await promise.json();

      if(promise.status===200){
        setAddress(prev=>({...prev, rua:street, bairro: neighborhood}))
      }
    }
  }
    getCep();
  }, [address.cep]);

  function handleSendOrder(event:FormEvent){
    event.preventDefault();
    const {name,cep,rua,numero,bairro} = address;
    const selectedItens = menu.filter(item=>item.isSelected);

    if(selectedItens.length < 1) {
      Swal('Sua cestinha está vazia','Você ainda não escolheu seu prato, deseja ir ao cardápio?','info',{buttons:['Cancelar','Confirmar']})
      .then(res=>res && history.push('/'))
      return
    }
    
    if(name && rua && numero && bairro) {
      
      const orderRef = database.ref('orders');
      orderRef.push({
        order: selectedItens.map(item=>item.content),
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
      address,
      setAddress,
      handleInput,
      hasFailed,
      handleSendOrder
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider} 