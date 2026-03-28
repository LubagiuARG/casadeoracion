import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../services/supabaseClient";
import { toYouTubeEmbed } from "../utils/youtubeUtils";
import { useDebounce } from "../hooks/useDebounce";

const PAGE_SIZE = 20;

export function Bandas() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const loaderRef = useRef(null);

  const loadVideos = useCallback(async (reset) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);

    const currentPage = reset ? 0 : page;
    const from = currentPage * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    try {
      let query = supabase
        .from("videos_banda")
        .select("*")
        .order("fecha", { ascending: false });

      if (debouncedSearch.trim() !== "") {
        query = query.ilike("nombre_video", `%${debouncedSearch}%`);
      }

      const { data, error: dbError } = await query.range(from, to);

      if (dbError) {
        setError("Error al cargar videos de la banda");
        console.error(dbError);
        setLoading(false);
        return;
      }

      if (reset) {
        setVideos(data || []);
        if ((data || []).length > 0) {
          setSelectedVideo((data || [])[0]);
        }
      } else {
        setVideos((prev) => [...prev, ...(data || [])]);
      }

      setHasMore((data || []).length === PAGE_SIZE);
      
      if (reset) {
        setPage(1);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error loading bandas:", err);
      setError("Error de conexión");
      setHasMore(false);
    }

    setLoading(false);
  }, [page, loading, debouncedSearch]);

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setVideos([]);
    loadVideos(true);
  }, [debouncedSearch]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadVideos(false);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadVideos]);

  return (
    <div className="p-4 w-full max-w-none">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Banda de Música</h1>

      <input
        type="text"
        placeholder="Buscar alabanza por título..."
        className="w-full mb-6 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {selectedVideo && (
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <iframe
            className="w-full h-64 md:h-96 rounded-lg"
            src={toYouTubeEmbed(selectedVideo.link)}
            allowFullScreen
            title={selectedVideo.nombre_video}
          />
          <h2 className="text-2xl font-bold mt-4 text-gray-800">{selectedVideo.nombre_video}</h2>
          {selectedVideo.fecha && (
            <p className="text-sm text-gray-500 mt-2">{selectedVideo.fecha}</p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {videos.map((v) => (
          <div
            key={v.id || v.link}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedVideo && selectedVideo.link === v.link 
                ? 'bg-purple-50 border-purple-500 shadow-md' 
                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
            onClick={() => setSelectedVideo(v)}
          >
            <p className="font-semibold text-gray-800">{v.nombre_video}</p>
            {v.fecha && <p className="text-sm text-gray-500 mt-1">{v.fecha}</p>}
          </div>
        ))}
      </div>

      {videos.length === 0 && !loading && (
        <p className="text-center py-8 text-gray-500">
          {debouncedSearch ? "No se encontraron resultados" : "No hay videos disponibles"}
        </p>
      )}

      <div ref={loaderRef} className="h-10"></div>
      {loading && <p className="text-center py-4 text-gray-600">Cargando...</p>}
    </div>
  );
}