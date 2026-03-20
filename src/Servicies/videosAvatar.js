import { create } from "zustand";
import axios from "axios";

export const useVideoAvatarStore = create((set) => ({
  videoUrl: "",
  loading: false,
  error: null,

  // 🔹 Acción para obtener el video desde backend
  fetchEventouchVideo: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axios.get(
        "http://localhost:5000/api/eventouch-video"
      );

      set({
        videoUrl: response.data.videoUrl,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching video:", error);

      set({
        error: "No se pudo cargar el video",
        loading: false,
      });
    }
  },

  // 🔹 Opcional: limpiar video
  clearVideo: () => set({ videoUrl: "" }),
}));