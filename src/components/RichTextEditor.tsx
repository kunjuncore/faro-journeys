import { useState } from 'react';

import React from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const [selectedText, setSelectedText] = useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newValue);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="border rounded">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => insertFormatting('# ', '')}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
          title="Heading"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => insertFormatting('## ', '')}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
          title="Subheading"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => insertFormatting('**', '**')}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200 font-bold"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => insertFormatting('*', '*')}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200 italic"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => insertFormatting('\n• ', '')}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
          title="Bullet Point"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => insertFormatting('\n1. ', '')}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
          title="Numbered List"
        >
          1.
        </button>
      </div>
      
      {/* Text Area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border-0 resize-none focus:outline-none"
        rows={8}
      />
    </div>
  );
};

export default RichTextEditor;