import { authURL } from "@/constants/auth";
import { useFetch } from "@/hooks/useFetch";
import type { UserLogin, UserRegister } from "@/interfaces/auth-interface";

export const registerService = async (user: UserRegister) => {
  try {
    const response = await useFetch(`${authURL}/register`, "POST", user);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log({ "Error al registrar usuario": error });
  }
};

export const loginService = async (user: UserLogin) => {
  try {
    const response = await useFetch(`${authURL}/login`, "POST", user);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error({ "Error al logear usuario": error });
  }
};

export const sessionService = async () => {
  try {
    const response = await useFetch(`${authURL}/check-status`, "GET");
    if (!response.ok) {
      return { user: null };
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error({ "Error al obtener sesion": error });
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
