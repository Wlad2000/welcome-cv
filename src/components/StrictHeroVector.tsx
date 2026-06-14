import { motion } from 'framer-motion';

export function StrictHeroVector() {
  return (
    <motion.div
      className="w-full border border-[#c9c9c9] bg-white p-5 shadow-none sm:p-7"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.55, ease: 'easeOut' }}
    >
      <div className="mx-auto flex aspect-[4/3] max-h-[440px] max-w-xl items-center justify-center bg-[#f3f3f3] p-5">
        <svg viewBox="0 0 520 390" role="img" aria-label="Keep building vector poster" className="h-full w-full">
          <rect x="42" y="42" width="436" height="306" fill="#ffffff" stroke="#111111" strokeWidth="3" />
          <path d="M88 288H432" stroke="#111111" strokeWidth="3" strokeLinecap="square" />
          <path d="M120 250L174 196L224 224L300 132L396 250" fill="none" stroke="#111111" strokeWidth="7" />
          <circle cx="174" cy="196" r="12" fill="#111111" />
          <circle cx="300" cy="132" r="12" fill="#111111" />
          <rect x="86" y="72" width="348" height="58" fill="#efefef" stroke="#111111" strokeWidth="2" />
          <text x="260" y="96" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#111111">
            HELP WILL ALWAYS BE GIVEN
          </text>
          <text x="260" y="119" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#111111">
            TO THOSE WHO ASK.
          </text>
          <text x="260" y="324" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700" fill="#333333">
            write the code, then make the magic maintainable
          </text>
        </svg>
      </div>
    </motion.div>
  );
}
