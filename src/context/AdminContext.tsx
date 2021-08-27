// Hooks
import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu';
// Utils
import { newNotification } from '../utils/newNotification';
import { conveteAddressToURL } from '../utils/converteAddressToURL';
// Database Connection
import { database } from '../services/firebase';
// Types
import { ChildrenProps, OrdersProps } from '../types/index';
import Swal from 'sweetalert';



type AdminContextProps = {
  newOrders: OrdersProps[] | undefined;
  shippingOrders: OrdersProps[] | undefined;
  selectedOrder: OrdersProps | null;
  selectedPage: string;
  setSelectedPage:(page:string)=>void;
  selectOrderToShowDetails:(id:string)=>void;
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

  
  function handleMenu(id:string){
    const updatedMenu = menu.map(item=>item.id===id? { ...item, isAvailable: !item.isAvailable } : { ...item });
    setMenu(updatedMenu);
    
  }

  async function updateMenu(){
    const userResponse = await Swal('Deseja atualizar o menu?','',{buttons:['Voltar','Confirmar']});
    if(userResponse){
      database.ref('menu').set(menu, err=>  err && console.log('Error'+err));
    }
  }

  useEffect(() => {
    let isFirstLoad = true;
    const ordersRef = database.ref('orders');

    ordersRef.on('value',snap=>{
      isFirstLoad = false;

      const data:FirebaseOrders = snap.val()?? {};
      const arrayOfOrders:OrdersProps[] = Object.entries(data)?.map(([id,value])=>({
        ...value,
        encodedAddress: conveteAddressToURL(value),
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
    
/*   function getOrderDetails(id:string){(
    newOrders && shippingOrders && [...newOrders,...shippingOrders].find(order=>order.id === id)
  )} */
  
  function selectOrderToShowDetails(id:string){
    if(!id){
      setSelectedOrder(null);
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
      selectOrderToShowDetails('');
      
    } catch (err) {
      Swal('Algo deu errado', 'Tente novamente', 'error');
      console.log(err);
      
    }
   /*  database.ref(`orders/${id}`)
    .update({
      status: 'shipping'
    })
    .then(()=>{
      history.push('/admin/new-orders');
      selectOrderToShowDetails('');
    })  
    .catch(err=>{
      Swal('Algo deu errado', 'Tente novamente', 'error');
      console.log(err);
    }) */
  }

  async function endOrder(id:string){
    
    try {
      await database.ref(`orders/${id}`).remove()
      Swal('Pedido entregue com sucesso','','success', { timer:2000 });
      history.push('/admin/shipping');
      selectOrderToShowDetails('');
      
    } catch (error) {
      Swal('Algo deu errado','Tente novamente','error');
      
    }
   /*  database.ref(`orders/${id}`).remove()
    .then(()=>{
      Swal('Pedido entregue com sucesso','','success', { timer:2000 });
      history.push('/admin/shipping');
      selectOrderToShowDetails('');

      })
    .catch(err=>{
      Swal('Algo deu errado','Tente novamente','error');
    }) */
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
