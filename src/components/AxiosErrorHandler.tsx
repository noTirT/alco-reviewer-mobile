import { ReactNode, useEffect } from 'react';
import instance from '@/services/api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export default function AxiosErrorHandler({
  children,
}: {
  children: ReactNode;
}) {
  const auth = useAuth();

  useEffect(() => {
    function createResponseInterceptor() {
      const responseInterceptor = instance.interceptors.response.use(
        function (response) {
          return response;
        },
        async function (error) {
          if (error.response.status != 401) return Promise.reject(error);
          if (error.response.data.status_code == 2) {
            await auth.logout();
            return;
          }

          instance.interceptors.response.eject(responseInterceptor);

          const token = await AsyncStorage.getItem('refreshToken');

          return await instance
            .get('/auth/refresh', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(async (response) => {
              await AsyncStorage.setItem(
                'accessToken',
                response.data.data.access_token,
              );
              error.response.config.headers['Authorization'] =
                `Bearer ${response.data.data.access_token}`;
              return axios(error.response.config);
            })
            .catch(async (error2) => {
              await auth.logout();
              return Promise.reject(error2);
            })
            .finally(createResponseInterceptor);
        },
      );
      return responseInterceptor;
    }

    const responseInterceptor = createResponseInterceptor();

    const requestInterceptor = instance.interceptors.request.use(
      async function (config) {
        if (!config.url?.startsWith('/auth')) {
          const token = await AsyncStorage.getItem('accessToken');
          config.headers.Authorization = token ? `Bearer ${token}` : '';
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return children;
}
