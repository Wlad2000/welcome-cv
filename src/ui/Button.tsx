import type { AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: 'mint' | 'punch' | 'sky' | 'sticker';
};

const variants = {
  mint: 'border-mint bg-mint text-asphalt hover:shadow-[0_0_22px_rgba(53,242,194,.45)]',
  punch: 'border-punch bg-punch text-white hover:shadow-[0_0_22px_rgba(255,47,125,.45)]',
  sky: 'border-skyvolt bg-skyvolt text-asphalt hover:shadow-[0_0_22px_rgba(70,180,255,.45)]',
  sticker: 'border-sticker bg-sticker text-asphalt hover:shadow-[0_0_22px_rgba(248,255,77,.45)]',
};

export function Button({ children, variant = 'mint', className = '', ...props }: ButtonProps) {
  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-black uppercase tracking-normal shadow-sticker transition duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/80 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
