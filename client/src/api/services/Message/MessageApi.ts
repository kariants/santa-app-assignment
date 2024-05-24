import { Message } from "../../../types/Message";
import { axiosClient } from "../../axios";

export const sendMessage = async (message: Message) => {
  const res = await axiosClient.post('/messages/SendMessage', message);
  return res;
};