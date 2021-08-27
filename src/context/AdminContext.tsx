import { createContext, useEffect, useState } from 'react';
// Hooks
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu';
// Utils
import { newNotification } from '../utils/newNotification';
import { convertAddressToURL } from '../utils/converteAddressToURL';
// Database Connection
import { database } from '../services/firebase';
// Types
import { ChildrenProps, OrdersProps } from '../types/index';
// Third party library
import Swal from 'sweetalert';


type AdminContextProps = {
  newOrders: OrdersProps[] | undefined;
  shippingOrders: OrdersProps[] | undefined;
  selectedOrder: OrdersProps | null;
  selectedPage: string;
  setSelectedPage:(page:string)=>void;
  selectOrderToShowDetails:(id:string|null)=>void;
  setOrderToShipping:(id:string)=>void;
  endOrder:(id:string)=>void;
  handleMenu:(id:string)=>void;
  updateMenu:()=>void;
}

type FirebaseOrders = Record<string,OrdersProps>;

const AdminContext = createContext({} as AdminContextProps);

function AdminContextProvider({children}:ChildrenProps){
  
  const [ newOrders, setNewOrders ] = useState<OrdersProps[]>();
  const [ shippingOrders, setShippingOrders ] = useState<OrdersProps[]>();
  const [ selectedOrder, setSelectedOrder ] = useState<OrdersProps|null>(null);
  const [ selectedPage, setSelectedPage ] = useState(String);
  const { userAuth } = useAuth();
  const { menu, setMenu } = useMenu();
  const history = useHistory();

  useEffect(() => {
    if(!userAuth){
      history.push('/login');
    }
    
  }, [userAuth, history])

  useEffect(() => {
    let isFirstLoad = true;
    const ordersRef = database.ref('orders');

    ordersRef.on('value',snap=>{
      isFirstLoad = false;

      const data:FirebaseOrders = snap.val()?? {};
      const arrayOfOrders:OrdersProps[] = Object.entries(data)?.map(([id,value])=>({
        ...value,
        encodedAddress: convertAddressToURL(value),
        id
      }));
      
      const _newOrders = arrayOfOrders.filter(({status})=>status==='new');
      const _shippingOrders = arrayOfOrders.filter(({status})=>status==='shipping');
      setNewOrders(_newOrders);                                                                                                                                                                                                                                                                          
      setShippingOrders(_shippingOrders); 
    });
    
    ordersRef.on('child_added',(snap)=>{
      if(!isFirstLoad){
        newNotification();
      }
    });

    return () => {
      ordersRef.off(); 
    }
  }, [userAuth])
  

  
  function selectOrderToShowDetails(id:string|null){
    if(!id){
      setSelectedOrder(null);
      return;
    }
    if(newOrders && shippingOrders){
      const _selectedOrder = [...newOrders,...shippingOrders].find(order=>order.id === id)?? null;
      setSelectedOrder(_selectedOrder);
    }
  }

  async function setOrderToShipping(id:string){
    try {
      await database.ref(`orders/${id}`)
      .update({ status: 'shipping' })
      
      history.push('/admin/new-orders');
      setSelectedOrder(null);
      
    } catch (err) {
      Swal('Algo deu errado', 'Tente novamente', 'error');
      console.error(err);
      
    }
  }

  async function endOrder(id:string){
    try {
      await database.ref(`orders/${id}`).remove()
      Swal('Pedido entregue com sucesso','','success', { timer:2000 });
      history.push('/admin/shipping');
      setSelectedOrder(null);
      
    } catch (err) {
      Swal('Algo deu errado','Tente novamente','error');
      console.error(err);
    }
  }

   
  function handleMenu(id:string){
    const updatedMenu = menu.map(item=>item.id===id? { ...item, isAvailable: !item.isAvailable } : { ...item });
    setMenu(updatedMenu); 
  }

  async function updateMenu(){
    const userResponse = await Swal('Deseja atualizar o cardápio?','',{ buttons:['Voltar','Confirmar']});
    if(userResponse){
      database.ref('menu').set(menu, (err)=>{ 
        if(!err){
          Swal('Cardápio atualizado',{ icon:'success'});
        
        } else {
          Swal('Algo não deu certo','Um erro ocorreu, tente mais tarde ou confira suas credenciais','error');
          
        }
      });
    }
  }

  return(
    <AdminContext.Provider value={{
      newOrders,
      shippingOrders,
      selectedOrder,
      selectedPage,
      setSelectedPage,
      selectOrderToShowDetails,
      setOrderToShipping,
      endOrder,
      handleMenu,
      updateMenu
    }}>
      {children}
    </AdminContext.Provider>
  )
}
export { AdminContext, AdminContextProvider }
