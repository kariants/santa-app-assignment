import { v4 as uuidv4 } from 'uuid';
import { DateTime } from "luxon";

import { Message } from '../types/Message.js';
import { users, userProfiles } from '../mockData.js';
import { UserProfile } from '../types/UserProfile.js';
import { sendEmails } from '../utils/emailUtils.js';
import { User } from '../types/User.js';

enum SantaMessageResponseTypes {
  VALID = 1,
  USER_NOT_FOUND = 2,
  USER_OVER_TEN_YEARS_OLD = 3
}

interface SantaMessageResponse {
  code: SantaMessageResponseTypes;
  message: string;
}

// Normally these would be DB tables or something similar
let unsentMessages: Message[] = [];
let sentMessages: Message[] = [];

export const sendMessagesToSanta = () => {
  if (unsentMessages.length > 0) {
    sendEmails(unsentMessages);
    sentMessages = [...unsentMessages];
    unsentMessages = [];
  }
  setTimeout(sendMessagesToSanta, 15000);
}


const isUserUnderTenYearsOld = (userBirthday: string): boolean => {
  // Data dates are in format YYYY/DD/MM ---- birthdate: "2010/23/01"
  const [year, day, month] = userBirthday.split('/').map(Number);
  const luxonInputDate = DateTime.fromObject({
    year,
    day,
    month
  });
  const today = DateTime.now();
  const diffInYears = Math.abs(luxonInputDate.diff(today, 'years').years);

  return diffInYears < 10;
}

const isUserValid = (userId: string) => {
  const user = userProfiles.find((user: UserProfile) => user.userUid === userId);

  if (!user) {
    return SantaMessageResponseTypes.USER_NOT_FOUND;
  }

  if (!isUserUnderTenYearsOld(user.birthdate)) {
    return SantaMessageResponseTypes.USER_OVER_TEN_YEARS_OLD;
  }

  return SantaMessageResponseTypes.VALID;
}


function handleResponse(code: SantaMessageResponseTypes): SantaMessageResponse {
  let response: SantaMessageResponse;

  switch (code) {
    case SantaMessageResponseTypes.VALID:
      response = {
        code: SantaMessageResponseTypes.VALID,
        message: 'Your message has been received'
      };
      break;
    case SantaMessageResponseTypes.USER_NOT_FOUND:
      response = {
        code: SantaMessageResponseTypes.USER_NOT_FOUND,
        message: 'User not found'
      };
      break;
    case SantaMessageResponseTypes.USER_OVER_TEN_YEARS_OLD:
      response = {
        code: SantaMessageResponseTypes.USER_OVER_TEN_YEARS_OLD,
        message: 'User is over 10 years old'
      };
      break;
    default:
      response = {
        code: code,
        message: 'Unknown response'
      };
      break;
  }
  return response;
}

export const handleReceivedMessage = ((req: any, res: any) => {
  const responseCode = isUserValid(req.body.userId);
  const user: User = users.find((user: User) => user.uid === req.body.userId) as User;
  const userProfile: UserProfile = userProfiles.find((userProfile: UserProfile) => userProfile.userUid === req.body.userId) as UserProfile;

  // User is under 10 years old and exists
  if (responseCode !== SantaMessageResponseTypes.USER_OVER_TEN_YEARS_OLD && responseCode !== SantaMessageResponseTypes.USER_NOT_FOUND) {
    const newMessage: Message = {
      // not required but would be good to have unique ids for messages too for saving
      id: uuidv4(),
      userId: req.body.userId,
      sender: user.username,
      message: req.body.message,
      address: userProfile.address
    }
    unsentMessages.push(newMessage);
  
  }
  const response = handleResponse(responseCode);
  return res.status(201).json(response);
});
