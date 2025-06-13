import type { ReactNode } from "react";
import type { User } from "./user-interface";

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthState {
  user: User;
}

export interface AuthAction {
  type: string;
  payload?: {
    user?: User;
  };
}

export interface AuthContextProps {
  state: AuthState;
  isLoading: boolean;
  authLogin: (user: UserLogin) => Promise<void>;
  authSession: () => Promise<void>;
  authLogout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
