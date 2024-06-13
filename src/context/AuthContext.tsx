import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

type UserTokens = {
  accessToken: string;
  refreshToken: string;
};

interface AuthStore {
  loggedIn: boolean;
  tokens: UserTokens;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthStore>({} as AuthStore);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokens, setTokens] = useState<UserTokens>({} as UserTokens);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAccessToken() {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        setTokens({ accessToken, refreshToken });
        setLoggedIn(true);
      }
      setLoading(false);
    }
    getAccessToken();
  }, []);

  async function refreshToken() {
    try {
      setLoading(true);
      const accessToken = await api.refreshAccessToken(tokens.refreshToken);
      if (!accessToken) throw new Error('No accesstoken provided by server');

      await AsyncStorage.setItem('accessToken', accessToken);
      setTokens((oldTokens) => ({ ...oldTokens, accessToken }));
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  async function signup(username: string, email: string, password: string) {
    try {
      setLoading(true);
      await api.signup(username, email, password);
    } catch (error: any) {
      Toast.show('Error creating user account. Try again', {
        duration: Toast.durations.LONG,
      });
    } finally {
      setLoading(false);
    }
  }

  async function login(username: string, password: string) {
    try {
      setLoading(true);
      const response = await api.login(username, password);
      if (!response || !response.access_token || !response.refresh_token)
        throw new Error('Response missing tokens');

      await AsyncStorage.setItem('accessToken', response.access_token);
      await AsyncStorage.setItem('refreshToken', response.refresh_token);
      setTokens({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      });
      setLoggedIn(true);
    } catch (error: any) {
      Toast.show('Error occurred while logging into account. Try again', {
        duration: Toast.durations.LONG,
      });
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      setLoggedIn(false);
    } catch (error: any) {
      Toast.show('Error logging out. Try again', {
        duration: Toast.durations.LONG,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        refreshToken,
        loggedIn,
        setLoggedIn,
        login,
        tokens,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
