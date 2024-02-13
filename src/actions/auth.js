import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import { fetchAllUsers } from "./users";

const authSuccess = (data) => ({
  type: "AUTH",
  data,
});

const authError = (error) => ({
  type: "AUTH_ERROR",
  error,
});

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch(authSuccess(data));
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(fetchAllUsers());
    navigate("/");
  } catch (error) {
    console.error("Error signing up:", error);
    dispatch(authError("Error signing up"));
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch(authSuccess(data));
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.error("Error logging in:", error);
    dispatch(authError("Error logging in"));
  }
};
