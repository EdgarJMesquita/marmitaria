
import { createContext, ReactNode, useEffect, useState } from 'react';

import { database } from '../services/firebase';

type ContextProps = {
  children: ReactNode;
}

const AdminContext = createContext({} as any);



function AdminContextProvider({children}:ContextProps){
  const [ newOrders, setNewOrders ] = useState();
  
  useEffect(() => {
    const ordersRef = database.ref('orders')
    ordersRef.on('value',snap=>{
      const data = snap.val();
      setNewOrders(data);
      console.log(data);
    })
    return () => {
      ordersRef.off()
    }
  }, [])

  return(
    <AdminContext.Provider value={{
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export { AdminContext, AdminContextProvider }