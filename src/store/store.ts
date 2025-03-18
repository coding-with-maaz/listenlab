import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './api/authApi';
import { sectionsApi } from './api/sectionsApi';
import { listeningTestsApi } from './api/listeningTestsApi';
import { readingTestsApi } from './api/readingTestsApi';
import { questionsApi } from './api/questionsApi';
import { userApi } from './api/userApi';
import { readingSectionsApi } from './api/readingSectionsApi';
import { readingQuestionsApi } from './api/readingQuestionsApi';
import authReducer from './slices/authSlice';

// Create the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [sectionsApi.reducerPath]: sectionsApi.reducer,
    [listeningTestsApi.reducerPath]: listeningTestsApi.reducer,
    [readingTestsApi.reducerPath]: readingTestsApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [readingSectionsApi.reducerPath]: readingSectionsApi.reducer,
    [readingQuestionsApi.reducerPath]: readingQuestionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      sectionsApi.middleware,
      listeningTestsApi.middleware,
      readingTestsApi.middleware,
      questionsApi.middleware,
      userApi.middleware,
      readingSectionsApi.middleware,
      readingQuestionsApi.middleware
    ),
});

// Enable refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 