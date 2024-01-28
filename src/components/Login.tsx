import React, { useState } from 'react';
import Logo from '../img/logo.png';
import Footer from './Footer';



interface FormState {
  username: string;
  password: string;
}

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const initialFormState: FormState = {
    username: '',
    password: '',
  };

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setError('');
  };

  const handleLogin = () => {

    if (formState.username === 'admin' && formState.password === '123') {
      console.log('Login bem-sucedido!');
      onLogin(); 
    } else {
      setError('Usuário ou senha inválidas. Tente novamente.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="font-body">
      
      <img 
        src={Logo} 
        alt="Logo da empresa" 
        title="Logo da empresa" 
        className="mx-auto my-auto h-20 mb-3 "
      />
      <h2 className="text-2xl font-medium text-white text-center mb-3 ">Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="text-xl text-white">
          Usuário:
          <input
            type="text"
            name="username"
            placeholder="usuário"
            className="w-full mb-3 p-2 rounded"
            style={{ color: 'black' }}
            value={formState.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="text-xl text-white">
          Senha:
          <input
            type="password"
            name="password"
            placeholder="*******"
            className="w-full mb-3 p-2 rounded"
            style={{ color: 'black' }}
            value={formState.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input 
          type="submit"
          value="Entrar"
          className="cursor-pointer w-64 p-2 bg-green-500 rounded text-xl mx-auto block hover:bg-green-400"
        />
      </form>
      <Footer/>
    </div>
  );
};

export default Login;