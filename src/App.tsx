import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Context
import { MenuContextProvider } from './context/MenuContext';
import { AuthContextProvider } from './context/AuthContext';
 
// Sub Routes
import { AdminRouter } from './pages/Admin/AdminRouter';
import { Cadastro } from './pages/Client/Cadastro';
import { Home } from './pages/Client/Home';
//import { NotFound } from './pages/NotFound';

import './styles/global.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextProvider>
          <MenuContextProvider>
            <Route path="/" exact component={ Home }/>
            <Route path="/cadastro" component={ Cadastro }/>
            <Route path="/admin" component={ AdminRouter }/>
            {/* <Route path="*" component={ NotFound }/> */}
          </MenuContextProvider>
        </AuthContextProvider>
      </Switch>
    </BrowserRouter>
  );
}