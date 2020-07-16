import axios from "axios";
import { config } from "./Config";
import { Auth } from "aws-amplify";

export const api = axios.create({
  baseURL: config.api.baseUrl,
  responseType: "json",
  timeout: 60000
});

//Get updated session
export const getUserSession = async () => {
  try {
    const session = await Auth.currentSession();
    return session;
  } catch (e) {
    console.log("Error getting current user session: ", e);
  }
};

//Get current user from Cognito
export const getCurrentUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (e) {
    console.log("Error getting current user: ", e);
  }
};

// GET user by userid
export const getUserById = async userId => {
  try {
    return await api.get(
      config.api.endpoints.user + "/user-" + userId
    );
  } catch (e) {
    console.log("Error calling getUserById API: ", e);
  }
};

// POST to user by userid
export const postUserById = async (userId, body) => {
  try {
    return await api.put(
      config.api.endpoints.user + "/user-" + userId, body
    );
  } catch (e) {
    console.log("Error calling postUserById API: ", e);
  }
};

// DELETE user by userid
export const deleteUserById = async userId => {
  try {
    return await api.delete(
      config.api.endpoints.user + "/user-" + userId
    );
  } catch (e) {
    console.log("Error calling deleteUserById API: ", e);
  }
};

// DELETE Cognitouser by userid
export const deleteCognitoUserById = async userId => {
  try {
    return await api.post(
      config.api.endpoints.user + "/" + userId
    );
  } catch (e) {
    console.log("Error calling deleteCognitoUserById API: ", e);
  }
};

// GET list of items by category
export const getItemsByCategory = async id => {
  try {
    return await api.get(
      config.api.endpoints.category + "/" + id
    );
  } catch (e) {
    console.log("Error calling getItemsByCategory API: ", e);
  }
};