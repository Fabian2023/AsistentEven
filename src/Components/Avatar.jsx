import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Avatar = () => {
  const location = useLocation();
  const name = location.state?.name;

  const [eventouchKey, setEventouchKey] = useState(0);

  // 🔹 VIDEO SALUDO
  const [videoUrl, setVideoUrl] = useState("");

  // 🔹 VIDEO EVENTOUCH (nuevo)
  const [eventouchVideoUrl, setEventouchVideoUrl] = useState("");

  // 🔥 NUEVO: control intro
  const [showIntro, setShowIntro] = useState(true);
  const introVideo =
    "https://videointroevent.s3.us-east-1.amazonaws.com/videointro2.mp4";

  // 🔥 traer video Eventouch
  const handleEventouchVideo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/eventouch-video",
      );

      setEventouchVideoUrl(response.data.videoUrl);
      setEventouchKey(prev => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const generateVideo = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/generate-greeting",
          { name },
        );

        setVideoUrl(response.data.videoUrl);
      } catch (error) {
        console.error(error);
      }
    };

    if (name) generateVideo();
  }, [name]);

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-start text-white px-4 py-6">
      {/* 🔥 IMAGEN FONDO (NUEVO) */}
      <img
        src="/bg.png"
        alt="avatar"
        className="
          absolute 
          w-146
          h-218
          max-w-sm
          md:max-w-lg
          lg:max-w-4xl 
          
          
        "
      />

      {/* 🔥 VIDEO INTRO (NUEVO) */}
      {showIntro && (
        <video
          src={introVideo}
          autoPlay
          onEnded={() => setShowIntro(false)}
          className="
          relative z-10
          w-full
          max-w-sm
          md:max-w-lg
          lg:max-w-4xl
          -mt-87.5
          scale-95
          "
        />
      )}

      {/* 🔹 VIDEO SALUDO */}
      {!showIntro && !eventouchVideoUrl && videoUrl && (
        <video
          key={videoUrl}
          src={videoUrl}
          autoPlay
          className="
          relative z-10
          w-full
          max-w-sm
          md:max-w-lg
          lg:max-w-xl
          rounded-xl
          mt-2
          
          
          "
        />
      )}

      {/* 🔥 VIDEO EVENTOUCH (MISMO ESTILO) */}
      {!showIntro && eventouchVideoUrl && (
        <video
          key={eventouchKey}
          src={eventouchVideoUrl}
          autoPlay
          className="
          relative z-10
          w-full
          max-w-sm
          md:max-w-lg
          lg:max-w-4xl
          -mt-90
          scale-95
          
          "
        />
      )}

      {/* PREGUNTAS */}
      <div className=" absolute flex flex-col gap-4 w-full max-w-md md:max-w-2xl lg:max-w-3xl mt-237.5">
        <div
          onClick={handleEventouchVideo}
          className=" z-10 bg-[#753E89] hover:bg-purple-700 transition p-6 md:p-8 rounded-xl cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold "
        >
          ¿Qué es Eventouch?
        </div>

        <div className=" z-10 bg-[#753E89] hover:bg-purple-700 transition p-6 md:p-8 rounded-xl cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold">
          ¿Qué experiencias ofrecen?
        </div>

        <div className=" z-10 bg-[#753E89] hover:bg-purple-700 transition p-6 md:p-8 rounded-xl cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold">
          ¿Cómo funcionan los tótems?
        </div>

        <div className=" z-10 bg-[#753E89] hover:bg-purple-700 transition p-6 md:p-8 rounded-xl cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold">
          ¿Puedo participar en una trivia?
        </div>
      </div>
    </div>
  );
};

export default Avatar;
