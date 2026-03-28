import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { InicioPage } from "./pages/InicioPage";
import { Sermones } from "./pages/Sermones";
//import { Bandas } from "./pages/Bandas";
//import { LaIglesia } from "./pages/LaIglesia";
import { useVisitTracker } from "./hooks/useVisitTracker";

const EnConstruccion = ({ nombre }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <span className="text-6xl mb-4">🚧</span>
    <h2 className="text-2xl font-bold text-gray-700 mb-2">{nombre}</h2>
    <p className="text-gray-500 text-lg">Estamos trabajando en esta página. ¡Volvé pronto!</p>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState('inicio');
  
  // Registra cada visita al cargar la app
  useVisitTracker();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      {currentView === 'inicio' && <InicioPage setCurrentView={setCurrentView} />}
      {currentView === 'sermones' && <Sermones />}
      {currentView === 'bandas' && <EnConstruccion nombre="Bandas" />}
      {currentView === 'iglesia' && <EnConstruccion nombre="La Iglesia" />}
      
      <Footer />
    </div>
  );
}