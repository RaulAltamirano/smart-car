// src/modules/LoginForm.tsx
import React from 'react';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(); // Llama a la función onLogin del padre para actualizar el estado de autenticación
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">Iniciar Sesión</h2>
      
      <input
        type="text"
        placeholder="Nombre de usuario"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
