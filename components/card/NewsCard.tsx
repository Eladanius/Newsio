'use client';

import { INews } from '@/constants/newsData';
import Image from 'next/image';
import { HiNewspaper } from 'react-icons/hi2';
import { Variants, motion } from 'framer-motion';
import Shared from '@/components/shared/Share';

interface Props {
  news: INews;
}

const cardVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
      delay: 0.2,
    },
  },
};

export default function NewsCard({ news }: Props) {
  return (
    <div className='relative'>
      <div className=' w-full'>
        <Shared url={news.link} />
      </div>
      <motion.div
        initial='offscreen'
        whileInView='onscreen'
        viewport={{ once: true }}
        variants={cardVariants}
        className='news_card'>
        <div className='absolute top-2 right-6 z-10 flex gap-2'>
          <p className='tag'>{news.language}</p>
          <p className='tag'>{news.category}</p>
        </div>
        <div className='relative'>
          {news.image_url && <Image src={news.image_url} alt={news.title} width={512} height={256} />}
        </div>
        <div className='body'>
          <div>
            <h1 className='font-bold text-lg sticky top-0 '>{news.title}</h1>
          </div>
          <div className='w-fit overflow-scroll'>
            <p className='text-sm'>{news.description}</p>
          </div>
        </div>
        <footer className='footer'>
          {news.source_id && (
            <a className='text-lg font-bold flex gap-1 items-center' href={news.link} target='_blank'>
              <HiNewspaper /> {news.source_id}
            </a>
          )}
          <p>
            {new Date(news.pubDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
