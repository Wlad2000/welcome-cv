export type Skill = {
  name: string;
  color: string;
  position: [number, number, number];
};

export const skills: Skill[] = [
  { name: 'React Native', color: '#ff2f7d', position: [-3.15, 1.55, 0.3] },
  { name: 'React', color: '#46b4ff', position: [2.9, 1.15, -0.2] },
  { name: 'TypeScript', color: '#f8ff4d', position: [-2.55, -0.55, 0.35] },
  { name: 'Node.js', color: '#35f2c2', position: [2.55, -0.8, 0.15] },
  { name: 'Firebase', color: '#ff8a3d', position: [-1.2, 2.35, -0.45] },
  { name: 'SQLite / PostgreSQL', color: '#b985ff', position: [1.1, 2.25, -0.55] },
];
