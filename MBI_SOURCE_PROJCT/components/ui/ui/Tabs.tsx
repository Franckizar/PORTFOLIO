// components/ui/Tabs.tsx
'use client';

import { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 border-b border-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              neu-tab px-6 py-3 rounded-t-xl font-medium transition-all duration-200
              flex items-center gap-2
              ${activeTab === tab.id 
                ? 'neu-raised-sm text-primary' 
                : 'text-muted-foreground hover:text-foreground'}
            `}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="neu-card p-6" role="tabpanel">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}