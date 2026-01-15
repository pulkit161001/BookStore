import axios from "axios";

export const axiosInstance = axios.create({
	// backend running port
	baseURL:
		import.meta.env.MODE === "development" ? "http://localhost:5555" : "/",
	// send cookies in every single request
	withCredentials: true,
});
