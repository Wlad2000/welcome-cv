import { profile } from '../data/profile';
import { motion } from 'framer-motion';

export function HeroProfile({ strictMode }: { strictMode: boolean }) {
  return (
    <motion.div
      className={`relative z-20 w-full max-w-2xl py-4 lg:py-12 ${
        strictMode ? 'border border-[#bfbfbf] bg-white p-6 shadow-none lg:p-8' : ''
      }`}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      {!strictMode ? (
        <div className="sticker-cut mb-5 inline-flex rotate-[-2deg] border-2 border-black bg-sticker px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-asphalt shadow-sticker">
          Skate Dev Card
        </div>
      ) : null}

      <h1
        className={`uppercase ${
          strictMode
            ? 'font-sans text-4xl font-bold leading-tight tracking-normal sm:text-5xl'
            : 'graffiti-text font-display text-5xl leading-[0.92] sm:text-6xl xl:text-7xl'
        }`}
      >
        {profile.firstname}
        <span className={`block ${strictMode ? 'text-[#111]' : 'text-mint'}`}>{profile.lastname}</span>
      </h1>

      <p className={`mt-5 max-w-xl text-base leading-7 sm:text-lg ${strictMode ? 'text-[#333]' : 'text-white/75'}`}>
        {profile.position} from {profile.location}.
      </p>

      <div className="mt-7 flex flex-wrap gap-3 text-xs font-black uppercase tracking-normal">
        {['React Native', 'React', 'TypeScript'].map((skill, index) => (
          <span
            key={skill}
            className={
              strictMode
                ? 'border border-[#aaa] bg-[#f5f5f5] px-4 py-2 text-[#111]'
                : [
                    'sticker-cut border-2 border-white px-4 py-2 shadow-sticker',
                    index === 0 ? 'bg-punch' : '',
                    index === 1 ? 'bg-mint text-asphalt' : '',
                    index === 2 ? 'bg-skyvolt text-asphalt' : '',
                  ].join(' ')
            }
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}