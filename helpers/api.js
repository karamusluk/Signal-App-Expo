import axios from "axios";
import FormData from "form-data";

import { getSessionUserId, storeSession } from "./session";

const apiInstance = axios.create({
  baseURL: "https://mustafaculban.com/portfolio/signal_api/api",
  timeout: 1000,
});

export const login = async (username, password) => {
  const form = new FormData();
  form.append("name", username);
  form.append("password", password);

  try {
    return await apiInstance
      .post("/login", form, {
        headers: form.getHeaders,
      })
      .then((res) => {
        return storeSession(res?.data?.data)
          .then(() => res.data)
          .catch((e) => false);
        return res.data;
      })
      .catch((e) => console.log("api login :: ", e));
  } catch (error) {
    return error;
  }
};

export const register = async (
  fullname,
  username,
  email,
  password,
  imageUrl
) => {
  if (!imageUrl) {
    imageUrl =
      "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg";
  }
  console.log(fullname, username, email, password, imageUrl);

  const form = new FormData();
  form.append("fullname", fullname);
  form.append("name", username);
  form.append("password", password);
  form.append("email", email);
  form.append("imageUrl", imageUrl);

  try {
    return await apiInstance
      .post("/register", form, {
        headers: form.getHeaders,
      })
      .then((res) => res.data)
      .catch((e) => e);
  } catch (error) {
    return error;
  }
};

export const createChat = async (chatName, userId = null) => {
  if (!userId) {
    userId = await getSessionUserId();
  }
  const form = new FormData();
  form.append("owner", userId);
  form.append("name", chatName);

  console.log(chatName, userId);
  try {
    const result = await apiInstance
      .post("/create-chat", form, {
        headers: form.getHeaders,
      })
      .catch((e) => {
        console.log("api createChat :: ", e);
        return false;
      });

    if (result?.data) {
      return result.data;
    }
    return false;
  } catch (error) {
    return error;
  }
};

export const getChats = async (userId = null) => {
  if (!userId) {
    userId = await getSessionUserId();
  }

  const params = {
    owner: userId,
  };
  try {
    const result = await apiInstance
      .get("/chats", { params: params })
      .catch((e) => {
        console.log("api getChats :: ", e);
        return false;
      });
    if (result?.data?.data) {
      return result.data.data;
    }
    return false;
  } catch (error) {
    return false;
  }
};
