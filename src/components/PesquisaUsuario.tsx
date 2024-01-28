import React, { useState, useEffect, ReactNode } from 'react';
import { FiTrash, FiX, FiCornerUpLeft } from 'react-icons/fi';
import { api } from '../services/api';
import Logo from '../img/logo.png';
import { Link, useHistory } from 'react-router-dom';
import Footer from './Footer';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  telefone: string;
  endereco: string;
  created_at: string;
}

interface PesquisaUsuarioProps {
  onLogout: () => void;
}

const SuccessMessage: React.FC = () => {
  return (
    <div className="bg-green-500 text-white p-2 rounded mt-2">
      Cliente excluído com sucesso!
    </div>
  );
};

const PesquisaUsuario: React.FC<PesquisaUsuarioProps> = ({ onLogout }): ReactNode => {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    const userConfirmed = window.confirm("Você tem certeza que deseja excluir esse cliente?");

    if (userConfirmed) {
      try {
        await api.delete("/customer", {
          params: {
            id: id,
          },
        });

        const updatedCustomers = customers.filter((customer) => customer.id !== id);
        setCustomers(updatedCustomers);
        showSuccess();
      } catch (error) {
        console.error(error);
      }
    }
  }

  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    onLogout();
    history.push('/login');
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl relative">
        <img
          src={Logo}
          alt="Logo da empresa"
          title="Logo da empresa"
          className="mx-auto mb-4 my-auto h-20 "
        />
        <h1 className="text-4xl font-medium text-white text-center mb-6">
          Pesquisar Cliente
        </h1>
        <input
          type="text"
          placeholder="Pesquisar cliente."
          className="w-full mb-5 p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {showSuccessMessage && <SuccessMessage />}

        <section className="flex flex-col gap-4">
          {filteredCustomers.map((customer) => (
            <article
              key={customer.id}
              className=" w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
            >
              <p><span className="font-medium">Nome:</span> {customer.name}</p>
              <p><span className="font-medium">Email:</span> {customer.email} </p>
              <p><span className="font-medium">Telefone:</span> {customer.telefone} </p>
              <p><span className="font-medium">Endereço:</span> {customer.endereco} </p>

              <button
                className="bg-red-500  hover:bg-red-400 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2 hover:scale-110 duration-200"
                onClick={() => handleDelete(customer.id)}
              >
                <FiTrash size={18} color="#FFF" />
              </button>
            </article>
          ))}
        </section>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded fixed top-0 right-0 m-4 hover:bg-red-400"
          title="Logout"
        >
          <FiX />
        </button>

        <div className="flex flex-col items-center mx-auto my-6">
          <Link to="/">
            <button className="bg-gray-500 text-white w-64 p-2 px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-gray-400">
              Voltar para a Página Principal 
              <FiCornerUpLeft className="ml-2 text-xl" />
            </button>
          </Link>
        </div>

        <div className="flex-grow"></div> 
      
      <div>
        <Footer />
      </div>
     
      </main>
      


    </div>
  );
};

export default PesquisaUsuario;