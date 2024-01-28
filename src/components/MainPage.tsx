import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom'; 
import Logo from '../img/logo.png';
import Footer from './Footer';
import { FiX } from 'react-icons/fi';
import { FiUserPlus } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

interface MainPageProps {
  onLogout: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ onLogout }): ReactNode => {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col justify-between px-4">
      <main className="my-10 flex-grow w-full md:max-w-2xl relative">
        <img
          src={Logo}
          alt="Logo da empresa"
          title="Logo da empresa"
          className="mx-auto my-auto h-20 mb-4"
        />
        <h1 className="text-4xl font-medium text-white text-center mb-8">
          Bem-vindo!
        </h1>

        <div className="flex flex-col items-center">
          <Link to="/cadastro-usuario">
            <button className="bg-blue-500 text-white px-8 py-4 rounded mb-4 hover:bg-blue-400 flex items-center text-3xl ">
              Cadastrar Cliente
              <FiUserPlus className="ml-2 text-3xl" />
            </button>
          </Link>

          <Link to="/pesquisa-usuario">
            <button className="bg-green-500 text-white px-8 py-4 rounded hover:bg-green-400 flex items-center text-3xl">
              Pesquisar Cliente
              <FiSearch className="ml-2 text-3xl" />
            </button>
          </Link>
        </div>
      </main>

      <Footer />

      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 rounded fixed top-0 right-0 m-4 hover:bg-red-400"
        title="Logout"
      >
        <FiX />
      </button>
    </div>
  );
};

export default MainPage;