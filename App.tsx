import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './src/navigation/navigation';
import { AuthProvider } from './src/context/AuthContext';
import AxiosErrorHandler from '@/components/AxiosErrorHandler';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AxiosErrorHandler>
          <AppRoutes />
          <StatusBar />
        </AxiosErrorHandler>
      </AuthProvider>
    </NavigationContainer>
  );
}
