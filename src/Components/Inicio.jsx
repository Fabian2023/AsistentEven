import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!name) {
      alert("Por favor ingresa tu nombre");
      return;
    }

    navigate("/avatar", {
      state: { name },
    });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#2C1733] text-white">

      <h1 className="text-5xl font-bold mb-10">
        Bienvenidos
      </h1>

      <input
        type="text"
        placeholder="Escribe tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-80 p-4 text-black bg-white text-xl rounded-xl outline-none mb-6"
      />

      <button
        onClick={handleContinue}
        className="bg-[#753E89] hover:bg-[#8e4ba7] px-10 py-4 text-xl rounded-xl transition"
      >
        Continuar
      </button>

    </div>
  );
};

export default Inicio;