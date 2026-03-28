'use client';

import Card from './Card';
import { tips, channels, concepts, projects, tools } from '../data';
import type { Tip, Channel, Concept, Project, Tool } from '../data';

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function pick<T>(arr: T[], offset: number): T {
  const seed = getDayOfYear();
  return arr[(seed + offset) % arr.length];
}

function getDifficultyColor(d: string) {
  if (d === 'קל') return 'text-green-400';
  if (d === 'בינוני') return 'text-yellow-400';
  return 'text-red-400';
}

export default function TodayTab() {
  const tip: Tip = pick(tips, 0);
  const channel: Channel = pick(channels, 3);
  const concept: Concept = pick(concepts, 7);
  const project: Project = pick(projects, 5);
  const tool: Tool = pick(tools, 11);

  return (
    <div className="space-y-4">
      <h2 className="text-white/40 text-sm font-medium mb-2">טיפ היום</h2>
      <Card emoji={tip.emoji} title={tip.name}>
        <p>{tip.description}</p>
      </Card>

      <h2 className="text-white/40 text-sm font-medium mb-2 mt-6">ערוץ יוטיוב</h2>
      <Card emoji={channel.emoji} title={channel.name} label="YouTube">
        <p>{channel.description}</p>
      </Card>

      <h2 className="text-white/40 text-sm font-medium mb-2 mt-6">מושג ללמוד</h2>
      <Card emoji={concept.emoji} title={concept.name}>
        <p>{concept.description}</p>
      </Card>

      <h2 className="text-white/40 text-sm font-medium mb-2 mt-6">פרויקט לבנות</h2>
      <Card emoji={project.emoji} title={project.name} label={project.time}>
        <p>{project.description}</p>
        <div className="flex gap-3 mt-2 text-xs">
          <span className={getDifficultyColor(project.difficulty)}>{project.difficulty}</span>
          <span className="text-white/40">לומדים: {project.learn}</span>
        </div>
      </Card>

      <h2 className="text-white/40 text-sm font-medium mb-2 mt-6">כלי לנסות</h2>
      <Card emoji={tool.emoji} title={tool.name} label={tool.pricing}>
        <p>{tool.description}</p>
      </Card>
    </div>
  );
}
