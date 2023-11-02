import { IData } from '@/constants/newsData';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsOptions } from './types';

interface GetNewsParams extends NewsOptions {
  page?: string;
}

const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsdata.io/api/1/news',
  }), //${process.env.REACT_APP_NEWSDATA_API_KEY}
  endpoints: (builder) => ({
    getNews: builder.mutation<IData, GetNewsParams>({
      query: ({ categories, countries, languages, page }) =>
        `?apikey=${process.env.REACT_APP_NEWSDATA_API_KEY}&image=1` +
        (categories && categories?.[0] ? `&category=${categories.join(',')}` : '') +
        (languages && languages?.[0] ? `&language=${languages.join(',')}` : '') +
        (countries && countries?.[0] ? `&country=${countries.join(',')}` : '') +
        (page ? `&page=${page}` : ''),
    }),
  }),
});

export default newsApi;
export const { useGetNewsMutation } = newsApi;
