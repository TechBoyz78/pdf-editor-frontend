import axios from "axios";

// change this to your backend URL when deployed
const API = axios.create({
  baseURL: "http://localhost:5000/api", 
});

export const uploadPDF = (formData) => API.post("/upload", formData);
export const editPDF = (data) => API.post("/edit", data);
export const getPDF = (filename) => API.get(`/pdf/${filename}`, { responseType: "blob" });
