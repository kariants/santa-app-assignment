
import { User } from "./types/User.js";
import { UserProfile } from "./types/UserProfile.js";

// this file acts as a 'database' with userProfiles and users arrays
// registering new users is done here

// Usually these would be in DB...
export let userProfiles: UserProfile[] = [];
export let users: User[] = [];

// - You should fetch the JSON data at every form submission (consider it as an API).
const refreshUsers = async (): Promise<void> => {
  try {
    let usersResponse = await fetch("https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json").then((response) => response.json());
    // get unique users to the users array leaving existing ones
    users = [...new Map([...users, ...usersResponse].map((user: User) => [user.uid, user])).values()];
  } catch (error) {
    console.error('Error refreshing user data:', error);
  }
}

const refreshUserProfiles = async (): Promise<void> => {
  try {
    let userProfilesResponse = await fetch("https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json").then((response) => response.json());
    // get unique userProfiles to the users array leaving existing ones
    userProfiles = [...new Map([...userProfiles, ...userProfilesResponse].map((userProfile: UserProfile) => [userProfile.userUid, userProfile])).values()];
  } catch (error) {
    console.error('Error refreshing user profile data:', error);
  }
}

// function that fetches user data, used in middleware and to fetch users for the first time
export const refreshUserData = async () => {
  await refreshUserProfiles();
  await refreshUsers();
}

export const handleNewUserCreation = (newUser: User, newUserProfile: UserProfile) => {
  // just push to users & user profiles array
  userProfiles.push(newUserProfile);
  users.push(newUser);

  if (userProfiles.some(e => e.userUid === newUserProfile.userUid) && users.some(e => e.uid === newUser.uid)) {
    return true;
  }
  return false;
}