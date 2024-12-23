import React from 'react';
import { CheckCircle2, Loader2, X } from 'lucide-react';
import { Button } from '../UI/Button';

interface Props {
  isOpen: boolean;
  steps: {
    approval: boolean;
    transaction: boolean;
    confirmation: boolean;
  };
  onClose: () => void;
}

export function TransactionModal({ isOpen, steps, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-semibold text-gray-200 mb-6">Transaction Status</h3>
        
        <div className="space-y-4 mb-6">
          <Step
            title="Approval"
            description="Approve token spending"
            isActive={steps.approval}
            isCompleted={steps.transaction || steps.confirmation}
          />
          
          <Step
            title="Confirm"
            description="Confirm transaction in wallet"
            isActive={steps.transaction}
            isCompleted={steps.confirmation}
          />
          
          <Step
            title="Transaction"
            description="Transaction being processed"
            isActive={steps.confirmation}
            isCompleted={false}
          />
        </div>

        <Button
          onClick={onClose}
          variant="secondary"
          className="w-full"
        >
          Close
        </Button>
      </div>
    </div>
  );
}

interface StepProps {
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}

function Step({ title, description, isActive, isCompleted }: StepProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="w-6 h-6 text-green-400" />
        ) : isActive ? (
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-gray-600" />
        )}
      </div>
      <div>
        <h4 className="text-gray-200 font-medium">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}