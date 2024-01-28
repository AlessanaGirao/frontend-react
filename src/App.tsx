import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';
import CadastroUsuario from './components/CadastroUsuario';
import PesquisaUsuario from './components/PesquisaUsuario'; 

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  );

  useEffect(() => {
    console.log('Verificando estado de autenticação...');
    setAuthenticated(localStorage.getItem('authenticated') === 'true');
  }, []);

  const handleLogin = () => {
    console.log('Realizando login...');
    setAuthenticated(true);
    localStorage.setItem('authenticated', 'true');
  };

  const handleLogout = () => {
    console.log('Realizando logout...');
    setAuthenticated(false);
    localStorage.removeItem('authenticated');
  };

  return (
    <Router>
      <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4 font-body">
        <main className="my-10 w-full md:max-w-2xl">
          <Switch>
            <Route path="/cadastro-usuario">
              <CadastroUsuario onLogout={handleLogout} />
            </Route>
            <Route path="/pesquisa-usuario">
              <PesquisaUsuario onLogout={handleLogout} /> 
            </Route>
            <Route path="/">
              {authenticated ? (
                <MainPage onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}