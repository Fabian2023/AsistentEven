import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Avatar = () => {
  const location = useLocation();
  const name = location.state?.name;

  // 🔹 VIDEO SALUDO
  const [videoUrl, setVideoUrl] = useState("");

  // 🔹 VIDEO EVENTOUCH (nuevo)
  const [eventouchVideoUrl, setEventouchVideoUrl] = useState("");

  const [loading, setLoading] = useState(true);

  // 🔥 traer video Eventouch
  const handleEventouchVideo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/eventouch-video"
      );

      setEventouchVideoUrl(response.data.videoUrl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const generateVideo = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/generate-greeting",
          { name }
        );

        setVideoUrl(response.data.videoUrl);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (name) generateVideo();
  }, [name]);

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-start text-white px-4 py-6">

      {/* LOADER SOLO PARA SALUDO */}
      {loading && (
        <h2 className="text-xl md:text-3xl animate-pulse mb-6 text-center">
          Preparando tu saludo...
        </h2>
      )}

      {/* 🔹 VIDEO SALUDO */}
      {!eventouchVideoUrl && videoUrl && (
        <video
          key={videoUrl}
          src={videoUrl}
          autoPlay
          className="
          w-full
          max-w-sm
          md:max-w-lg
          lg:max-w-xl
          rounded-xl
          
          mb-10
          "
        />
      )}

      {/* 🔥 VIDEO EVENTOUCH (MISMO ESTILO) */}
      {eventouchVideoUrl && (
        <video
          key={eventouchVideoUrl}
          src={eventouchVideoUrl}
          autoPlay
          className="
          w-full
          max-w-sm
          md:max-w-lg
          lg:max-w-4xl
          rounded-xl
          -mt-87.5
          
          "
        />
      )}

      {/* PREGUNTAS */}
      <div className="flex flex-col gap-4 w-full max-w-md md:max-w-2xl lg:max-w-3xl">

        <div
          onClick={handleEventouchVideo}
          className="bg-[#753E89] hover:bg-purple-700 transition p-6 md:p-8 rounded-xl cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold "
        >
          ¿Qué es Eventouch?
        </div>

        <div className="bg-[#753E89] hover:bg-purple-700 transition p-6 md:p-8 rounded-xl cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold">
          ¿Qué experiencias ofrecen?
        </div>

        <div className="bg-[#753E89] hover:bg-purple-700 transition p-6 md:p-8 rounded-xl cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold">
          ¿Cómo funcionan los tótems?
        </div>

        <div className="bg-[#753E89] hover:bg-purple-700 transition p-6 md:p-8 rounded-xl cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold">
          ¿Puedo participar en una trivia?
        </div>

      </div>
    </div>
  );
};

export default Avatar;