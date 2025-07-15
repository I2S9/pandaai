import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload?: (file: File) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onFileUpload,
  isLoading = false,
  placeholder = "Pose ta question à Panda Coach... 🐼"
}) => {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !isLoading && !isComposing) {
      onSendMessage(input.trim());
      setInput('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && onFileUpload) {
      onFileUpload(files[0]);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file && onFileUpload) {
          onFileUpload(file);
        }
        break;
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-white via-white/95 to-transparent pb-4 pt-8 z-40">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 backdrop-blur-sm">
          {/* Error or Info Message */}
          {isLoading && (
            <div className="mb-3 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-purple-600">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>Panda Coach réfléchit...</span>
              </div>
            </div>
          )}

          <div className="flex items-end gap-3">
            {/* File Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Attacher un fichier"
            >
              <svg 
                width="20" 
                height="20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                className="text-gray-500 hover:text-purple-500 transition-colors"
              >
                <path d="M16.5 13.5V7a4.5 4.5 0 0 0-9 0v8a6 6 0 0 0 12 0V9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
            </button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onPaste={handlePaste}
                placeholder={placeholder}
                disabled={isLoading}
                className="w-full resize-none border-none outline-none bg-transparent text-gray-800 placeholder-gray-400 text-sm leading-relaxed max-h-32 disabled:opacity-50"
                rows={1}
              />
            </div>

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || isLoading || isComposing}
              className="flex-shrink-0 p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
              aria-label="Envoyer le message"
            >
              <svg 
                width="18" 
                height="18" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSendMessage("Peux-tu m'aider à créer un plan d'étude ?")}
              disabled={isLoading}
              className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50"
            >
              📚 Plan d&apos;étude
            </button>
            <button
              type="button"
              onClick={() => onSendMessage("J'ai besoin d'aide en mathématiques")}
              disabled={isLoading}
              className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50"
            >
              🧮 Maths
            </button>
            <button
              type="button"
              onClick={() => onSendMessage("Comment mieux mémoriser ?")}
              disabled={isLoading}
              className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50"
            >
              🧠 Mémoire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 