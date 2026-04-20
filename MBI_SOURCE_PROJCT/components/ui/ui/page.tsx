// app/page.tsx
'use client';

import { Button } from '@/components/ui/existing/button';
import { Badge } from '@/components/ui/existing/badge';
import { Tabs } from '@/components/ui/existing/tabs';
import { useToast } from '@/hooks/useToast';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Home() {
  const { showToast } = useToast();
  
  const tabs = [
    { id: 'tab1', label: 'Overview', content: <div>Overview content</div> },
    { id: 'tab2', label: 'Details', content: <div>Details content</div> },
  ];
  
  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Portfolio</h1>
        <ThemeToggle />
      </div>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <Button variant="primary" onClick={() => showToast('Success!', 'success')}>
            Show Toast
          </Button>
          <Badge variant="primary">New Feature</Badge>
        </div>
        
        <Tabs tabs={tabs} />
      </div>
    </main>
  );
}