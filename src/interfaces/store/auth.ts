import {IToken} from '@interfaces/data/token';
import {IUser} from '@interfaces/data/user';

export interface AuthStore {
  user: IUser | null;
  token: IToken | null;
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
