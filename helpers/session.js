import * as SecureStore from "expo-secure-store";

export const storeSession = async (session) => {
  const rawValue = JSON.stringify(session);
  await SecureStore.setItemAsync("session", rawValue);
};

export const getSession = async () => {
  try {
    let result = await SecureStore.getItemAsync("session");
    return JSON.parse(result);
  } catch (e) {
    return false;
  }
};

export const getSessionUserId = async () => {
  const result = await getSession();
  return result?.id;
};
export const destroySession = async () => {
  return await SecureStore.deleteItemAsync("session");
};
