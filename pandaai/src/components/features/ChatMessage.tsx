import React from 'react';
import { Message } from '@/hooks/usePandaChat';

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast = false }) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}
    >
      <div className="flex items-start gap-3 max-w-[85%]">
        {/* Avatar */}
        {!isUser && (
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🐼</span>
          </div>
        )}
        
        {/* Message Bubble */}
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
            isUser
              ? 'bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-br-md'
              : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
          }`}
        >
          {/* Message Content */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
          
          {/* Timestamp */}
          {message.timestamp && (
            <div
              className={`text-xs mt-2 opacity-70 ${
                isUser ? 'text-purple-100' : 'text-gray-500'
              }`}
            >
              {message.timestamp.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          )}
          
          {/* Typing indicator for last assistant message */}
          {!isUser && isLast && (
            <div className="flex items-center gap-1 mt-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>
        
        {/* User Avatar */}
        {isUser && (
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">👤</span>
          </div>
        )}
      </div>
    </div>
  );
}; 