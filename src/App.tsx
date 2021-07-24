import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { OrderContextProvider } from '../src/context/orderContext';
import { UserContextProvider } from './context/userContext';
import { Home } from './pages/home';
import { User } from './pages/user';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <OrderContextProvider>
        <UserContextProvider>
          <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/user" component={ User } />
          </Switch>
        </UserContextProvider>
      </OrderContextProvider>
    </BrowserRouter>
  );
}

export default App;
