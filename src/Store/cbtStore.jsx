// src/Store/cbtStore.js
import axios from "axios";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const useCbtStore = create((set) => ({
  examData: [],
  loading: false,
  error: null,
  message: null,

  // ✅ Add a new subject
  addSubject: async (level, name) => {
    set({ loading: true, error: null, message: null });
    try {
      const res = await axios.post(`${API_URL}/cbt/addsubject`, {
        level, // ✅ match backend schema
        name,
      });

      set({
        message: res.data.message || "✅ Subject added successfully",
        error: null,
        loading: false,
      });
    } catch (err) {
      console.error("Error adding subject:", err);
      set({
        error: err.response?.data?.message || "❌ Failed to add subject",
        loading: false,
      });
    }
  },

  // ✅ Get all levels + subjects
  getSubject: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/cbt/getsubject`);
      set({
        examData: res.data.subjects, // levels with subjects
        error: null,
        loading: false,
      });
    } catch (err) {
      console.error("Error getting subject:", err);
      set({
        error: err.response?.data?.message || "❌ Failed to get subject",
        loading: false,
      });
    }
  },

  // ✅ Add a new topic
addTopic: async (levelId, subjectId, topicName) => {
  set({ loading: true, error: null, message: null });
  try {
    const res = await axios.post(`${API_URL}/cbt/addtopic`, {
      levelId,
      subjectId,
      topicName,
    });
 

    set({
      message: res.data.message || "✅ Topic added successfully",
      error: null,
      loading: false,
    });


    // Optional: refresh subjects after adding topic
    await useCbtStore.getState().getSubject();
  } catch (err) {
    console.error("Error adding topic:", err);
    set({
      error: err.response?.data?.message || "❌ Failed to add topic",
      loading: false,
    });
  }
},

 addQuestion: async (formData) => {
  set({ loading: true, error: null, message: null });

  try {
    const res = await axios.post(`${API_URL}/cbt/addquestion`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    set({
      message: res.data.message || "✅ Question added successfully",
      loading: false,
      error: null,
    });

    return res.data; // ✅ return so component can use it
  } catch (err) {
    console.error("Error adding question:", err);
    set({
      error: err.response?.data?.message || "❌ Failed to add question",
      loading: false,
    });
    throw err;
  }
},


}));
