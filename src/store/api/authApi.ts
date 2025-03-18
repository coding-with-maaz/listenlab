import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
  message?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://backend.abspak.com/api/auth', // Your backend URL
    credentials: 'include',  // Include cookies in requests
    prepareHeaders: (headers, { getState }) => {
      // Add Authorization header for any protected requests
      const token = localStorage.getItem('auth_token'); // Retrieve token from localStorage or from cookies if it's available
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Login user
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: (response: { status: number; data: any }) => {
        return response.data;
      }
    }),

    // Register new user
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      transformErrorResponse: (response: { status: number; data: any }) => {
        return response.data;
      }
    }),

    // Logout user and clear session data
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    // Get current user
    getCurrentUser: builder.query<AuthResponse, void>({
      query: () => '/me',
      transformErrorResponse: (response: { status: number; data: any }) => {
        return response.data;
      }
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
