import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Context
import { OrderContextProvider } from './context/OrderContext';
import { AuthContextProvider } from './context/AuthContext';
 
// Sub Routes
import { AdminRouter } from './pages/Admin/AdminRouter';
import { ClientRouter } from './pages/Client/UserRouter';

import './styles/global.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextProvider>
          <OrderContextProvider>
            <Route path="/" component={ ClientRouter }/> 
            <Route path="/admin" component={ AdminRouter }/>
          </OrderContextProvider>
        </AuthContextProvider>
      </Switch>
    </BrowserRouter>
  );
}