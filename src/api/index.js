import axios from "axios";

const API = axios.create({
  baseURL: 'https://stackflow-backend.onrender.com',
});

API.interceptors.request.use((req) => {
  const profile = JSON.parse(localStorage.getItem("Profile"));
  if (profile && profile.token) {
    req.headers.authorization = `Bearer ${profile.token}`;
  }
  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API request failed:", error);
    return Promise.reject(error);
  }
);

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const createSubscription = (userId, plan) =>
  API.post("/subscription/create-subscription", userId, plan);

export const updateSubscription = (userId, plan) =>
  API.post("/subscription/update-subscription", userId, plan);

export const generateOtp = (email) => API.post("/otp/generate-otp", email );
export const verifyOtp = (otp) => API.post("/otp/verify-otp",otp);

  
