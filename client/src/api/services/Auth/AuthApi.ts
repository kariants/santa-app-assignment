import { axiosClient } from "../../axios";

export type Credentials = {
  username: string,
  //password: string
}

export const login = async (credentials: Credentials) => {
  const res = axiosClient.post('/auth/login', credentials);
  return res;
};
