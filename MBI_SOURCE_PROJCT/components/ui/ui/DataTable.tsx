// components/ui/DataTable.tsx
'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  itemsPerPage = 10,
  onRowClick
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  const sortedData = [...data];
  if (sortColumn) {
    sortedData.sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <div className="neu-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-4 py-3 text-left text-sm font-semibold"
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      {column.header}
                      {sortColumn === column.key && (
                        <Icon
                          icon={sortDirection === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down'}
                          width={14}
                        />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item)}
                className={`
                  border-b border-border transition-colors
                  ${onRowClick ? 'cursor-pointer hover:bg-white/5' : ''}
                `}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-3 text-sm">
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="neu-raised-sm p-2 rounded-lg disabled:opacity-50"
          >
            <Icon icon="lucide:chevron-left" width={20} />
          </button>
          
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="neu-raised-sm p-2 rounded-lg disabled:opacity-50"
          >
            <Icon icon="lucide:chevron-right" width={20} />
          </button>
        </div>
      )}
    </div>
  );
}