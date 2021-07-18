import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { OrderContextProvider } from '../src/context/orderContext';
import { Home } from './pages/home'
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <OrderContextProvider>
        <Switch>
          <Route path="/" exact component={ Home } />
        </Switch>
      </OrderContextProvider>
    </BrowserRouter>
  );
}

export default App;
