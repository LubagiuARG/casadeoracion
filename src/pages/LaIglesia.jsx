export function LaIglesia() {
  return (
    <div className="w-full max-w-none px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Nuestra Iglesia</h1>

      {/* Galería de Imágenes del Templo */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Nuestro Templo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gradient-to-br from-blue-200 to-blue-400 h-64 rounded-xl shadow-lg flex items-center justify-center">
              <div className="text-center text-white">
                <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">Foto del Templo {i}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          En tu proyecto real, aquí irían las fotos reales del templo
        </p>
      </div>

      {/* Reseña Histórica */}
      <div className="mb-12 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Nuestra Historia</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            Fundada en [año], nuestra iglesia ha sido un pilar de fe y comunidad en [ciudad] 
            durante más de [X] años. Comenzamos como una pequeña congregación de [número] 
            familias que se reunían en [lugar inicial], con el deseo compartido de adorar a 
            Dios y servir a nuestra comunidad.
          </p>
          <p>
            A lo largo de los años, hemos crecido no solo en número, sino también en nuestra 
            capacidad de servir. En [año], construimos nuestro actual templo, un espacio que 
            refleja nuestro compromiso con la adoración y el servicio comunitario. El templo 
            fue diseñado para ser un lugar acogedor donde todas las personas puedan encontrar 
            paz, esperanza y comunidad.
          </p>
          <p>
            Hoy en día, somos una comunidad vibrante de creyentes comprometidos con la enseñanza 
            bíblica, la adoración significativa y el servicio activo a nuestro prójimo. Nuestros 
            ministerios incluyen educación cristiana, alcance comunitario, grupos de apoyo, y 
            actividades para todas las edades.
          </p>
        </div>
      </div>

      {/* Autoridades */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Autoridades de la Iglesia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-800">Pastor Principal</h3>
            <p className="text-gray-600">Rev. [Nombre]</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-800">Pastor Asociado</h3>
            <p className="text-gray-600">Rev. [Nombre]</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-800">Anciano/Diácono</h3>
            <p className="text-gray-600">[Nombre]</p>
          </div>
        </div>
      </div>
    </div>
  );
}
