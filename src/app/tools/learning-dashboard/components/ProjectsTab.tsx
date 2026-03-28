'use client';

import Card from './Card';
import { projects } from '../data';

function getDifficultyColor(d: string) {
  if (d === 'קל') return 'text-green-400';
  if (d === 'בינוני') return 'text-yellow-400';
  return 'text-red-400';
}

export default function ProjectsTab() {
  return (
    <div className="space-y-3">
      {projects.map((p) => (
        <Card key={p.name} emoji={p.emoji} title={p.name} label={p.time}>
          <p>{p.description}</p>
          <div className="flex gap-3 mt-2 text-xs">
            <span className={getDifficultyColor(p.difficulty)}>{p.difficulty}</span>
            <span className="text-white/40">לומדים: {p.learn}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
