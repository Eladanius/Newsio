'use client';

import data from '@/constants/newsData';
import NewsCard from '@/components/card/NewsCard';
import { useGetNewsMutation } from './shared/reducers/newsApi';
import { useEffect } from 'react';

export default function Feed() {
  const [getNews, { data: newsFeed }] = useGetNewsMutation({ fixedCacheKey: 'newsFeed' });
  function onScroll() {
    console.log(document.getElementById(data.results[2].article_id));
    console.log('ggg');
  }

  useEffect(() => {
    //getNews({});
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  //console.log(document.getElementById(data.results[2].article_id));

  return (
    <section className='snap-y snap-mandatory h-screen w-screen mx:auto overflow-scroll'>
      {data?.results.map((news) => (
        <div
          key={news.article_id}
          id={news.article_id}
          className='snap-start flex justify-center gap-4 w-screen h-screen place-items-center'>
          <NewsCard news={news} />
        </div>
      ))}
    </section>
  );
}
