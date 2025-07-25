import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { loginService, logoutService, sessionService } from '@/api/auth-service';
import { authReducer } from './auth-reducer';
import { authTypes } from './auth-types';
import {
    type AuthContextProps,
    type AuthProviderProps,
    type AuthState,
    type UserLogin
} from '@/interfaces/auth-interface';

const authContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {

    const InitialState: AuthState = {
        user: {
            id: '',
            name: '',
            email: '',
            roles: [''],
            isActive: false,
            avatarUrl: ''
        },
    };

    const [isLoading, setIsLoading] = useState(false);

    const [state, dispatch] = useReducer(authReducer, InitialState);

    const authLogin = async (user: UserLogin) => {
        try {
            setIsLoading(true);
            const userData = await loginService(user);
            if (userData) {
                dispatch({
                    type: authTypes.LOGIN,
                    payload: { user: userData }
                });
                setIsLoading(false);
                //TODO TOAST
            }
        } catch (error) {
            setIsLoading(false);
            //TODO TOAST
            console.error({ 'Error al logear usuario': error });
        } finally {
            setIsLoading(false);
        }
    };

    const authSession = async () => {
        try {
            const user = await sessionService();
            if (user) {
                dispatch({
                    type: authTypes.SESSION,
                    payload: { user }
                });
            } else {
                dispatch({
                    type: authTypes.LOGOUT,
                    payload: {}
                });
            }
        } catch (error) {
            console.error({ 'Error al obtener sesion': error });
            dispatch({
                type: authTypes.LOGOUT,
                payload: {}
            });
        }
    };

    const authLogout = async () => {
        try {
            const response = await logoutService();
            if (response && response.ok) {
                dispatch({
                    type: authTypes.LOGOUT,
                    payload: {}
                });
            }
        } catch (error) {
            console.error({ 'Error al deslogear usuario': error });
        }
    };

    useEffect(() => {
        authSession();
    }, []);

    return (
        <authContext.Provider value={{ state, isLoading, authLogin, authSession, authLogout }}>
            {children}
        </authContext.Provider>
    )
};

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useAuthContext debe usarse dentro de AuthContextProvider');
    }
    return context;
};