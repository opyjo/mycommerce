import axios from "axios";

// The code creates an instance of Axios using axios.create(). The create method allows you to create a customized instance of Axios with specific configuration options.
const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
