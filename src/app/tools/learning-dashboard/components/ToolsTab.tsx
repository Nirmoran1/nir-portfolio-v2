'use client';

import Card from './Card';
import { tools } from '../data';

export default function ToolsTab() {
  return (
    <div className="space-y-3">
      {tools.map((t) => (
        <Card key={t.name} emoji={t.emoji} title={t.name} label={t.pricing}>
          <p>{t.description}</p>
        </Card>
      ))}
    </div>
  );
}
