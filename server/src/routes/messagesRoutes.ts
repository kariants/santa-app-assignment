import express from 'express';
import { handleReceivedMessage } from '../controllers/messages.js';
import { refreshUserData } from '../mockData.js';

// middleware to fetch data after every form message sent form submission
// not sure if I misunderstood the requirement
// - You should fetch the JSON data at every form submission (consider it as an API).
const userDataRefresher = async function (req: any, res: any, next: any) {
  try {
    await refreshUserData();
    next();  
  } catch (err) {
    console.log("err", err);
    next(err);
  }
}

const messagesRouter = express.Router();
messagesRouter.post('/SendMessage', userDataRefresher, handleReceivedMessage);

export default messagesRouter;