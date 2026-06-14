import { Download, Github, Linkedin, Send } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { profile } from './profile';

export type Contact = {
  label: string;
  href: string;
  icon: LucideIcon;
  variant: 'mint' | 'punch' | 'sky' | 'sticker';
};

export const contacts: Contact[] = [
  { label: 'GitHub', href: profile.github, icon: Github, variant: 'mint' },
  { label: 'LinkedIn', href: profile.linkedIn, icon: Linkedin, variant: 'sky' },
  { label: 'Telegram', href: `https://t.me/${profile.telegram.replace('@', '')}`, icon: Send, variant: 'punch' },
  { label: 'Download CV', href: '/vladyslav-harashko-cv.txt', icon: Download, variant: 'sticker' },
];
