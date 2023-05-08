import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token: any) => {
  try {
    let value = token == null ? null : JSON.stringify(token);
    await AsyncStorage.setItem("USER", value);
  } catch (error) {
    console.log("setToken", error);
  }
};

export const getToken = async () => {
  let data = await AsyncStorage.getItem("USER");
  return JSON.parse(data);
};
