import React, { useState, useRef, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiX, FiCornerUpLeft, FiCheck } from 'react-icons/fi';
import { api } from '../services/api';
import Logo from '../img/logo.png';
import Footer from './Footer';

interface CadastroUsuarioProps {
  onLogout: () => void;
}

const CadastroUsuario: React.FC<CadastroUsuarioProps> = ({ onLogout }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);
  const enderecoRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current?.value || !telefoneRef.current?.value) {
      setErrorMessage('Nome e telefone são obrigatórios.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);

      return;
    }

    try {
      await api.post('/customer', {
        name: nameRef.current?.value,
        telefone: telefoneRef.current?.value,
        email: emailRef.current?.value || '',
        endereco: enderecoRef.current?.value || '',
      });

      setSuccessMessage('Cliente cadastrado com sucesso!');
      if (nameRef.current) nameRef.current.value = '';
      if (telefoneRef.current) telefoneRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (enderecoRef.current) enderecoRef.current.value = '';

      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (error: any) {
      console.error('Erro na requisição:', error);

      if (error.response) {
        console.error('Resposta do servidor:', error.response.data);
      }
      setErrorMessage('Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente.');
    }
  }

  const handleLogout = () => {
    onLogout();
    history.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
    <div>
      <img
        src={Logo}
        alt="Logo da empresa"
        title="Logo da empresa"
        className="mx-auto mb-4 my-auto h-20 "
      />
      <h1 className="text-4xl font-medium text-white text-center mb-6">
        Cadastrar novo cliente
      </h1>
      
      {successMessage && (
        <div className="bg-green-300 p-2 rounded mt-2">{successMessage}</div>
      )}

      {errorMessage && (
        <div className="bg-red-300 p-2 rounded mt-2">{errorMessage}</div>
      )}

      <div className="flex flex-col items-center mx-auto my-6">
        <form className="w-full" onSubmit={handleSubmit}>
          <label className=" text-white">Nome:</label>
          <input
            type="text"
            placeholder="Nome completo."
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />

          <label className=" text-white">Email:</label>
          <input
            type="email"
            placeholder="Email do cliente."
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />

          <label className=" text-white">Telefone:</label>
          <input
            type="text"
            placeholder="Telefone do cliente."
            className="w-full mb-5 p-2 rounded"
            ref={telefoneRef}
          />

          <label className=" text-white">Endereço:</label>
          <input
            type="text"
            placeholder="Endereço do cliente."
            className="w-full mb-5 p-2 rounded"
            ref={enderecoRef}
          />

          <button
            type="submit"
            className="cursor-pointer w-64 p-2 bg-green-500 rounded flex items-center justify-center hover:bg-green-400 mx-auto my-6"
          >
            Cadastrar
            <FiCheck className="ml-2 text-xl" />
          </button>
        </form>

        <Link to="/">
          <button className="bg-gray-500 text-white w-64 p-2 px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-gray-400">
            Voltar para a Página Principal
            <FiCornerUpLeft className="ml-2 text-xl" />
          </button>
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded fixed top-0 right-0 m-4 hover:bg-red-400"
        title="Logout"
      >
          <FiX />
        </button>
      </div>
      
      <div className="flex-grow"></div> 
      
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CadastroUsuario;