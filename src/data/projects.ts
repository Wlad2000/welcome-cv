export type Project = {
  name: string;
  role: string;
  country: string;
  duration: string;
  teamSize: string;
  link?: string;
  description: string;
  stack: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    name: '(Un)scripted',
    role: 'React Native Developer',
    country: 'DE',
    duration: '11 months',
    teamSize: '3-4 members',
    link: 'https://unscripted.style',
    description: 'Fashion social platform for outfit posts, styling prompts, and aesthetic-based discovery.',
    stack: ['React Native', 'Zustand', 'Tailwind', 'React Query', 'Axios', 'Firebase'],
    highlights: ['Implemented foreground/background notifications', 'Built responsive UI', 'Integrated React Query APIs'],
  },
  {
    name: 'Planecater',
    role: 'React Native Developer',
    country: 'USA',
    duration: '3 months',
    teamSize: '3-4 members',
    link: 'https://www.planecater.com',
    description: 'Aircraft catering mobile experience for fast ordering and live operational updates.',
    stack: ['React Native', 'MobX', 'Websockets', 'Axios', 'Firebase'],
    highlights: ['Built Expo React Native screens', 'Managed state with MobX', 'Integrated APIs and realtime flows'],
  },
  {
    name: 'LiteLog',
    role: 'React Native / Full-stack Developer',
    country: 'DE',
    duration: '12 months',
    teamSize: '3-4 members',
    link: 'https://litelog.de/en',
    description: 'Digital attendance control with offline-first mobile flows, NFC, geofencing, and realtime updates.',
    stack: ['React Native', 'React', 'Node.js', 'SQLite', 'PostgreSQL', 'Socket.IO', 'Firebase', 'Mapbox'],
    highlights: ['Built mobile and web UI', 'Implemented Node/Express APIs', 'Added offline-first SQLite workflows'],
  },
  {
    name: 'Production monitoring',
    role: 'Full-stack Developer',
    country: 'UA',
    duration: '6 months',
    teamSize: '3 members',
    description: 'Desktop and mobile monitoring tools with realtime communication, i18n, and database management.',
    stack: ['React', 'React Native', 'Node.js', 'SQLite', 'Websockets', 'i18n'],
    highlights: ['Built responsive UI components', 'Implemented realtime server logic', 'Optimized maintainability'],
  },
];
