import { useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabaseClient";
import { toYouTubeEmbed } from "../utils/youtubeUtils";
import { useDebounce } from "../hooks/useDebounce";

const LIMIT_OPTIONS = [10, 50, 100, "Todos"];

export function Sermones() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [activeLimit, setActiveLimit] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const playerRef = useRef(null);
  const activeLimitRef = useRef(null);
  const isFirstRender = useRef(true);

  const executeLoad = async (searchTerm, lim, offset = 0, append = false) => {
    setLoading(true);
    if (!append) setError(null);
    try {
      let query = supabase
        .from("videos")
        .select("*")
        .order("fecha", { ascending: false });

      if (searchTerm.trim() !== "") {
        query = query.ilike("nombre_video", `%${searchTerm}%`);
      }

      if (lim !== "Todos") {
        query = query.range(offset, offset + lim - 1);
      }

      const { data, error: dbError } = await query;

      if (dbError) {
        setError("Error al cargar sermones");
        console.error(dbError);
        return;
      }

      const newData = data || [];
      if (append) {
        setVideos((prev) => [...prev, ...newData]);
      } else {
        setVideos(newData);
      }
      setHasMore(lim !== "Todos" && newData.length === lim);
    } catch (err) {
      console.error("Error loading sermones:", err);
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLatest = async () => {
      const { data } = await supabase
        .from("videos")
        .select("*")
        .order("fecha", { ascending: false })
        .limit(1)
        .single();
      if (data) setSelectedVideo(data);
    };
    fetchLatest();

    const fetchCount = async () => {
      const { count } = await supabase
        .from("videos")
        .select("*", { count: "exact", head: true });
      setTotalCount(count ?? 0);
    };
    fetchCount();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      let query = supabase.from("videos").select("*", { count: "exact", head: true });
      if (debouncedSearch.trim() !== "") {
        query = query.ilike("nombre_video", `%${debouncedSearch}%`);
      }
      const { count } = await query;
      setTotalCount(count ?? 0);
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setVideos([]);
    setSelectedVideo(null);
    setHasMore(false);
    fetchCount();

    if (activeLimitRef.current !== null) {
      executeLoad(debouncedSearch, activeLimitRef.current);
    }
  }, [debouncedSearch]);

  const handleLimitChange = (lim) => {
    setActiveLimit(lim);
    activeLimitRef.current = lim;
    setSelectedVideo(null);
    executeLoad(debouncedSearch, lim);
  };

  const handleLoadMore = () => {
    if (activeLimit !== "Todos") {
      executeLoad(debouncedSearch, activeLimit, videos.length, true);
    }
  };

  const handleSelectVideo = (v) => {
    setSelectedVideo(v);
    setTimeout(() => {
      playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="w-full max-w-none px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Sermones</h1>

      <input
        type="text"
        placeholder="Buscar sermón por título..."
        className="w-full mb-4 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {totalCount !== null && (
          <span className="text-gray-600 font-medium">
            {debouncedSearch.trim()
              ? `${totalCount} resultado(s) encontrado(s)`
              : `Total: ${totalCount} sermones`}
          </span>
        )}
        <div className="flex gap-2 ml-auto flex-wrap">
          <span className="text-sm text-gray-500 self-center">Mostrar:</span>
          {LIMIT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => handleLimitChange(opt)}
              className={`px-4 py-1.5 rounded-lg border-2 text-sm font-medium transition-all ${
                activeLimit === opt
                  ? "bg-blue-600 border-blue-600 text-white shadow-md"
                  : "bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {opt === "Todos" ? "Todos" : `${opt}`}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {selectedVideo && (
        <div ref={playerRef} className="mb-8 bg-white rounded-xl shadow-lg p-6 scroll-mt-4">
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

      {activeLimit === null && !loading && (
        <p className="text-center py-12 text-gray-500">
          Selecciona cuántos sermones deseas ver usando los botones de arriba.
        </p>
      )}

      <div className="space-y-3">
        {videos.map((v) => (
          <div
            key={v.id || v.link}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedVideo && selectedVideo.link === v.link
                ? "bg-blue-50 border-blue-500 shadow-md"
                : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
            onClick={() => handleSelectVideo(v)}
          >
            <p className="font-semibold text-gray-800">{v.nombre_video}</p>
            {v.fecha && <p className="text-sm text-gray-500 mt-1">{v.fecha}</p>}
          </div>
        ))}
      </div>

      {videos.length === 0 && !loading && activeLimit !== null && (
        <p className="text-center py-8 text-gray-500">
          {debouncedSearch ? "No se encontraron resultados" : "No hay sermones disponibles"}
        </p>
      )}

      {loading && <p className="text-center py-4 text-gray-600">Cargando...</p>}

      {hasMore && !loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 rounded-xl font-medium hover:bg-blue-50 hover:shadow-md transition-all"
          >
            <span>Cargar más sermones</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
