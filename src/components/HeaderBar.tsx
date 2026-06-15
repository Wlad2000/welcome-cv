import { useTheme } from '../context/ThemeContext';

type SectionTarget = 'main' | 'about' | 'projects';

const navigationItems: Array<{ label: string; shortLabel: string; target: SectionTarget }> = [
  { label: 'Main', shortLabel: 'Main', target: 'main' },
  { label: 'About me', shortLabel: 'About', target: 'about' },
  { label: 'Work projects', shortLabel: 'Projects', target: 'projects' },
];

function scrollToSection(section: SectionTarget) {
  if (section === 'main') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const slider = document.querySelector<HTMLElement>('[data-slider-section]');
  if (!slider) return;

  const sectionOffset = section === 'projects' ? Math.min(window.innerHeight * 0.9, 680) : 0;
  window.scrollTo({ top: slider.offsetTop + sectionOffset, behavior: 'smooth' });
}

export function HeaderBar() {
  const { strictMode, setStrictMode } = useTheme();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur ${
        strictMode ? 'border-[#c9c9c9] bg-[#f7f7f7]/95' : 'border-white/10 bg-asphalt/74'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6">
        <nav className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2" aria-label="Page navigation">
          {navigationItems.map((item) => (
            <button
              type="button"
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className={`inline-flex h-9 shrink-0 items-center rounded border-0 px-2 text-[10px] font-black uppercase tracking-[0.08em] transition sm:h-10 sm:px-3 sm:text-xs sm:tracking-[0.12em] ${
                strictMode
                  ? 'bg-white text-[#111] hover:bg-[#ececec]'
                  : 'bg-white/[0.06] text-white hover:bg-white/[0.1] hover:text-mint'
              }`}
            >
              <span className="sm:hidden">{item.shortLabel}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>

        <label
          className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded border-0 px-2 py-2 text-[10px] font-black uppercase tracking-[0.08em] sm:gap-3 sm:px-3 sm:text-xs sm:tracking-[0.12em] ${
            strictMode ? 'bg-white text-[#111]' : 'bg-white/[0.06] text-white'
          }`}
        >
          <span className="sm:hidden">Mode</span>
          <span className="hidden sm:inline">Strict mode</span>
          <input
            type="checkbox"
            checked={strictMode}
            onChange={(event) => setStrictMode(event.target.checked)}
            className="peer sr-only"
          />
          <span
            className={`relative h-4 w-8 rounded-full transition after:absolute after:top-0.5 after:h-3 after:w-3 after:rounded-full after:transition peer-checked:after:translate-x-4 sm:h-5 sm:w-10 sm:after:h-3.5 sm:after:w-3.5 sm:peer-checked:after:translate-x-5 ${
              strictMode
                ? 'bg-[#d9d9d9] after:left-1 after:bg-[#111]'
                : 'border border-white/30 bg-black/40 after:left-1 after:bg-mint'
            }`}
          />
        </label>
      </div>
    </header>
  );
}
