// React Hooks/types
import { createContext, FormEvent, useEffect, useState } from 'react';
// Database connection
import { database } from '../services/firebase';
// Types
import { OrderContextProviderProps } from '../types';
import { useHistory } from 'react-router';
// Custom Hooks
import { useOrder } from '../hooks/useOrder';
import { useAuth } from '../hooks/useAuth';
// Third party libraries
import Swal from 'sweetalert';


type UserProps = {
  name: string;
  telephone: string;
  cep:string;
  street:string;
  number:string;
  neighborhood:string;
  
  
}
type AddressProps = {
  name: string;
  telephone:string;
  cep:string;
  street:string;
  number:string;
  neighborhood:string;
}
type UserContextProps = {
  user: UserProps;
  handleInput: (event:FormEvent<HTMLInputElement>)=>void;
  hasFailed: boolean;
  handleSendOrder: (event:FormEvent)=>void;
};
type CepProps = {
  street: string;
  neighborhood: string;
};

const UserContext = createContext({} as UserContextProps)

function UserContextProvider(props:OrderContextProviderProps){
  const [ user, setUser] = useState<UserProps>({
    name: '',
    telephone: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: ''
  });
  const [ hasFailed, setHasFailed ] = useState(false);
  const { userAuth } = useAuth();
  const { menu, clearOrder } = useOrder();
  const history = useHistory();

  useEffect(() => {
    if(userAuth){
      const userDataRef = database.ref(`users/${userAuth?.id}`)
      userDataRef.once('value',snap=>{
        const userData:AddressProps | undefined = snap.val();
        userData && setUser({...userData})
        
      })
    }
  }, [userAuth]);

  
  function handleInput(event:FormEvent<HTMLInputElement>){
    const { name, value } = event.currentTarget;
    setUser(prevState=>({...prevState, [name]: value}));
  }

  useEffect(() => {
    (async()=>{
      if(user.cep.length === 8 ){
        const url = `https://brasilapi.com.br/api/cep/v1/${user.cep}`;
        const promise = await fetch(url);
        const { street, neighborhood }:CepProps = await promise.json();

        if(promise.status===200){
          setUser(prevState=>({
            ...prevState, 
              street,
              neighborhood  
          }))
        }
      }
    })();
  }, [user.cep]);


  function getOrder(){
    const order = menu.filter(item=>item.isSelected).map(item=>item.content);

    if(order.length < 1) {
      Swal('Sua cestinha está vazia','Você ainda não escolheu seu prato, deseja ir ao cardápio?','info',{buttons:['Cancelar','Confirmar']})
      .then(res=>res && history.push('/'));
      return 0;
    }
    return order;
  }

  function checkUserInput(){
    const { name, telephone, street, number, neighborhood } = user;
    return name && telephone && street && number && neighborhood
   // if(name && telephone && street && number && neighborhood) return true;
    //const a = name && telephone
  }

  function sendOrder(order:string[]){

    const userOrder = {
      ...user,
      order
    }

    const orderRef = database.ref('orders');
    orderRef.push(userOrder,(err)=>{
      if(err){
        throw new Error(`Serviço indisponível ${err}`);

      }else{
        Swal('Pedido enviado!','Seu pedido já foi processado','success');
        history.push('/');
        clearOrder();
      }
    });

    if(userAuth){
      const userRef = database.ref(`users/${userAuth?.id}`);
      userRef.update(user);
      userRef.key && console.log('Usuário cadastrado!');
    }
  }

  function handleSendOrder(event:FormEvent){
    event.preventDefault();

    const order = getOrder();
    
    if(order && checkUserInput()) {
      sendOrder(order);
    }else{
      setHasFailed(true);
    }
  }

  return(
    <UserContext.Provider value={{
      user,
      handleInput,
      hasFailed,
      handleSendOrder
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider} 

/* 
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
  street:string;
  number:string;
  neighborhood:string;
}
type UserContextProps = {
  setAddress: (arg:AddressProps)=>void;
  handleInput: (event:FormEvent<HTMLInputElement>)=>void;
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
  const [ address, setAddress] = useState<AddressProps>({
    name: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: ''
  });
  const [hasFailed, setHasFailed] = useState(false);
  const { user } = useAuth();
  const {menu, clearOrder} = useOrder();
  const history = useHistory();

  useEffect(() => {
    if(user){
      const userDataRef = database.ref(`users/${user.id}`)
      userDataRef.on('value',snap=>{
        const userData:AddressProps | undefined = snap.val();

        if(userData){
          const { cep, street, number, neighborhood }: AddressProps = userData;
          setAddress(prevState=>({
            ...prevState,
            name: user.name,
            cep,
            street,
            number,
            neighborhood
          }))
          
        } 
      })
    }
  }, [user]);

  
  function handleInput(event:FormEvent<HTMLInputElement>){
    const pointer = event.currentTarget.name;
    const newData = event.currentTarget.value.trim();
    setAddress(prevState=>({...prevState, [pointer]:newData}))
  }

  useEffect(() => {
    (async()=>{
      if(address.cep.length === 8 ){
        const url = `https://brasilapi.com.br/api/cep/v1/${address.cep}`;
        const promise = await fetch(url);
        const { street, neighborhood }:CepProps = await promise.json();

        if(promise.status===200){
          setAddress(prevState=>({...prevState, street, neighborhood}))
        }
      }
    })();
  }, [address.cep]);

  function handleSendOrder(event:FormEvent){
    event.preventDefault();
    const {name, cep, street, number, neighborhood} = address;
    const selectedItens = menu.filter(item=>item.isSelected);

    if(selectedItens.length < 1) {
      Swal('Sua cestinha está vazia','Você ainda não escolheu seu prato, deseja ir ao cardápio?','info',{buttons:['Cancelar','Confirmar']})
      .then(res=>res && history.push('/'))
      return
    }
    
    if(name && street && number && neighborhood) {
      
      const orderRef = database.ref('orders');
      orderRef.push({
        order: selectedItens.map(item=>item.content),
        name,
        cep,
        street,
        number,
        neighborhood
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
          street,
          number,
          neighborhood
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

export { UserContext, UserContextProvider}  */