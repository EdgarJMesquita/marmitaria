import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Context
import { MenuContextProvider } from './context/MenuContext';
import { AuthContextProvider } from './context/AuthContext';
 
// Sub Routes
import { AdminRouter } from './pages/Admin/AdminRouter';
import { ClientRouter } from './pages/Client/UserRouter';

import './styles/global.scss';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextProvider>
          <MenuContextProvider>
            <Route path="/" component={ ClientRouter }/> 
            <Route path="/admin" component={ AdminRouter }/>
            <Route path="*" component={ NotFound }/>
          </MenuContextProvider>
        </AuthContextProvider>
      </Switch>
    </BrowserRouter>
  );
}