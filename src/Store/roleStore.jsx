import axios from "axios";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const useRolestore = create((set) => ({
    roles:[],
  features: [],
  loading: false,
  error: null,
  message: null,

  // Fetch features
  getFeature: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/feature/getfeature`);
      console.log("Fetched features:", res.data);
      set({ features: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch features:", err);
      set({ error: "Failed to load features", loading: false });
    }
  },

  // Add or update role
  addRole: async (roleName, features) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/roles/addrole`, {
        roleName,
        features,
      });

      set({
        message: res.data.message,
        error: null,
        loading: false,
      });
    } catch (err) {
      console.error("Error Add Role:", err);
      set({ error: "Failed to add role", loading: false });
    }
  },
  getRole: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/roles/getroles`);
   
      set({ roles: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch Role:", err);
      set({ error: "Failed to load Role", loading: false });
    }
  },
}));
