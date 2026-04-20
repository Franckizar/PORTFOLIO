// components/ui/TreeView.tsx
'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
}

interface TreeViewProps {
  nodes: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  expandedNodes?: string[];
}

export function TreeView({ nodes, onSelect, expandedNodes: controlledExpanded }: TreeViewProps) {
  const [internalExpanded, setInternalExpanded] = useState<string[]>([]);
  const expanded = controlledExpanded || internalExpanded;
  
  const toggleNode = (nodeId: string) => {
    if (controlledExpanded) {
      // Controlled mode - we'd need an onChange prop
      return;
    }
    
    setInternalExpanded(prev =>
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };
  
  const renderNode = (node: TreeNode, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.includes(node.id);
    
    return (
      <div key={node.id} style={{ marginLeft: level * 20 }}>
        <div
          className={`
            flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer
            transition-all duration-200 hover:neu-raised-sm
          `}
          onClick={() => {
            if (hasChildren) toggleNode(node.id);
            onSelect?.(node);
          }}
        >
          {hasChildren && (
            <Icon
              icon={isExpanded ? 'lucide:chevron-down' : 'lucide:chevron-right'}
              width={16}
              className="text-muted-foreground"
            />
          )}
          
          {node.icon && <Icon icon={node.icon} width={18} />}
          
          <span className="text-sm">{node.label}</span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };
  
  return <div className="space-y-1">{nodes.map(node => renderNode(node))}</div>;
}