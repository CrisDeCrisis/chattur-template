import { authURL } from "@/constants/auth";
import { useFetch } from "@/hooks/useFetch";
import type { UserLogin, UserRegister } from "@/interfaces/auth-interface";
import type { User } from "@/interfaces/user-interface";

export const registerService = async (user: UserRegister) => {
  try {
    const response = await useFetch(`${authURL}/register`, "POST", user);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log({ "Error al registrar usuario": error });
  }
};

export const loginService = async (user: UserLogin): Promise<User | null> => {
  try {
    const response = await useFetch(`${authURL}/login`, "POST", user);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error({ "Error al logear usuario": error });
    return null; // Return null if login failss
  }
};

export const sessionService = async (): Promise<User | null> => {
  try {
    const response = await useFetch(`${authURL}/check-status`, "GET");
    if (!response.ok) {
      return null; // Return null if the response is not ok
    }

    const user = await response.json();
    return user;
  } catch (error) {
    // Handle error and return null if session check fails
    console.error({ "Error al obtener sesion": error });
    return null;
  }
};

export const logoutService = async () => {
  try {
    const response = await useFetch(`${authURL}/logout`, "GET");
    return response;
  } catch (error) {
    console.error({ "Error al cerrar sesion": error });
  }
};
