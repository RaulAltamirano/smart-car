// src/components/Products.tsx
import React, { useState, useEffect } from 'react';
import { FaHeart, FaStar, FaEye, FaSearch } from 'react-icons/fa';
import Pagination from '../../shared/components/Pagination';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

const productsData: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  price: parseFloat((Math.random() * 100).toFixed(2)),
  rating: Math.round(Math.random() * 5),
  image: "https://via.placeholder.com/150",
  description: `Descripción breve del producto ${i + 1}.`,
}));

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);

  const openQuickView = (product: Product) => setSelectedProduct(product);
  const closeQuickView = () => setSelectedProduct(null);

  // Filtrar y ordenar productos
  useEffect(() => {
    let results = productsData.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortOrder === "price-asc") {
      results = results.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      results = results.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "rating") {
      results = results.sort((a, b) => b.rating - a.rating);
    }
    setFilteredProducts(results);
  }, [searchQuery, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="p-16">
      {/* Barra de Filtros, Búsqueda y Ordenamiento */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 sticky top-0 bg-white shadow-lg z-10 py-4 px-4 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800">Productos</h2>
        
        <div className="flex space-x-4 items-center mt-4 md:mt-0">
          <div className="relative">
            <FaSearch className="absolute left-2 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar producto..."
              className="pl-8 p-2 border rounded-lg bg-gray-50 w-48 md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="p-2 border rounded-lg bg-white"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor calificación</option>
          </select>
        </div>
      </div>

      {/* Contenedor de Tarjetas de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />

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

      {/* Componente de Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal de Vista Rápida */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-xl">
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
