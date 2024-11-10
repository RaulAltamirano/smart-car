// src/components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5; // Máximo de páginas visibles en la paginación
  const rangeStart = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const rangeEnd = Math.min(totalPages, rangeStart + maxPagesToShow - 1);

  // Navegación a una página específica y desplazamiento hacia arriba
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo(0, 0); // Desplazar hacia arriba al cambiar de página
    }
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-white"} text-primary border border-primary hover:bg-primary hover:text-white transition-colors`}
      >
        Primera
      </button>

      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-white"} text-primary border border-primary hover:bg-primary hover:text-white transition-colors`}
      >
        Anterior
      </button>

      {rangeStart > 1 && (
        <button
          onClick={() => goToPage(rangeStart - 1)}
          className="px-4 py-2 rounded-lg bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
        >
          ...
        </button>
      )}

      {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => rangeStart + i).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page ? "bg-primary text-white" : "bg-white text-primary"
          } border border-primary hover:bg-primary hover:text-white transition-colors`}
        >
          {page}
        </button>
      ))}

      {rangeEnd < totalPages && (
        <button
          onClick={() => goToPage(rangeEnd + 1)}
          className="px-4 py-2 rounded-lg bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
        >
          ...
        </button>
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-white"} text-primary border border-primary hover:bg-primary hover:text-white transition-colors`}
      >
        Siguiente
      </button>

      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-white"} text-primary border border-primary hover:bg-primary hover:text-white transition-colors`}
      >
        Última
      </button>
    </div>
  );
};

export default Pagination;
