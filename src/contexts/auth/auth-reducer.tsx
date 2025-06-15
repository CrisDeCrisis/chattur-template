import type { AuthAction, AuthState } from "@/interfaces/auth-interface";
import { authTypes } from "./auth-types";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case authTypes.LOGIN:
            return {
                ...state,
                user: action.payload.user!
            }
        case authTypes.SESSION:
            return {
                ...state,
                user: action.payload.user!
            }
        case authTypes.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}