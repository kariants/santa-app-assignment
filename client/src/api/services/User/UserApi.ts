import { UserProfile, NewUserData } from "../../../types/User";
import { axiosClient } from "../../axios";

export const isUsernameTaken = async(username: string) => {
  const data = {
    inputtedUsername: username 
  }
  const res = await axiosClient.post('/users/isUserNameTaken', data);
  return res.data.userNameExists;
}

// register new user
export const registerUser = async (userData: NewUserData) => {
  const res = await axiosClient.post('/users/create', userData);
  return res.data;
}

// get user profile for profile page
export const getUserProfile = async (userId: string) => {
  const res = await axiosClient.get('/users/getUserProfile');
  return res.data;
}