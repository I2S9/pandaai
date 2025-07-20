"use client";
import React, { useState } from 'react';

interface PdfViewerProps {
  content: string;
  filename: string;
  maxHeight?: number;
}

export default function PdfViewer({ content, filename, maxHeight = 400 }: PdfViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Diviser le contenu en paragraphes
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 text-sm">{filename}</h4>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          {isExpanded ? 'Réduire' : 'Voir plus'}
        </button>
      </div>
      
      <div 
        className={`overflow-y-auto text-sm text-gray-700 leading-relaxed ${
          isExpanded ? '' : `max-h-${maxHeight}px`
        }`}
        style={{ maxHeight: isExpanded ? 'none' : `${maxHeight}px` }}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-3">
            {paragraph}
          </p>
        ))}
      </div>
      
      {!isExpanded && paragraphs.length > 3 && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          ... {paragraphs.length - 3} paragraphes supplémentaires
        </div>
      )}
    </div>
  );
} 