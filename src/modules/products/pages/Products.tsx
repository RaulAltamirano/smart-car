// src/components/Products.tsx
import React, { useState } from 'react';
import { FaHeart, FaStar, FaEye } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: any;
  rating: number;
  image: string;
  description: string;
}

const products: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  price: (Math.random() * 100).toFixed(2),
  rating: Math.round(Math.random() * 5),
  image: "https://via.placeholder.com/150",
  description: `Descripción breve del producto ${i + 1}.`,
}));

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [sortOrder, setSortOrder] = useState("default");

  const openQuickView = (product: Product) => setSelectedProduct(product);
  const closeQuickView = () => setSelectedProduct(null);

  // Manejo de Paginación
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products
    .sort((a, b) => {
      if (sortOrder === "price-asc") return parseFloat(a.price) - parseFloat(b.price);
      if (sortOrder === "price-desc") return parseFloat(b.price) - parseFloat(a.price);
      if (sortOrder === "rating") return b.rating - a.rating;
      return 0;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Desplaza hacia arriba al cambiar de página
  };

  return (
    <div className="pt-16  min-h-screen">
              {/* Barra de Filtros y Ordenamiento */}
      <div className="flex justify-between items-center mb-6 sticky top-0  z-10 py-4">
        <h2 className="text-3xl font-bold text-gray-800">Productos</h2>
        <div className="flex space-x-4">
          <select
            className="p-2 border rounded-lg bg-white"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor calificación</option>
          </select>
          <input
            type="text"
            placeholder="Buscar producto..."
            className="p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Contenedor de Tarjetas de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 group"
          >
            {/* Imagen del Producto */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />

            {/* Información del Producto */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <div className="flex items-center space-x-1 text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < product.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-gray-600 text-sm ml-2">{product.rating}</span>
              </div>
            </div>

            {/* Opciones de Interacción */}
            <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
                <FaHeart className="text-red-500" />
              </button>
              <button
                onClick={() => openQuickView(product)}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-200"
              >
                <FaEye className="text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i + 1 ? "bg-primary text-white" : "bg-white text-primary"
            } border border-primary hover:bg-primary hover:text-white transition-colors`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal de Vista Rápida */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={closeQuickView}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h3>
            <p className="text-gray-600 text-lg mb-2">${selectedProduct.price}</p>
            <div className="text-gray-700">{selectedProduct.description}</div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-primary-dark transition">
              Añadir al Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
