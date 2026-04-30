// app/page.tsx
'use client';

import { Button } from '@/components/ui/existing/button';
import { Badge } from '@/components/ui/existing/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/existing/tabs';
import { useToast } from './useToast';
// components/ui/ui/page.tsx — add this at the top
import { ThemeToggle } from '@/components/ui/ui/ThemeToggle';

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

    {/* "primary" → "default" */}
    <Button variant="default" onClick={() => showToast('Success!', 'success')}>
      Show Toast
    </Button>

    {/* "primary" → "default" */}
    <Badge variant="default">New Feature</Badge>

  </div>

  {/* Tabs doesn't accept a "tabs" prop → use shadcn structure */}
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Overview</TabsTrigger>
      <TabsTrigger value="tab2">Details</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">
      <div>Overview content</div>
    </TabsContent>
    <TabsContent value="tab2">
      <div>Details content</div>
    </TabsContent>
  </Tabs>

</div>
    </main>
  );
}