// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { FaUserCircle, FaShoppingCart, FaHeart } from 'react-icons/fa';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
  cartCount: number;
  wishlistCount: number;
  userName?: string;
  userAvatar?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  onLogout,
  onLoginClick,
  cartCount = 0,
  wishlistCount = 0,
  userName = "Usuario",
  userAvatar = "",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [wishlistAnimation, setWishlistAnimation] = useState(false);

  useEffect(() => {
    // Añadir animación al cambiar el carrito o wishlist
    if (cartCount > 0) {
      setCartAnimation(true);
      setTimeout(() => setCartAnimation(false), 500);
    }
    if (wishlistCount > 0) {
      setWishlistAnimation(true);
      setTimeout(() => setWishlistAnimation(false), 500);
    }
  }, [cartCount, wishlistCount]);

  useEffect(() => {
    // Cambia el estado de "isScrolled" al hacer scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-primary shadow-lg" : "bg-primary/60"
        } text-white p-4 backdrop-blur-lg`}
    >
      {/* Contenedor de Navegación */}
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo y Título */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="./src/assets/logo.svg" alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold">Smart-Car</span>
        </Link>

        {/* Opciones para Usuario Autenticado */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-6">
            {/* Ícono de Wishlist */}
            <Link to="/wishlist" className="relative">
              <FaHeart
                className={`text-2xl ${wishlistAnimation ? 'animate-bounce' : ''
                  } hover:text-red-500 transition-colors`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Ícono de Carrito */}
            <Link to="/cart" className="relative">
              <FaShoppingCart
                className={`text-2xl ${cartAnimation ? 'animate-bounce' : ''
                  } hover:text-yellow-500 transition-colors`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Dropdown con Avatar del Usuario */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center focus:outline-none">
                <img
                  src={userAvatar || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </MenuButton>

              <Transition
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-lg shadow-lg focus:outline-none z-10">
                  <div className="px-4 py-3">
                    <span className="text-gray-900 font-semibold">{userName}</span>
                  </div>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${active ? 'bg-gray-100' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                      >
                        Mi Perfil
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={onLogout}
                        className={`${active ? 'bg-gray-100' : ''
                          } w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                      >
                        Cerrar Sesión
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        ) : (
          <button onClick={onLoginClick} className="bg-success px-4 py-2 rounded-lg text-white">
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
