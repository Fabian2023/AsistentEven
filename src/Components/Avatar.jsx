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
    "https://avartarsaludo2.s3.us-east-1.amazonaws.com/Copy+of+Copy+of+videoIntro1.mp4";


  // 🔥 traer video Eventouch
  const handleEventouchVideo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/eventouch-video",
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
          lg:max-w-2xl
          -mt-45
          scale-91
          
          
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
          scale-110
          
          
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
          lg:max-w-2xl
          -mt-45
          scale-91 
          "
        />
      )}

      {/* PREGUNTAS */}
      {/* PREGUNTAS */}
<div className="absolute flex flex-col items-center gap-6 w-full max-w-md md:max-w-2xl lg:max-w-3xl mt-250">

  {/* BOTÓN */}
  <div
    onClick={handleEventouchVideo}
    className="
      group
      z-10
      w-full
      text-center
      px-6 py-5 md:px-10 md:py-7
      rounded-full
      cursor-pointer
      text-lg md:text-3xl lg:text-4xl
      font-semibold

      bg-gradient-to-r from-[#2C1733] via-[#753E89] to-[#2C1733]
      shadow-lg shadow-purple-900/40

      transition-all duration-300 ease-out

      hover:scale-105
      hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]

      active:scale-95
    "
  >
    <span className="relative z-10">
      ¿Qué es Eventouch?
    </span>

    {/* glow overlay */}
    <div className="
      absolute inset-0
      rounded-full
      opacity-0 group-hover:opacity-100
      transition duration-300
      bg-purple-500/20 blur-xl
    " />
  </div>

  {/* BOTONES REUTILIZABLES */}
  {[
    "¿Qué experiencias ofrecen?",
    "¿Cómo funcionan los tótems?",
    "¿Puedo participar en una trivia?"
  ].map((text, i) => (
    <div
      key={i}
      className="
        group
        z-10
        w-full
        text-center
        px-6 py-5 md:px-10 md:py-7
        rounded-full
        cursor-pointer
        text-lg md:text-3xl lg:text-4xl
        font-semibold

        bg-gradient-to-r from-[#2C1733] via-[#753E89] to-[#2C1733]
        shadow-lg shadow-purple-900/40

        transition-all duration-300 ease-out

        hover:scale-105
        hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]

        active:scale-95
      "
    >
      <span className="relative z-10">{text}</span>

      <div className="
        absolute inset-0
        rounded-full
        opacity-0 group-hover:opacity-100
        transition duration-300
        bg-purple-500/20 blur-xl
      " />
    </div>
  ))}

  

</div>
    </div>
  );
};

export default Avatar;
