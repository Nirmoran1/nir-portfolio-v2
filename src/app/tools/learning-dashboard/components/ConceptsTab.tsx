'use client';

import Card from './Card';
import { concepts } from '../data';

export default function ConceptsTab() {
  return (
    <div className="space-y-3">
      {concepts.map((c) => (
        <Card key={c.name} emoji={c.emoji} title={c.name}>
          <p>{c.description}</p>
        </Card>
      ))}
    </div>
  );
}
