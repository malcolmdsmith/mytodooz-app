import { AxiosRequestConfig } from "axios";

const token = process.env.BEARER_TOKEN;
const authHeader = new Headers();
authHeader.append("Authorization", `Bearer ${token}`);
export const configInit: RequestInit = {
	method: "GET",
	headers: authHeader,
	cache: "default",
};

// export const axiosConfig: AxiosRequestConfig = {
// 	headers: {
// 		Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
// 	},
// };

export const axiosConfig: AxiosRequestConfig = {
	headers: {
		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjIsImZpcnN0TmFtZSI6Ik1hbGNvbG0iLCJsYXN0TmFtZSI6IlNtaXRoIiwidXNlcm5hbWUiOiJtYWxjb2xtczY1QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImhhc2giOiIkMmEkMTAkclBrZjVaWUJDTFYubVJrTHZ0cGlqT3lmZTFCejNqQXJULjlEc1Z6T05BS3JhMHFpVG52WE8iLCJ2ZXJpZmllZCI6dHJ1ZSwidmVyaWZpY2F0aW9uQ29kZSI6IiIsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMTlUMDY6MjQ6NTQuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMTlUMDY6MjQ6NTQuMDAwWiJ9LCJpYXQiOjE2OTg0MjQwNDB9.x7nYWU0FYzYulspQuBzYW1FxBlV2XFoVr5T9x2JaPyc`,
	},
};
