import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    "https://avartarsaludo2.s3.us-east-1.amazonaws.com/Copy+of+Copy+of+videoIntro1.mp4";

  // 🔥 traer video Eventouch
  const handleEventouchVideo = async () => {
    try {
      const response = await axios.get(
        "https://avatarbackend-es7u.onrender.com/api/eventouch-video",
      );

      setEventouchVideoUrl(response.data.videoUrl);
      setEventouchKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const generateVideo = async () => {
      try {
        const response = await axios.post(
          "https://avatarbackend-es7u.onrender.com/api/generate-greeting",
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
    <div className="w-full min-h-screen  relative flex flex-col items-center justify-start text-white px-4 py-40 ">
      {/* 🔥 FONDO BASE NUEVO */}
      <img
        src="/fondo-minimalista.png" // el que generamos
        alt="fondo"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          z-0
        "
      />
      {/* 🔥 avatar de fondo */}
      <img
        src="/bg.png"
        alt="avatar"
        className="
          absolute 
          w-138
          h-210
          max-w-sm
          md:max-w-lg
          lg:max-w-4xl
        
          scale-110
          
          
        "
      />
      {/* 🔥 MARCO OVERLAY */}
      <img
        src="/marco.png" // tu imagen generada
        alt="marco"
        className="
        pointer-events-none
        absolute
        z-20
        w-full
        h-272.5
        max-w-sm    
        md:max-w-2xl
        lg:max-w-2xl
        -mt-33
        rounded-4xl
          
  
        
        
    
      "
      />
      {/* 🎬 SISTEMA DE VIDEOS ANIMADO */}
      <AnimatePresence mode="wait">
        {/* INTRO */}
        {showIntro && (
          <motion.video
            key="intro"
            src={introVideo}
            autoPlay
            onEnded={() => setShowIntro(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-sm md:max-w-lg lg:max-w-2xl -mt-45 scale-91"
          />
        )}

        {/* SALUDO */}
        {!showIntro && !eventouchVideoUrl && videoUrl && (
          <motion.video
            key="saludo"
            src={videoUrl}
            autoPlay
           initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-sm md:max-w-lg lg:max-w-xl rounded-xl mt-2 scale-106"
          />
        )}

        {/* EVENTOUCH */}
        {!showIntro && eventouchVideoUrl && (
          <motion.video
            key={eventouchKey}
            src={eventouchVideoUrl}
            autoPlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-sm md:max-w-lg lg:max-w-2xl -mt-42 scale-91"
          />
        )}
      </AnimatePresence>

      {/* PREGUNTAS */}
      <div className=" absolute flex flex-col gap-6 w-full max-w-md md:max-w-2xl lg:max-w-3xl mt-250">
        <div
          onClick={handleEventouchVideo}
          className=" z-10 bg-[#2d063b] hover:bg-purple-700 transition p-6 md:p-8 rounded-full cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold "
        >
          ¿Qué es Eventouch?
        </div>
        <div className=" z-10 bg-[#2d063b] hover:bg-purple-700 transition p-6 md:p-8 rounded-full cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold">
          {" "}
          ¿Qué experiencias ofrecen?
        </div>
        <div className=" z-10 bg-[#2d063b] hover:bg-purple-700 transition p-6 md:p-8 rounded-full cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold">
          ¿Cómo funcionan los tótems?
        </div>
        <div className=" z-10 bg-[#2d063b] hover:bg-purple-700 transition p-6 md:p-8 rounded-full cursor-pointer text-center text-lg md:text-3xl lg:text-4xl font-semibold">
          ¿Puedo participar en una trivia?
        </div>
      </div>
    </div>
  );
};

export default Avatar;
