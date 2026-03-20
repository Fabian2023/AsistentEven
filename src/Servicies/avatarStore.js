import { create } from "zustand";
import axios from "axios";

export const useAvatarStore = create((set) => ({
  videoUrl: "",
  loading: false,

  generateAvatar: async (name) => {
    try {

      // 🔥 limpiar video anterior
      set({
        loading: true,
        videoUrl: ""
      });

      const response = await axios.post(
        "http://localhost:5000/api/generate-greeting",
        { name }
      );

      set({
        videoUrl: response.data.videoUrl,
        loading: false
      });

    } catch (error) {

      console.error(error);

      set({
        loading: false
      });

    }
  }
}));