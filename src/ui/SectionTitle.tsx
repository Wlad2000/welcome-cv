type SectionTitleProps = {
  eyebrow: string;
  title: string;
  strictMode?: boolean;
};

export function SectionTitle({ eyebrow, title, strictMode = false }: SectionTitleProps) {
  return (
    <div>
      <p className={`mb-2 text-xs font-black uppercase tracking-[0.24em] ${strictMode ? 'text-[#555]' : 'text-mint'}`}>
        {eyebrow}
      </p>
      <h2 className={`font-display text-3xl uppercase leading-none sm:text-4xl ${strictMode ? 'text-[#111]' : 'text-white'}`}>
        {title}
      </h2>
    </div>
  );
}
