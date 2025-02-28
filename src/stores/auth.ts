import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@services/api';
import {fileLogger} from '@helpers/fileLogger';
import axios, {AxiosError} from 'axios';

export interface IUser {
  id: string;
  name: string;
  email: string;
  status: string;
}

export type Token = string;

const TOKEN_KEY = '@ecommerce:token';

export const tokenStorage = async (): Promise<Token | null> => {
  const item = await AsyncStorage.getItem(TOKEN_KEY);
  if (item) {
    fileLogger.info('Loaded token from AsyncStorage.');
    return item as Token;
  }
  fileLogger.warn('No token found in AsyncStorage.');
  return null;
};

export const saveToken = async (token: Token): Promise<void> => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  fileLogger.info('Token saved to AsyncStorage.');
};

export const clearToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  fileLogger.info('Cleared token from AsyncStorage.');
};

interface AuthState {
  user: IUser | null;
  token: Token | null;
  authIsLoading: boolean;
  authModalErrorText: string;
  authModalErrorVisible: boolean;
  isSubmitSignInDisabled: boolean;
  actions: {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    setAuthModalErrorText: (message: string) => void;
  };
}

export const useAuthStore = create<AuthState>()(
  devtools(set => ({
    user: null,
    token: null,
    authIsLoading: false,
    authModalErrorText: '',
    authModalErrorVisible: false,
    isSubmitSignInDisabled: false,
    actions: {
      signIn: async (email, password) => {
        set({authIsLoading: true, isSubmitSignInDisabled: true});
        fileLogger.info('Starting sign-in process.');
        try {
          const response = await api.post<{token: Token; user: IUser}>('/login', {email, password});
          const {token, user} = response.data;
          await saveToken(token);
          set({user, token, authIsLoading: false, isSubmitSignInDisabled: false});
          fileLogger.info('User signed in successfully.');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            fileLogger.error(`Axios error: ${error.response?.status} - ${error.response?.data}`);
            set({authModalErrorText: error.response?.data?.message || 'Error during authentication.', authModalErrorVisible: true});
          } else {
            fileLogger.error(`Authentication error: ${error}`);
            set({authModalErrorText: 'Unexpected authentication error.', authModalErrorVisible: true});
          }
          set({authIsLoading: false, isSubmitSignInDisabled: false});
        }
      },
      signOut: async () => {
        fileLogger.info('Signing out user.');
        await clearToken();
        set({user: null, token: null});
      },
      setAuthModalErrorText: message => set({authModalErrorText: message, authModalErrorVisible: true}),
    },
  })),
);

export const useUser = () => useAuthStore(state => state.user);
export const useAuthActions = () => useAuthStore(state => state.actions);
export const useAuthIsLoading = () => useAuthStore(state => state.authIsLoading);
export const useAuthModalErrorText = () => useAuthStore(state => state.authModalErrorText);
export const useAuthModalErrorVisible = () => useAuthStore(state => state.authModalErrorVisible);
export const useIsSubmitSignInDisabled = () => useAuthStore(state => state.isSubmitSignInDisabled);
