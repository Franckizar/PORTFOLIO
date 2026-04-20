// components/ui/FileUpload.tsx
'use client';

import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
}

export function FileUpload({ onFileSelect, accept, maxSize = 5, multiple = false }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFile = (file: File) => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }
    
    setError('');
    setFile(file);
    onFileSelect?.(file);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };
  
  return (
    <div
      className={`
        neu-raised rounded-xl p-8 text-center cursor-pointer
        transition-all duration-200
        ${isDragging ? 'scale-105 border-2 border-primary' : ''}
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      
      <Icon icon="lucide:upload-cloud" width={48} className="mx-auto mb-4 text-primary" />
      
      <p className="text-lg font-medium mb-2">
        {file ? file.name : 'Drop your file here or click to browse'}
      </p>
      
      {!file && (
        <p className="text-sm text-muted-foreground">
          Supports {accept || 'any file type'} • Max {maxSize}MB
        </p>
      )}
      
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}