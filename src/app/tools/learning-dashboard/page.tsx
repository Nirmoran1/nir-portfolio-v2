'use client';

import { useState } from 'react';
import TabButton from './components/TabButton';
import TodayTab from './components/TodayTab';
import ProjectsTab from './components/ProjectsTab';
import ToolsTab from './components/ToolsTab';
import ConceptsTab from './components/ConceptsTab';

const tabs = [
  { id: 'today', label: 'היום' },
  { id: 'projects', label: 'פרויקטים' },
  { id: 'tools', label: 'כלים' },
  { id: 'concepts', label: 'מושגים' },
] as const;

type TabId = (typeof tabs)[number]['id'];

function getHebrewDate(): string {
  return new Date().toLocaleDateString('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function LearningDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('today');

  return (
    <div dir="rtl" className="min-h-screen bg-[#0a0a0a] px-4 py-8 max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">לוח למידת AI</h1>
        <p className="text-white/40 text-sm">{getHebrewDate()}</p>
        <p className="text-white/50 text-sm mt-1">
          המלצות יומיות -- מה לצפות, ללמוד, לבנות ולנסות
        </p>
      </header>

      <nav className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </nav>

      <main>
        {activeTab === 'today' && <TodayTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'tools' && <ToolsTab />}
        {activeTab === 'concepts' && <ConceptsTab />}
      </main>
    </div>
  );
}
