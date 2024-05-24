import { users } from '../mockData.js';
import { User } from "../types/User.js";

export const login = ((req: any, res: any) => {
  const user = users.find((userProfile: User) => userProfile.username === req.body.username);
  // Should come up with better way to return, but ran out of time.
  if (!user) {
    return res.json({
      user: null,
      success: false
    }).status(201);
  }
  return res.json({
    user: user,
    success: true
  }).status(201);
});

export const logout = ((req: any, res: any) => {
  // todo, didnt have time to implement this to backend
});

