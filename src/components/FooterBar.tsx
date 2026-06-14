import { useTheme } from '../context/ThemeContext';

export function FooterBar() {
  const { strictMode } = useTheme();

  return (
    <footer
      className={`relative z-30 border-t px-4 py-6 text-center text-xs font-black uppercase tracking-[0.16em] ${
        strictMode ? 'border-[#c9c9c9] bg-[#f7f7f7] text-[#333]' : 'border-white/10 bg-asphalt text-white/65'
      }`}
    >
      Developed by Vlad Harashko 2026
    </footer>
  );
}
