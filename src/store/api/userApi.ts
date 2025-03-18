import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isAdmin: boolean;
  profile: {
    phoneNumber?: string;
    country?: string;
    targetBand?: number;
    nativeLanguage?: string;
    bio?: string;
    avatar: {
      url: string;
      publicId?: string;
    };
  };
  createdAt: string;
}

export interface UserResponse {
  success: boolean;
  data: {
    user: UserProfile;
  };
  message?: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://backend.abspak.com/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<UserProfile, void>({
      query: () => '/users/profile',
      transformResponse: (response: UserResponse) => response.data.user,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<UserProfile, { data: Partial<UserProfile> }>({
      query: ({ data }) => ({
        url: '/users/profile',
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: UserResponse) => response.data.user,
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi; 