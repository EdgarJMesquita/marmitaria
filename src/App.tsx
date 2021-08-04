import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { OrderContextProvider } from './context/OrderContext';
import { UserContextProvider } from './context/UserContext';
import { AuthContextProvider } from './context/AuthContext';
import { AdminContextProvider } from './context/AdminContext';

import { Home } from './pages/home';
import { Cadastro } from './pages/cadastro';
import { NewOrders } from './pages/admin/new-orders';
import { Shipping } from './pages/admin/shipping';
import { OrderDetails } from './pages/admin/order-details';
import { Login } from './pages/admin';

import './styles/global.scss';
import { Container } from './components/Container';

function App() {
  return (
    <Container classname="responsive">
      <BrowserRouter>
        <Switch>
          <OrderContextProvider>
            <AuthContextProvider>
              <UserContextProvider>
                <AdminContextProvider> 
                  <Route path="/" exact component={ Home } />
                  <Route path="/cadastro" component={ Cadastro } />
                  <Route path="/admin" exact component={ Login }/>
                  <Route path="/admin/shipping" component={ Shipping }/>
                  <Route path="/admin/new-orders" component={ NewOrders }/>
                  <Route path="/admin/order-details/:orderId" component={ OrderDetails }/>
                </AdminContextProvider>
              </UserContextProvider>
            </AuthContextProvider>
          </OrderContextProvider>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}
export default App;


/* import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { OrderContextProvider } from './context/OrderContext';
import { UserContextProvider } from './context/UserContext';
import { Home } from './pages/home';
import { Cadastro } from './pages/cadastro';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <OrderContextProvider>
        <UserContextProvider>
          <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/cadastro" component={ Cadastro } />
          </Switch>
        </UserContextProvider>
      </OrderContextProvider>
    </BrowserRouter>
  );
}

export default App;
 */