import { motion } from 'framer-motion';
import { AboutProjectsSlider } from './components/AboutProjectsSlider';
import { FooterBar } from './components/FooterBar';
import { HeaderBar } from './components/HeaderBar';
import { HeroScene } from './components/HeroScene';
import { StrictHeroVector } from './components/StrictHeroVector';
import { useTheme } from './context/ThemeContext';
import { HeroProfile } from './components/HeroProfile';

function App() {
  const { strictMode } = useTheme();

  return (
    <main
      className={`relative min-h-screen [overflow-x:clip] ${
        strictMode ? 'bg-[#f7f7f7] text-[#111]' : 'bg-asphalt text-white'
      }`}
    >
      {!strictMode ? (
        <>
          <div className="spray-grid pointer-events-none absolute inset-0 opacity-80" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 border-b border-white/10 bg-[linear-gradient(90deg,rgba(255,47,125,.16),rgba(53,242,194,.12),rgba(248,255,77,.10))]" />
        </>
      ) : null}

      <HeaderBar />

      <section
        id="main"
        className={`relative mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-8 px-4 pb-10 pt-24 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-6 xl:grid-cols-[0.74fr_1.26fr] ${
          strictMode ? 'border-b border-[#c9c9c9]' : ''
        }`}
      >
        <HeroProfile strictMode={strictMode} />

        <div className={`relative z-10 w-full ${strictMode ? '' : 'lg:-ml-16 lg:w-[calc(100%+4rem)] xl:-ml-28 xl:w-[calc(100%+7rem)]'}`}>
          {strictMode ? (
            <StrictHeroVector />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.7, ease: 'easeOut' }}
            >
              <HeroScene />
            </motion.div>
          )}
        </div>
      </section>

      <AboutProjectsSlider strictMode={strictMode} />
      <FooterBar />
    </main>
  );
}

export default App;
