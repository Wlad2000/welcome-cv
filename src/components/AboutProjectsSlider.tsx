import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { contacts } from '../data/contacts';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { Button } from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';

type StrictModeProps = {
  strictMode?: boolean;
};

function AboutPanel({ strictMode = false }: StrictModeProps) {
  return (
    <div
      id="about"
      className="grid h-[100svh] w-full grid-rows-[1fr_auto] gap-6 overflow-hidden pb-20 pt-20 sm:pb-8 sm:pt-24 lg:grid-cols-[0.95fr_1.05fr] lg:grid-rows-1 lg:items-center"
    >
      <div className={`border-l-4 pl-5 ${strictMode ? 'border-[#777]' : 'border-mint'}`}>
        <SectionTitle eyebrow="About" title="Full-stack mobile developer" strictMode={strictMode} />
        <p className={`mt-4 max-w-xl text-sm leading-7 sm:text-base ${strictMode ? 'text-[#333]' : 'text-white/72'}`}>
          {profile.experience} Recent work includes{' '}
          {projects.map((project) => project.name).join(', ')}.
        </p>
        <div className="mt-4 flex max-w-2xl flex-wrap gap-2">
          {profile.techHighlights.map((tech) => (
            <span
              key={tech}
              className={`rounded border px-2.5 py-1 text-xs font-bold ${
                strictMode ? 'border-[#c9c9c9] bg-white text-[#222]' : 'border-white/15 bg-white/[0.06] text-white/78'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 self-end sm:grid-cols-4 lg:grid-cols-2 lg:self-center xl:grid-cols-4">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <Button
              key={contact.label}
              href={contact.href}
              variant={contact.variant}
              aria-label={contact.label}
              className={strictMode ? 'border-[#aaa] bg-white text-[#111] shadow-none hover:translate-y-0' : ''}
            >
              <Icon aria-hidden size={18} strokeWidth={2.7} />
              <span className="truncate">{contact.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, strictMode = false }: { project: Project; index: number } & StrictModeProps) {
  if (strictMode) {
    return (
      <article className="h-[calc(100svh-16rem)] min-h-[390px] overflow-y-auto border border-[#bfbfbf] bg-white p-5 text-[#111] sm:p-6">
        <div className="grid gap-3 border-b border-[#c9c9c9] pb-4 sm:grid-cols-[8rem_1fr]">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#555]">Project {index + 1}</span>
          <div>
            <h3 className="text-2xl font-bold leading-tight">{project.name}</h3>
            <p className="mt-1 text-sm text-[#444]">{project.role}</p>
          </div>
        </div>
        {[
          ['Country', project.country],
          ['Duration', project.duration],
          ['Team', project.teamSize],
          ['Summary', project.description],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-2 border-b border-[#dedede] py-3 text-sm sm:grid-cols-[8rem_1fr]">
            <span className="font-bold text-[#555]">{label}</span>
            <span>{value}</span>
          </div>
        ))}
        <div className="grid gap-2 border-b border-[#dedede] py-3 text-sm sm:grid-cols-[8rem_1fr]">
          <span className="font-bold text-[#555]">Stack</span>
          <span>{project.stack.join(', ')}</span>
        </div>
        <div className="grid gap-2 py-3 text-sm sm:grid-cols-[8rem_1fr]">
          <span className="font-bold text-[#555]">Highlights</span>
          <ul className="list-disc space-y-1 pl-4">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </article>
    );
  }

  return (
    <article className="h-[calc(100svh-15rem)] min-h-[390px] w-full max-w-full overflow-hidden rounded-[8px] border-2 border-white/12 bg-[#101018]/92 shadow-[10px_10px_0_rgba(0,0,0,.75)] backdrop-blur sm:h-[calc(100svh-16rem)] sm:min-h-[430px]">
      <div className="grid h-full min-h-0 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative overflow-hidden border-b-2 border-white/10 bg-[linear-gradient(145deg,rgba(255,47,125,.88),rgba(70,180,255,.84))] p-5 text-asphalt lg:border-b-0 lg:border-r-2 lg:border-white/10 sm:p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 border-[18px] border-black/15" />
          <p className="text-xs font-black uppercase tracking-[0.2em]">Case #{String(index + 1).padStart(2, '0')}</p>
          <h3 className="mt-5 break-words font-display text-4xl uppercase leading-none sm:text-5xl">{project.name}</h3>
          <p className="mt-4 inline-flex rounded bg-asphalt px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-mint">
            {project.role}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 text-[11px] font-black uppercase">
            <span className="rounded bg-white/86 px-2 py-2">{project.country}</span>
            <span className="rounded bg-sticker px-2 py-2">{project.duration}</span>
            <span className="rounded bg-mint px-2 py-2">{project.teamSize}</span>
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="max-w-xl break-words text-sm leading-7 text-white/76 sm:text-base">{project.description}</p>
            {project.link ? (
              <a
                href={project.link}
                aria-label={`${project.name} website`}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border-2 border-sticker bg-sticker text-asphalt shadow-sticker transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/80"
              >
                <ExternalLink aria-hidden size={19} strokeWidth={2.7} />
              </a>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded border border-white/15 bg-white/[0.06] px-2.5 py-1 text-xs text-white/78">
                {item}
              </span>
            ))}
          </div>

          <ul className="mt-7 grid gap-3 text-sm leading-6 text-white/72">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="rounded-md border border-white/10 bg-black/24 p-3">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function ProjectsPanel({ strictMode = false }: StrictModeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const maxIndex = projects.length - 1;

  const move = (direction: number) => {
    setDirection(direction);
    setActiveIndex((current) => Math.min(maxIndex, Math.max(0, current + direction)));
  };

  const jumpTo = (index: number) => {
    setDirection(index >= activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <div
      id="projects"
      className={`grid h-[100svh] w-full overflow-hidden pb-6 pt-16 sm:pb-8 sm:pt-20 ${
        strictMode ? 'bg-[#f7f7f7] text-[#111]' : 'bg-asphalt text-white'
      }`}
    >
      <div className="min-h-0">
        <div className={`mb-6 flex flex-col gap-4 border-l-4 pl-5 sm:flex-row sm:items-end sm:justify-between ${strictMode ? 'border-[#777]' : 'border-punch'}`}>
          <SectionTitle eyebrow="Projects" title="Selected production work" strictMode={strictMode} />
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => move(-1)}
              disabled={activeIndex === 0}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-md border-2 transition disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-35 ${
                strictMode
                  ? 'border-[#aaa] bg-white text-[#111] hover:bg-[#ececec]'
                  : 'border-white/20 bg-white/[0.06] text-white hover:-translate-y-1 hover:border-mint'
              }`}
            >
              <ChevronLeft aria-hidden size={22} strokeWidth={2.8} />
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => move(1)}
              disabled={activeIndex === maxIndex}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-md border-2 transition disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-35 ${
                strictMode
                  ? 'border-[#aaa] bg-white text-[#111] hover:bg-[#ececec]'
                  : 'border-white/20 bg-white/[0.06] text-white hover:-translate-y-1 hover:border-mint'
              }`}
            >
              <ChevronRight aria-hidden size={22} strokeWidth={2.8} />
            </button>
          </div>
        </div>

        <div className="max-w-full overflow-hidden pb-4">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.div
              key={projects[activeIndex].name}
              className="w-full min-w-0 cursor-grab touch-pan-y active:cursor-grabbing"
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 120 : -120, rotate: direction > 0 ? 1.8 : -1.8, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -120 : 120, rotate: direction > 0 ? -1.8 : 1.8, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 190, damping: 24, mass: 0.9 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              whileDrag={{ scale: 0.985, rotate: direction * 0.8 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70 || info.velocity.x < -520) move(1);
                if (info.offset.x > 70 || info.velocity.x > 520) move(-1);
              }}
            >
              <ProjectCard project={projects[activeIndex]} index={activeIndex} strictMode={strictMode} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mx-auto flex max-w-3xl items-center gap-3 px-1">
          <span className={`text-xs font-black tabular-nums ${strictMode ? 'text-[#555]' : 'text-white/55'}`}>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <div className={`grid h-3 flex-1 grid-cols-4 gap-1 rounded border p-1 ${strictMode ? 'border-[#bfbfbf] bg-white' : 'border-white/12 bg-white/[0.04]'}`}>
            {projects.map((project, index) => (
              <button
                type="button"
                key={project.name}
                aria-label={`Show ${project.name}`}
                onClick={() => jumpTo(index)}
                className={`relative overflow-hidden rounded-sm transition ${
                  strictMode ? 'bg-[#d9d9d9] hover:bg-[#c9c9c9]' : 'bg-white/18 hover:bg-white/35'
                }`}
              >
                {index === activeIndex ? (
                  <motion.span
                    layoutId="project-progress-pill"
                    className={`absolute inset-0 ${strictMode ? 'bg-[#111]' : 'bg-mint'}`}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  />
                ) : null}
              </button>
            ))}
          </div>
          <span className={`text-xs font-black tabular-nums ${strictMode ? 'text-[#555]' : 'text-white/55'}`}>
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.name}
              aria-label={`Show ${project.name}`}
              onClick={() => jumpTo(index)}
              className={`h-8 rounded border px-2 text-[10px] font-black uppercase transition ${
                activeIndex === index
                  ? strictMode
                    ? 'border-[#111] bg-[#111] text-white'
                    : 'border-mint bg-mint text-asphalt'
                  : strictMode
                    ? 'border-[#c9c9c9] bg-white text-[#555] hover:text-[#111]'
                    : 'border-white/10 bg-white/[0.04] text-white/45 hover:text-white'
              }`}
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutProjectsSlider({ strictMode = false }: StrictModeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    let frameId = 0;

    function updateProgress() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const transitionDistance = Math.min(window.innerHeight * 0.9, 680);
      const nextProgress = transitionDistance <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / transitionDistance));

      progress.set(nextProgress);
    }

    function requestUpdate() {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [progress]);

  const aboutY = useTransform(progress, [0, 0.5, 1], ['0svh', '-30svh', '-100svh']);
  const aboutOpacity = useTransform(progress, [0, 0.36, 0.58], [1, 0.25, 0]);
  const projectsY = useTransform(progress, [0, 0.55, 1], ['100svh', '14svh', '0svh']);
  const projectsOpacity = useTransform(progress, [0.14, 0.42], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[220svh]" data-slider-section>
      <div className={`sticky top-0 z-20 h-[100svh] overflow-hidden ${strictMode ? 'bg-[#f7f7f7]' : 'bg-asphalt'}`} data-slider-sticky>
        {!strictMode ? <div className="spray-grid pointer-events-none absolute inset-0 opacity-65" /> : null}

        <motion.div
          className="absolute inset-x-0 top-0 mx-auto h-[100svh] w-full max-w-6xl px-4 sm:px-6"
          style={{ y: aboutY, opacity: aboutOpacity }}
          data-about-panel
        >
          <AboutPanel strictMode={strictMode} />
        </motion.div>

        <motion.div
          className={`absolute inset-x-0 top-0 mx-auto h-[100svh] w-full max-w-6xl px-4 sm:px-6 ${
            strictMode ? 'bg-[#f7f7f7]' : 'bg-asphalt'
          }`}
          style={{ y: projectsY, opacity: projectsOpacity }}
          data-projects-panel
        >
          <ProjectsPanel strictMode={strictMode} />
        </motion.div>
      </div>
    </section>
  );
}
