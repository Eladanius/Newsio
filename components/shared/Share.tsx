'use client';

import {
  TelegramShareButton,
  TelegramIcon,
  FacebookIcon,
  FacebookShareButton,
  RedditShareButton,
  RedditIcon,
  VKShareButton,
  TwitterShareButton,
  TwitterIcon,
  VKIcon,
} from 'next-share';
import { Variants, motion } from 'framer-motion';

interface Props {
  url: string;
}

const sharedVariants: Variants = {
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
      duration: 1,
      delay: 0.6,
    },
  },
};

const hoverVariants: Variants = {
  init: { y: 0 },
  hover: { y: -5 },
};

const size = 30;

export default function Shared({ url }: Props) {
  return (
    <motion.div
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true }}
      variants={sharedVariants}
      className='flex flex-row gap-4 justify-center p-2'>
      <motion.div initial='init' whileHover='hover' variants={hoverVariants}>
        <TelegramShareButton url={url}>
          <TelegramIcon size={size} round />
        </TelegramShareButton>
      </motion.div>
      <motion.div initial='init' whileHover='hover' variants={hoverVariants}>
        <TwitterShareButton url={url}>
          <TwitterIcon size={size} round />
        </TwitterShareButton>
      </motion.div>
      <motion.div initial='init' whileHover='hover' variants={hoverVariants}>
        <FacebookShareButton url={url}>
          <FacebookIcon size={size} round />
        </FacebookShareButton>
      </motion.div>
      <motion.div initial='init' whileHover='hover' variants={hoverVariants}>
        <VKShareButton url={url}>
          <VKIcon size={size} round />
        </VKShareButton>
      </motion.div>
      <motion.div initial='init' whileHover='hover' variants={hoverVariants}>
        <RedditShareButton url={url}>
          <RedditIcon size={size} round />
        </RedditShareButton>
      </motion.div>
    </motion.div>
  );
}
