// components/ui/Accordion.tsx
'use client';

import { useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  icon?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
}

export function Accordion({ items, allowMultiple = false, defaultOpenItems = [] }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setOpenItems(prev => prev.includes(itemId) ? [] : [itemId]);
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <div key={item.id} className="neu-raised rounded-xl overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon && <Icon icon={item.icon} width={20} />}
                <span className="font-medium">{item.title}</span>
              </div>
              <Icon
                icon="lucide:chevron-down"
                width={20}
                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            <div
              className={`
                neu-accordion-panel transition-all duration-300 ease-out
                ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="px-6 pb-4 pt-2 border-t border-border">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}