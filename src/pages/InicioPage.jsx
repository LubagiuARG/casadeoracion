import paloma from '../assets/paloma.png';
export function InicioPage({ setCurrentView }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-none px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-center mb-16">
            <img
              src={paloma}
              alt="portada"
              className="w-64 h-64 mx-auto object-cover rounded-full shadow-2xl"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Bienvenidos a Nuestra Iglesia
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Santidad a Jehova
          </p>
        </div>

        {/* Botones de Acceso */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <button
            onClick={() => setCurrentView('sermones')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Sermones</h3>
            <p className="text-gray-600">
              Escucha las enseñanzas y mensajes inspiradores
            </p>
          </button>

          <button
            onClick={() => setCurrentView('bandas')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Banda de Música</h3>
            <p className="text-gray-600">
              Disfruta de las alabanzas y adoración musical
            </p>
          </button>

          <button
            onClick={() => setCurrentView('iglesia')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">La Iglesia</h3>
            <p className="text-gray-600">
              Conoce nuestra historia, templo y autoridades
            </p>
          </button>
        </div>

        {/* Información adicional */}
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Horarios de Culto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Domingos</h3>
              <p className="text-gray-700">17:00 PM - Culto Central de Adoración</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Miércoles</h3>
              <p className="text-gray-700">19:00 PM - Estudio Bíblico</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}