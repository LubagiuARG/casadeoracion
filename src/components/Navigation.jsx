import { useState } from "react";

export function Navigation({ currentView, setCurrentView }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: "inicio", label: "Inicio" },
    { key: "sermones", label: "Sermones" },
    { key: "bandas", label: "Banda de Música" },
    { key: "iglesia", label: "La Iglesia" },
  ];

  return (
    <div className="bg-blue-600 text-white shadow-md">
      <div className="w-full max-w-7xl mx-auto px-4">

        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          <span className="font-bold text-lg">Casa de Oracion y Restauracion</span>

          {/* Botón hamburguesa (solo mobile) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú"
          >
            ☰
          </button>

          {/* Navegación desktop */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setCurrentView(item.key)}
                className={`px-4 py-2 font-semibold transition-colors ${
                  currentView === item.key
                    ? "bg-white text-blue-600 rounded-md"
                    : "hover:bg-blue-700 rounded-md"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menú mobile desplegable */}
        {isOpen && (
          <div className="md:hidden flex flex-col pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentView(item.key);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-md font-semibold transition-colors ${
                  currentView === item.key
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}