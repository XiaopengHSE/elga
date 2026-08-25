import React from 'react';

function parseMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="list-disc list-inside my-2 space-y-1">
          {currentList.map((item, i) => (
            <li key={i} className="text-gray-200">{renderInline(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      currentList.push(trimmed.slice(2));
      continue;
    }

    flushList();

    if (trimmed === '') {
      elements.push(<br key={`br-${i}`} />);
      continue;
    }

    if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.split('**').length === 3) {
      // This is a bold-only line (like a heading)
      elements.push(
        <div key={i} className="font-bold text-white mt-3 mb-1">
          {renderInline(trimmed)}
        </div>
      );
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      elements.push(
        <div key={i} className="my-1">
          {renderInline(trimmed)}
        </div>
      );
      continue;
    }

    elements.push(
      <div key={i} className="my-1">
        {renderInline(line)}
      </div>
    );
  }

  flushList();
  return elements;
}

function renderInline(text: string): React.ReactNode {
  // Parse bold: **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

interface MarkdownRendererProps {
  text: string;
  className?: string;
}

export default function MarkdownRenderer({ text, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`text-sm leading-relaxed ${className}`}>
      {parseMarkdown(text)}
    </div>
  );
}
