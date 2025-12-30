"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Image as ImageIcon, Clipboard } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

export default function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        onImageSelected(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageSelected(e.target.files[0]);
    }
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith("image/")) {
          onImageSelected(file);
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [onImageSelected]);

  return (
    <div
      className={`relative w-full h-[60vh] border-4 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer group bg-opacity-10 
        ${isDragging 
          ? "border-brand-accent bg-brand-accent/10 scale-[1.02]" 
          : "border-muted hover:border-brand-primary hover:bg-white/5"
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div className="flex flex-col items-center gap-6 p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className={`p-8 rounded-full bg-white/10 mb-4 transition-transform group-hover:scale-110 ${isDragging ? "animate-bounce" : ""}`}>
          <Upload className="w-20 h-20 text-brand-primary" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Drop your selfie here
          </h2>
          <p className="text-xl text-muted-foreground">
            or tap to browse
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full bg-black/20 text-muted-foreground text-sm font-medium border border-white/5">
          <Clipboard className="w-4 h-4" />
          <span>You can also press Ctrl+V to paste</span>
        </div>
      </div>
    </div>
  );
}
