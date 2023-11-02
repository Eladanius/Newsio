import newsApi from '@/components/shared/reducers/newsApi';
import newsOptions from '@/components/shared/reducers/newsOptions';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const reducers = combineReducers({ newsOptions, [newsApi.reducerPath]: newsApi.reducer });

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(newsApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
