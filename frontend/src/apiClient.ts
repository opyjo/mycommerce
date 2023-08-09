import axios from "axios";

// The code creates an instance of Axios using axios.create(). The create method allows you to create a customized instance of Axios with specific configuration options.
const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/",
  headers: {
    "Content-type": "application/json",
  },
});

//this code is adding an "Authorization" header to outgoing requests if the user is logged in, using a JSON Web Token (JWT) retrieved from the "userInfo" stored in the browser's local storage. This header is a way to authenticate the user and allow them to access protected resources on the server. If there is any issue during this process, the error will be forwarded for further handling.
apiClient.interceptors.request.use(
  async (config) => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = (await JSON.parse(userInfoString)) as { token: string };
      config.headers.authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
