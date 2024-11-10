// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './modules/core/components/Navbar';
import LoginForm from './modules/auth/pages/LoginForm';
import Products from './modules/products/pages/Products';
// import Navbar from './components/Navbar';
// import LoginForm from './modules/LoginForm';
// import ProductsModule from './modules/ProductsModule';
// import OrdersModule from './modules/OrdersModule';
// import UsersModule from './modules/UsersModule';
// import AnalyticsModule from './modules/AnalyticsModule';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishistCount] = useState(0);
  // const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    // navigate('/products');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // navigate('/');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          onLoginClick={() => setIsAuthenticated(false)}
        />

        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <div className="text-center space-y-8">
                    <h1 className="text-5xl font-bold text-primary">Bienvenido a Nuestro Sistema</h1>
                    <p className="text-lg text-gray-700">Explore nuestros módulos para gestionar su negocio de manera efectiva.</p>

                    <div className="grid grid-cols-2 gap-8 mt-8 max-w-xl">
                      {/* Tarjetas de Módulos */}
                      <ModuleCard
                        title="Autenticación"
                        description="Gestione el acceso y la seguridad del sistema."
                        link="/auth"
                        icon="🔒"
                      />
                      <ModuleCard
                        title="Productos"
                        description="Controle su inventario de productos."
                        link="/products"
                        icon="📦"
                      />
                      <ModuleCard
                        title="Pedidos"
                        description="Administre los pedidos y la logística."
                        link="/orders"
                        icon="🛒"
                      />
                      <ModuleCard
                        title="Usuarios"
                        description="Gestione los roles y perfiles de usuario."
                        link="/users"
                        icon="👥"
                      />
                      <ModuleCard
                        title="Análisis"
                        description="Revise reportes y métricas de ventas."
                        link="/analytics"
                        icon="📊"
                      />
                    </div>
                  </div>
                ) : (
                  <LoginForm
                    // navigate={navigate} 
                    onLogin={handleLogin} />
                )
              }
            />

            {/* Rutas de Módulos */}
            <Route path="/products/*" element={<Products />} />
            {/* <Route path="/orders/*" element={<OrdersModule />} />
            <Route path="/users/*" element={<UsersModule />} />
            <Route path="/analytics/*" element={<AnalyticsModule />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const ModuleCard: React.FC<{ title: string; description: string; link: string; icon: string }> = ({ title, description, link, icon }) => {
  return (
    <Link to={link} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200 hover:bg-blue-50">
      <span className="text-4xl mb-4">{icon}</span>
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="text-sm text-gray-600 text-center mt-2">{description}</p>
    </Link>
  );
};



export default App;


