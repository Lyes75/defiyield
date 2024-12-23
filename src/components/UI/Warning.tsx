import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface WarningProps {
  messages: string[];
}

export function Warning({ messages }: WarningProps) {
  if (messages.length === 0) return null;

  return (
    <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-xl flex items-start space-x-2">
      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
      <div className="text-sm text-yellow-400">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}