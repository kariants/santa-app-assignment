import { v4 as uuidv4 } from 'uuid';

import { users, userProfiles, handleNewUserCreation } from '../mockData.js';
import { User } from "../types/User.js";
import { UserProfile } from '../types/UserProfile.js';
import { formatDateString } from '../utils/dateUtils.js';

// get user for login
export const getUser = ((req: any, res: any) => {
  const id = String(req.params.uid);
  const user = users.find((user: User) => user.uid === id)
  if (!user) {
    return res.send('User not found').status(404);
  }
  return res.json(user).status(201);
});

// check if username is taken for registering
export const isUsernametaken = ((req: any, res: any) => {
  const response = {
    userNameExists: users.some((user: User) => user.username.toLowerCase() === req.body.inputtedUsername.toLowerCase())
  }
  return res.json(response).status(201);
});

// register a new user
export const createUser = ((req: any, res: any) => {
  // api side check that username does not exist already
  if (users.some((user: User) => user.username.toLowerCase() === req.body.username.toLowerCase())) {
    return res.json({
      username: '',
      uid: '',
      success: false
    }).status(201);
  } else {
    let newUserId = uuidv4();

    const newUser: User = {
      username: req.body.username,
      uid: newUserId
    }

    const newUserProfile: UserProfile = {
      userUid: newUserId,
      address: req.body.address,
      birthdate: formatDateString(req.body.birthday)
    }

    const didCreateUser = handleNewUserCreation(newUser, newUserProfile);

    console.log("didCreateUser", didCreateUser);
    console.log("users", users);
    console.log("userProfiles", userProfiles);
    // TODO: some kind of check that user is actually created and then return success or false with the user
    // now it just assumes that user creation worked as intended

    return res.status(201).json({
      user: {
        username: req.body.username,
        uid: newUserId,  
      },
      success: true
    });
  }
});

// get user profile for profile page in ui
export const getUserProfile = () => {

}
